import { RESTDataSource } from 'apollo-datasource-rest';

//import logger from 'config/logger';
//import { Resolvers } from 'schema/__generated/resolvers-types';

class BlocksAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://blockchain.info/';
    }

    async getBlocks(time: string): Promise<unknown> {
        let timeMillis = Date.now();
        if (time) {
            timeMillis = parseInt(time);
        }
        return this.get(`blocks/${timeMillis}?format=json`)
    }

    async getBlock(hash: string): Promise<unknown> {
        return this.get(`rawblock/${encodeURIComponent(hash)}`);
    }
}

export default BlocksAPI;