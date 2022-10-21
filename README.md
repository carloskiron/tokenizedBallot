# Ballot.sol Project (unit tests and scripts)

This project demostrates the use of unit tests and scripts to interact with Ballot contract (voting contract from Eth official documentation). Hardhat and Ethers are used to deploy the contract, stablish connection, and execute its methods.

.env 
MNEMONIC="" 

Installation
```shell
yarn install
```
Compile contracts
```shell
yarn hardhat compile
```
Unit tests
```shell
yarn hardhat test
```
Deploy contracts on Testnet
```shell
yarn hardhat run ./scripts/deploy.ts
yarn hardhat run ./scripts/deployToken.ts   
```
Delegate
```shell
yarn hardhat run ./scripts/delegate.ts   
```
Vote a proposal
```shell
yarn hardhat run ./scripts/vote.ts   
```
