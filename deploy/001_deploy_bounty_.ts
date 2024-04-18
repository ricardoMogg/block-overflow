import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  // We can now use deployer
  const { deployer } = await hre.getNamedAccounts();

  // We say we want to deploy our Lock contract using the deployer
  // account and passing the value and arguments.
  await deploy("BountyContract", {
    from: deployer,
  });
};

export default func;

// This tag will help us in the next section to trigger this deployment file programmatically
func.tags = ["DeployAll"];
