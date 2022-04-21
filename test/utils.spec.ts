import { expect } from "chai";
import { shortenAddress } from "../src/utils/shortenAddress";

describe("utils tests", () => {
  before(() => {
    // set up test suite
  });
  it("should shorten address", () => {
    const shortenedAddress = shortenAddress(
      "0x0e9b8a8f9c9e7e0b8f6b8f8c8c8c8c8c8c8c8c8c8c"
    );
    expect(shortenedAddress.length).to.equal(17);
    expect(shortenedAddress.indexOf("0x")).to.equal(0);
  });
});
