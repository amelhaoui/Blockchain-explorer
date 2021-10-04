import { Resolvers, BlockSummary, Maybe, BlockDetail, BlocksResponse } from './__generated/resolvers-types';

const resolvers: Resolvers = {
  Query: {
    blocks(_parent, { time, offset = 0, limit = 10 }, { dataSources }): BlocksResponse {
      return dataSources.BlocksAPI.getBlocks(time).then((value: Array<Maybe<BlockSummary>>) => (
        {
          data: value.slice(offset, offset + limit),
          size: value.length,
          limit,
          offset
        }));
    },
    block(_parent, { hash }, { dataSources }) {
      return dataSources.BlocksAPI.getBlock(hash);
    },
    transactions(_parent, { hash, page }, { dataSources }) {
      const offset = (page - 1) * 10;

      return dataSources.BlocksAPI.getBlock(hash).then((response: BlockDetail) => response?.tx.slice(offset, offset + 10));
    }
  }
}

export default resolvers;