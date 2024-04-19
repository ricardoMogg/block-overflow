import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

import { expect } from "chai";
import hre from "hardhat";
import { parseEther } from "viem";
import { getAddress, parseGwei } from "viem";

describe("BountyContract", function () {
  const deploy = async () => {
    const [owner, bountyReceiver] = await hre.viem.getWalletClients();
    const contract = await hre.viem.deployContract("BountyContract", []);
    const publicClient = await hre.viem.getPublicClient();

    return {
      contract,
      owner,
      bountyReceiver,
      publicClient,
    };
  };

  describe("Bounties", function () {
    describe("Execution", function () {
      it("Should create a bounty", async function () {
        const { owner, contract } = await loadFixture(deploy);

        await contract.write.createBounty(["1"], { value: parseEther("1") });

        const bounty = await contract.read.bounties(["1"]);

        expect(bounty[0].toLowerCase()).to.equal(
          owner.account.address.toLowerCase()
        );
        expect(bounty[1]).to.equal(parseEther("1"));
        expect(bounty[2]).to.be.false;
      });

      it("Should pay a bounty", async function () {
        const { bountyReceiver, contract } = await loadFixture(deploy);

        await contract.write.createBounty(["1"], { value: parseEther("1") });

        await contract.write.executePayout([
          "1",
          bountyReceiver.account.address,
        ]);

        const bounty = await contract.read.bounties(["1"]);

        expect(bounty[2]).to.be.true;
      });
    });

    describe("Validations", function () {
      it("Bounty should have some value greater than 0", async function () {
        const { contract } = await loadFixture(deploy);

        await expect(contract.write.createBounty(["1"])).to.be.rejectedWith(
          "Bounty amount must be greater than zero"
        );
      });

      it("Bounty should have new bounty_id", async function () {
        const { contract } = await loadFixture(deploy);

        await contract.write.createBounty(["1"], { value: parseEther("1") });

        await expect(
          contract.write.createBounty(["1"], { value: parseEther("1") })
        ).to.be.rejectedWith("Bounty with this ID already exists");
      });

      it("Bounty payment can't  be double payed", async function () {
        const { bountyReceiver, contract } = await loadFixture(deploy);

        await contract.write.createBounty(["1"], { value: parseEther("1") });

        await contract.write.executePayout([
          "1",
          bountyReceiver.account.address,
        ]);

        await expect(
          contract.write.executePayout(["1", bountyReceiver.account.address])
        ).to.be.rejectedWith("Bounty is already paid");
      });
    });
  });
});
