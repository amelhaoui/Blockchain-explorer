import { RESTDataSource } from 'apollo-datasource-rest';
import { BLOCKCHAIN_URL } from 'config/constants';
class BlocksAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = BLOCKCHAIN_URL;
    }

    async getBlocks(time: string): Promise<unknown> {
        let timeMillis = Date.now();
        if (time) {
            timeMillis = parseInt(time);
        }
        return this.get(`blocks/${timeMillis}?format=json`);
    }

    async getBlock(hash: string): Promise<unknown> {
        return this.get(`rawblock/${encodeURIComponent(hash)}`);
    }
}

export default BlocksAPI;