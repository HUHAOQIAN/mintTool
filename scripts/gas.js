const AlchemyWeb3 = require("@alch/alchemy-web3")
const _ = require("lodash")
const Tx = require("ethereumjs-tx").Transaction
const abiDecoder = require("abi-decoder")
const ethers = require("ethers") // Require the ethers library
const utils = require("ethers").utils
const config = require("../config.js")
let json = require("../constants/abi.json")

var gasRank = []

const pendingTransactions = async () => {
    let web3URL
    let targetContract
    let creator

    console.log("Network Mode:", config.network)
    switch (config.network) {
        //---------------- TEST USAGE-------------------------
        case "Rinkeby": {
            web3URL = config.wssRinkeby
            targetContract = ""
            creator = ""
            break
        }
        case "Goerli": {
            web3URL = config.wssGoerli
            targetContract = ""
            creator = ""
            break
        }
        //-----------------------------------------------------
        default: {
            web3URL = config.wssRinkeby
            targetContract = config.toAddress
            creator = config.creatorAddress
        }
    }

    console.log("Web3URL:", web3URL)
    console.log(targetContract)
    const web3 = AlchemyWeb3.createAlchemyWeb3(web3URL)
    // UNIT TEST
    const txn = await web3.eth.getTransaction(
        "0xfde03763fb0a58c86721ac19121190db842215ae9fc19413a415921e9fb0b9e4"
    )
    // console.log(txn)
    if (txn.gasPrice === "1018546680") {
        console.log("Unit test passed")
    } else {
        throw new Error("Your web3 setting is failing...")
    }
    // DEBUG SECTION
    // sendMinimalLondonTx(web3, data, targetContract, config.price)

    web3.eth
        .subscribe("alchemy_pendingTransactions", {
            // monitor confirm txn gas, change the pendinngT.... to logs
            toAddress: targetContract.toLocaleLowerCase(),
        })
        .on("data", async (blockHeader) => {
            // console.log("xxxxxx blockHeader:", blockHeader)
            let maxFeePerGas
            let maxPriorityFeePerGas
            if ("maxPriorityFeePerGas" in blockHeader) {
                maxFeePerGas = web3.utils.fromWei(blockHeader.maxFeePerGas, "gwei")
                maxPriorityFeePerGas = web3.utils.fromWei(blockHeader.maxPriorityFeePerGas, "gwei")
            } else {
                if ("gasPrice" in blockHeader) {
                    maxFeePerGas = web3.utils.fromWei(blockHeader.gasPrice, "gwei")
                    maxPriorityFeePerGas =
                        web3.utils.fromWei(blockHeader.gasPrice, "gwei") > 60
                            ? web3.utils.fromWei(blockHeader.gasPrice, "gwei") - 60
                            : 0
                }
            }
            // console.log("gas",maxFeePerGas,maxPriorityFeePerGas, typeof maxPriorityFeePerGas);
            gasRank.push([parseFloat(maxFeePerGas), parseFloat(maxPriorityFeePerGas)])
            // console.log(gasRank)
        })
}

function roundTo(num) {
    return Math.round(num * 100) / 100
}
var copyRank
const sortRank = () => {
    setInterval(function () {
        copyRank = JSON.parse(JSON.stringify(gasRank))
        gasRank = []

        copyRank.sort(function (a, b) {
            return b[1] - a[1]
        })
        let sum = 0.0
        copyRank = copyRank.slice(0, 200)
        console.log(copyRank)
        for (let i of copyRank) {
            sum += i[1]
            // console.log(`i is ${i}, sum is ${sum}`)
        }
        if (copyRank.length) {
            console.log(
                "PENDING TXN (",
                copyRank.length,
                ") MAX TIPS(GWEI)",
                roundTo(copyRank[0][1]),
                "MIN TIPS(GWEI)",
                roundTo(copyRank[copyRank.length - 1][1]),
                "Average(GWEI)",
                roundTo(sum / copyRank.length)
                // mintFee.push(roundTo(copyRank[0][0]), roundTo(copyRank[0][1])),
                // console.log(mintFee)
            )
        } else {
            console.log("No pending txn")
        }
    }, 5000)
}

pendingTransactions()
sortRank()

module.exports = { sortRank, copyRank }
