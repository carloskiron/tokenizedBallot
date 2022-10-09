import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import "./convertStringArrayToBytes32";
import { constants } from "../constants";
dotenv.config();

import {
  MyERC20Votes,
  MyERC20Votes__factory,
  TokenizedBallot,
  TokenizedBallot__factory,
} from "../typechain-types";
import { convertStringArrayToBytes32 } from "./convertStringArrayToBytes32";

async function main() {
  //Getting my account
  const signer = new ethers.Wallet(
    process.env.MY_PRIVATE_KEY!,
    constants.provider
  );

  //Deploy ERC20 contract
  const MyERC20VotesFactory = (await ethers.getContractFactory(
    "MyERC20Votes"
  )) as MyERC20Votes__factory;
  const MyERC20Votes = (await MyERC20VotesFactory.connect(
    signer
  ).deploy()) as MyERC20Votes;
  const deploymentReceiptERC20 = await MyERC20Votes.deployed();

  //Deploy TokenizedBallot
  const tokenizedBallotFactory = (await ethers.getContractFactory(
    "TokenizedBallot"
  )) as TokenizedBallot__factory;
  //Get the latest block number
  const actualBlockHeight = await constants.provider.getBlockNumber();
  const TokenizedBallot = (await tokenizedBallotFactory
    .connect(signer)
    .deploy(
      convertStringArrayToBytes32(constants.PROPOSALS),
      MyERC20Votes.address,
      actualBlockHeight + constants.delay
    )) as TokenizedBallot;
  const deploymentReceiptBallot = await TokenizedBallot.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
