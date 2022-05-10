import { expect } from "chai";
import { ethers } from "ethers";
import { shortenAddress } from "../src/utils/shortenAddress";

describe("shorten address", () => {
  it("should shorten address", () => {
    const fullAddress = ethers.constants.AddressZero;
    const finalAddress = "0x0000...000000";
    expect(shortenAddress(fullAddress)).to.equal(finalAddress);
  });
});
