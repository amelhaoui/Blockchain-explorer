import * as dotenv from'dotenv'

import http from 'http';
import express from "express";
import { ApolloServer, Config, ExpressContext } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloError } from 'apollo-server-core';
import { GraphQLRequest } from 'apollo-server-types';

import * as Sentry from '@sentry/node';
//import * as Tracing from '@sentry/tracing';

import typeDefs from 'schema/schema';
import resolvers from 'schema/resolvers';
import BlocksAPI from 'datasources/BlocksAPI';

import logger from 'config/logger';
import { GraphQLError, OperationDefinitionNode } from "graphql";

Sentry.init({
    dsn: "https://0cfb22910cec4575b82bf2dd6105b6fd@o1020992.ingest.sentry.io/5986677",
    tracesSampleRate: 1.0,
});

dotenv.config();

async function startApolloServer({ typeDefs, resolvers }: Config<ExpressContext>) {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => {
            return {
                BlocksAPI: new BlocksAPI()
            };
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {   
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                requestDidStart(_) {
                    // Tuto taken from https://blog.sentry.io/2020/07/22/handling-graphql-errors-using-sentry
                    /* Within this returned object, define functions that respond
                       to request-specific lifecycle events. */
                    return {
                        didEncounterErrors(ctx: { request: GraphQLRequest, operation: OperationDefinitionNode, errors: ReadonlyArray<GraphQLError> }) {
                            // If we couldn't parse the operation, don't
                            // do anything here
                            if (!ctx.operation) {
                                return;
                            }

                            for (const err of ctx.errors) {
                                // Only report internal server errors,
                                // all errors extending ApolloError should be user-facing
                                if (err instanceof ApolloError) {
                                    continue;
                                }

                                // Add scoped report details and send to Sentry
                                Sentry.withScope(scope => {
                                    // Annotate whether failing operation was query/mutation/subscription
                                    scope.setTag("kind", ctx.operation.operation);

                                    // Log query and variables as extras (make sure to strip out sensitive data!)
                                    scope.setExtra("query", ctx.request.query);
                                    scope.setExtra("variables", ctx.request.variables);

                                    if (err.path) {
                                        // We can also add the path as breadcrumb
                                        scope.addBreadcrumb({
                                            category: "query-path",
                                            message: err.path.join(" > "),
                                            level: Sentry.Severity.Debug
                                        });
                                    }
                                    
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore   
                                    const transactionId = ctx.request.http.headers.get(
                                        "x-transaction-id"
                                    );
                                    if (transactionId) {
                                        scope.setTransaction(transactionId);
                                    }

                                    Sentry.captureException(err);
                                });
                            }
                        }
                    };
                }
            }],
    });

    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql'
    });

    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port: 4000 }, () => resolve("Sucess")));
    logger.log('info', '🚀 Server ready at http://localhost:4000/%s', server.graphqlPath);

    return { server, app };
}

startApolloServer({ typeDefs, resolvers });