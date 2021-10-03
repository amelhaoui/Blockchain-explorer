/* eslint-disable @typescript-eslint/no-unused-vars */
import { HTTPCache } from 'apollo-datasource-rest';
import BlocksAPI from 'datasources/BlocksAPI';
import { MapKeyValueCache } from './MapKeyValueCache';

describe('[BlocksAPI.getBlocks]', () => {
  let httpCache: HTTPCache;
  const blocksAPI = new BlocksAPI();

  beforeEach(() => {
    httpCache = new HTTPCache(new MapKeyValueCache<string>());
    blocksAPI.httpCache = httpCache;
  });


  it('should find a block from the api lookup', async () => {
    const res = await blocksAPI.getBlocks("1633261118582");
    
    expect(res).toEqual(expect.arrayContaining(
        [{
           "block_index": 703319,
           "hash": "0000000000000000000eb4e00c392809ba3e516b02a576d631c7d1cc098f548e",
           "height": 703319,
           "time": 1633237662
          }]
    ));
  });
});

describe('[BlocksAPI.getBlock]', () => {
  let httpCache: HTTPCache;
  const blocksAPI = new BlocksAPI();

  beforeEach(() => {
    httpCache = new HTTPCache(new MapKeyValueCache<string>());
    blocksAPI.httpCache = httpCache;
  });


  it('should fetch information about the block', async () => {
    const res = await blocksAPI.getBlock("0000000000000000000eb4e00c392809ba3e516b02a576d631c7d1cc098f548e");
    
    expect(res).toMatchObject(
      {
        "hash":"0000000000000000000eb4e00c392809ba3e516b02a576d631c7d1cc098f548e",
        "prev_block":"00000000000000000006173d54a814cc711c45fb5a2270d4b7f6ec200c700a23",
        "time":1633237662,
        "next_block":[
           "00000000000000000007935724da064a14fd25a98b56175ba8f81f4833c8c33e"
        ],
        "fee":4580433,
        "n_tx":1008,
        "size":733260,
        "block_index":703319,
        "height":703319
      }
    )
  });
});