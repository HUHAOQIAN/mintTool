const { ethers } = require("hardhat")

async function main() {
    setInterval(async () => {
        const basicNft = await ethers.getContract("BasicNft")
        console.log(`basicNftAddress is :${basicNft.address}`)
        const mintStart = await basicNft.mintStart()
        const mintStartReceipt = await mintStart.wait()
        console.log(mintStartReceipt)
        const minStatus = await basicNft.getMintStatus()
        console.log(minStatus)
    }, 10000)
}

main()
