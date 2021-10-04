/* eslint-disable @typescript-eslint/ban-ts-comment */
import BlocksAPI from 'datasources/BlocksAPI';
import resolvers from 'schema/resolvers';

describe('[Resolvers.blocks]', () => {
    let blocksAPI: BlocksAPI;

    beforeAll(() => {
        blocksAPI = new BlocksAPI();
        const mock = jest.spyOn(blocksAPI, 'getBlocks');
        mock.mockReturnValue(new Promise(resolve => resolve(blocksAPIResponse.data)));
    });

    it('should return only first 10 elements', async () => {
        // @ts-ignore
        const response = await resolvers.Query?.blocks(null, { time: "1633261118582", }, { dataSources: { BlocksAPI: blocksAPI } });
        expect(response).toEqual({
            ...blocksAPIResponse,
            data: blocksAPIResponse.data.slice(0, 10)            
        });

    });

    it('should return only elements at index 2, 3', async () => {
        // @ts-ignore: comment
        const response = await resolvers.Query?.blocks(null, { time: "1633261118582", offset: 1, limit: 2 }, { dataSources: { BlocksAPI: blocksAPI } });
        expect(response).toEqual({
            ...blocksAPIResponse,
            data: blocksAPIResponse.data.slice(1, 3),
            offset: 1,
            limit: 2
        });
    });
});

describe('[Resolvers.block]', () => {
    let blocksAPI: BlocksAPI;

    beforeAll(() => {
        blocksAPI = new BlocksAPI();
        const mock = jest.spyOn(blocksAPI, 'getBlock');
        mock.mockReturnValue(new Promise(resolve => resolve(rawBlockResponse)));
    });

    it('should return only first 10 elements', async () => {
        // @ts-ignore
        const response = await resolvers.Query?.block(null, { hash: "someHash", }, { dataSources: { BlocksAPI: blocksAPI } });
        expect(response).toEqual(rawBlockResponse);
    });
});

const rawBlockResponse = {
    "hash": "0000000000000000000eb4e00c392809ba3e516b02a576d631c7d1cc098f548e",
    "prev_block": "00000000000000000006173d54a814cc711c45fb5a2270d4b7f6ec200c700a23",
    "time": 1633237662,
    "next_block": [
        "00000000000000000007935724da064a14fd25a98b56175ba8f81f4833c8c33e"
    ],
    "fee": 4580433,
    "n_tx": 1008,
    "size": 733260,
    "block_index": 703319,
    "height": 703319
};

// We have 11 blocks
const blocksAPIResponse = {
    "data": [
        {
            "block_index": 702640,
            "hash": "0000000000000000000c9168cbef656c6c564c4c03acf748264e31fdb9676a10",
            "height": 702640,
            "time": 1632866591
        },
        {
            "block_index": 702639,
            "hash": "000000000000000000033efb12cfd1b152b3f105f7b5880f8ad8b97ba234cca5",
            "height": 702639,
            "time": 1632866205
        },
        {
            "block_index": 702638,
            "hash": "0000000000000000000e5e84e0f5e33fc3c6a3539f094ae0a4b0c9954b4ebfb2",
            "height": 702638,
            "time": 1632864990
        },
        {
            "block_index": 702637,
            "hash": "000000000000000000064bb2ea7e05e216c7e9905dff16786d5cd459182d56ac",
            "height": 702637,
            "time": 1632864706
        },
        {
            "block_index": 702636,
            "hash": "0000000000000000000733779b1590c56a87af8ecba6955bccdd0aacec7768ac",
            "height": 702636,
            "time": 1632863023
        },
        {
            "block_index": 702635,
            "hash": "000000000000000000083aac313e3f2a11a7d42c389c3603eb118e51f503da62",
            "height": 702635,
            "time": 1632862875
        },
        {
            "block_index": 702634,
            "hash": "0000000000000000000624e0042b20d2ae2214746dd9c33f910a1cef3e175888",
            "height": 702634,
            "time": 1632862255
        },
        {
            "block_index": 702633,
            "hash": "00000000000000000004f18dc68bc3a43371f46d83f33260ff1c5a585a96021b",
            "height": 702633,
            "time": 1632862214
        },
        {
            "block_index": 702632,
            "hash": "00000000000000000006c41f401e88ddc99d9069aa670a3110c1b949f34d0a85",
            "height": 702632,
            "time": 1632861698
        },
        {
            "block_index": 702631,
            "hash": "0000000000000000000b61d6275182ed27a6b2131b6dfcfe10e338dbc7e289a4",
            "height": 702631,
            "time": 1632860999
        },
        {
            "hash": "0000000000000000000b0bbce9105dfcb11ab972d25e6c1096606e042ec62499",
            "height": 702630,
            "time": 1632860074,
            "block_index": 702630
        }
    ],
    "limit": 10,
    "offset": 0,
    "size": 11
};