import { ethers } from "hardhat";

export const constants = {
  PROPOSALS: [
    "Become a blockchain developer",
    "Get rich at the lottery",
    "Become a smart contract auditor",
  ],
  provider: ethers.getDefaultProvider("goerli"),
  delay: Math.round((24 * 3600) / 12),
  MyERC20Address: "0xbed2b6c106a1b60d1a63fd71a4bc24cb8d8808cc",
  tokenizedBallotAddress: "0x79aa6c0376a693d66ec6c7347c9c1e19a9f7d283",
  teamMates: [
    "0x57cc35046c50c482052e0519417f694d15c37460",
    "0x9c488dfceebb8b879cf7867448f147e569540279",
    "0x58a6552cCB091F9A2fc6c062344E653779a7db45",
    "0x7bbf8a7971f5459b738ef2e1698ae4459ea535f7",
    "0x557309454f14e4689789F37E97464045a2E77879",
    "0xc9578be178d76e4e29783a781dfd4a2dc557b85e",
  ],
  TOKENS_MINTED: ethers.utils.parseEther("3"),
};
