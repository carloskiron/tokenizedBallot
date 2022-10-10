import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { constants } from "../constants";
dotenv.config();

import {
  MyERC20Votes__factory,
  TokenizedBallot__factory,
} from "../typechain-types";

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
  const myERC20VotesContract = await MyERC20VotesFactory.connect(signer).attach(
    constants.MyERC20Address
  );
  // Attach TokenizedBallot contract to the one deployed
  const tokenizedBallotFactory = (await ethers.getContractFactory(
    "TokenizedBallot"
  )) as TokenizedBallot__factory;
  const tokenizedBallotContract = await tokenizedBallotFactory
    .connect(signer)
    .attach(constants.tokenizedBallotAddress);

  const totalSupply = await myERC20VotesContract.totalSupply();
  console.info(
    `The total supply of this contract after minting is ${ethers.utils.formatEther(
      totalSupply
    )} Ether \n`
  );

  // Print Token/Vote balancefor each teammate
  const balancesForuser = [];
  for (let i = 0; i < constants.teamMates.length; i++) {
    const account1Balance = await myERC20VotesContract.balanceOf(
      constants.teamMates[i]
    );
    // console.info(
    //   `The token balance of ${
    //     constants.teamMates[i]
    //   } is ${ethers.utils.formatEther(account1Balance)} \n`
    // );
    const teamMateVotingBalance = await myERC20VotesContract.getVotes(
      constants.teamMates[i]
    );
    // console.info(
    //   `The vote balance of ${
    //     constants.teamMates[i]
    //   } is ${ethers.utils.formatEther(teamMateVotingBalance)} \n`
    // );
    const votePower = await tokenizedBallotContract.votePower(
      constants.teamMates[i]
    );

    balancesForuser.push({
      teamMateAddress: constants.teamMates[i],
      tokenBalance: ethers.utils.formatEther(account1Balance),
      voteBalance: ethers.utils.formatEther(teamMateVotingBalance),
      votePower: ethers.utils.formatEther(votePower),
    });
  }
  console.table(balancesForuser);
}

main()
  .then(() => {
    console.info("bye");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
