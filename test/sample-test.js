const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer NFT to someone", async function () {
    const oCyboss = await ethers.getContractFactory("OCyboss");
    const ocyboss = await oCyboss.deploy();
    await ocyboss.deployed();

    const recipient = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";
    const newLocal = "QmTSEJyrcyS1f5FdjVaq5kyTZ4RECuuVJ14Lh2tNHj5yTg/0.png";
    const metadataURI = newLocal;

    let balance = await ocyboss.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await ocyboss.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.01"),
    });

    // wait until the transaction is minted
    await newlyMintedToken.wait();

    balance = await ocyboss.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await ocyboss.isContentOwned(metadataURI)).to.equal(true);
  });
});
