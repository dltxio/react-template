// This file will be "required" by the Mocha test runner. (See .mocharc.json)
// It will cause Mocha to use the tsconfig for testing. This method was chosen because it works cross-platform.
require("ts-node").register({
  project: "tsconfig.test.json"
});
