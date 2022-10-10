import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { constants } from "../constants";
dotenv.config();

import {
  MyERC20Votes__factory,
  TokenizedBallot__factory,
} from "../typechain-types";

const myChosenProposal = 2;
const amountToVote = ethers.utils.parseEther("1");

async function main() {
  //Getting my account
  const signer = new ethers.Wallet(
    process.env.MY_PRIVATE_KEY!,
    constants.provider
  );

  //Attach contracts to deployed address
  const tokenizedBallotFactory = (await ethers.getContractFactory(
    "TokenizedBallot"
  )) as TokenizedBallot__factory;
  const MyERC20VotesFactory = (await ethers.getContractFactory(
    "MyERC20Votes"
  )) as MyERC20Votes__factory;

  //Delegate for myself first
  // let tx = await MyERC20VotesFactory.connect(signer)
  //   .attach(constants.MyERC20Address)
  //   .delegate(signer.address);
  // await tx.wait();

  //Then Vote on proposal I've chosen
  let tx = await tokenizedBallotFactory
    .connect(signer)
    .attach(constants.tokenizedBallotAddress)
    .vote(myChosenProposal, amountToVote);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
