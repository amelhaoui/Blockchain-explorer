import { Resolvers, BlockSummary, Maybe} from './__generated/resolvers-types';

const resolvers : Resolvers = {
    Query: {
        blocks(_parent, {time, offset = 0, limit = 10}, {dataSources}):  Array<BlockSummary> {
           return dataSources.BlocksAPI.getBlocks(time).then((value: Array<Maybe<BlockSummary>>) =>  value.slice(offset, offset + limit));
        },
        block(_parent, {hash}, {dataSources}) {
          return dataSources.BlocksAPI.getBlock(hash);
        }
    }
}

export default resolvers;