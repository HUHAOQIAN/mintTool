module.exports = Object.freeze({
    // required. wallet privateKey
    privateKey: process.env.PRIVATE_KEY_ACCOUNT_17,
    // privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",

    // required. Your wallet address
    // fromAddress: "0x0ECd20bD4Dd1A52C9109510eb7eDb68c236d3676",
    fromAddress: "0x0ECd20bD4Dd1A52C9109510eb7eDb68c236d3676".toLocaleLowerCase(),

    // reuiqred. Your target contract address
    // toAddress: "0x1537037DA6a93A4FA7b31429decCfB0498486769",
    toAddress: "0xe7F154D05099361D403350A73FD7028dF4A255AF".toLocaleLowerCase(),

    // required. Find out the contract creator address
    // creatorAddress: "0xB63F7313015167869deE148969200AFDF82B36b1",
    creatorAddress: "0xfe86E361A7d3E1a117E4801De01efF243670bb1A".toLocaleLowerCase(),

    // required. The price of public mint
    price: "0",

    // required. How many items you wants to buy
    maxPriorityFeePerGas: "10",

    // required. The collection contract address you want to buy
    maxFeePerGas: "30",

    // required. The num you want to mint
    number: "1",

    // required. http provider from infura or alchemy. It must be wss
    wssMainnet: "wss://eth-mainnet.alchemyapi.io/v2/<mainnet api key>",

    // required. http provider from infura or alchemy. It must be wss
    wssRinkeby: process.env.RINKEBY_WSS_URL,

    // required. http provider from infura or alchemy. It must be wss
    wssGoerli: "wss://eth-goerli.alchemyapi.io/v2/<Goerli api key>",

    // optional. debug usage. The value should be "Rinkeby" for rinkeby, "Goerli" for goerli or "" for mainnet
    network: "default",

    // timere script const, the start time of dutch
    time: 1644069600,
})
