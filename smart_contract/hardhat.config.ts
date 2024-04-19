import { HardhatUserConfig } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-chai-matchers";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    base_sepolia: {
      url: "https://sepolia.base.org",
      accounts: {
        mnemonic: process.env.MNEMONIC ?? "",
      },
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${
        process.env.ALCHEMY_SEPOLIA_KEY ?? ""
      }`,
      accounts: {
        mnemonic: process.env.MNEMONIC ?? "",
      },
    },
  },
};

export default config;
