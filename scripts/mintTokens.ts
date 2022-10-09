import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { constants } from "../constants";
dotenv.config();

import { MyERC20Votes__factory } from "../typechain-types";

async function main() {
  //Getting my account
  const signer = new ethers.Wallet(
    process.env.MY_PRIVATE_KEY!,
    constants.provider
  );

  //Attach ERC20 contract to deployed ERC20 contract
  const MyERC20VotesFactory = (await ethers.getContractFactory(
    "MyERC20Votes"
  )) as MyERC20Votes__factory;

  //Mint vote tokens for team mates
  for (let i = 0; i < constants.teamMates.length; i++) {
    const tx = await MyERC20VotesFactory.connect(signer)
      .attach(constants.MyERC20Address)
      .mint(constants.teamMates[i], constants.TOKENS_MINTED);
    await tx.wait();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
