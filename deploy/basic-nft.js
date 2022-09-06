const { ethers, getNamedAccounts, deployments, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async () => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments
    log("-------------")
    const basicNft = await deploy("BasicNft", {
        from: deployer,
        log: true,
        args: [],
        waitConfirmation: network.config.blockConfirmation || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("verifying...")
        await verify(basicNft.address, [])
    }
}
