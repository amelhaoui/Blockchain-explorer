





describe('API integration', () => {
    it('fetches single launch', async () => {
        // const blockAPI = new BlocksAPI({ store });

        // // create a test server to test against, using our production typeDefs,
        // // resolvers, and dataSources.
        // const server = new ApolloServer({
        //     typeDefs,
        //     resolvers,
        //     dataSources: () => ({ blockAPI }),
        //     //context: () => ({ user: { id: 1, email: 'a@a.a' } }),
        // });

        // // mock the dataSource's underlying fetch methods
        // launchAPI.get = jest.fn(() => [mockLaunchResponse]);
        // userAPI.store = mockStore;
        // userAPI.store.trips.findAll.mockReturnValueOnce([
        //     { dataValues: { launchId: 1 } },
        // ]);

        // // run query against the server and snapshot the output
        // const res = await server.executeOperation({ query: GET_LAUNCH, variables: { id: 1 } });
        // expect(res).toMatchSnapshot();
        // expect(6).toBeLessThan(3);
    });
});