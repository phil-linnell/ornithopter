import fs from "fs";
import postcss from "postcss";
import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";

import ornithopter from "postcss-ornithopter";

chai.use(chaiAsPromised);

const processor = postcss([ornithopter]);

describe("postcss-ornithopter", function () {
  // beforeEach(function () {
  //   const processor = postcss([ornithopter]);
  // })

  describe("scratchpad", function () {
    it("should foo", function (done) {
      const from = "tests/reference/postcss/linear-color-02.postcss.css";
      const to = "tests/reference/postcss/linear-color-02.css";

      const input = fs.readFileSync(from, "utf-8");
      const output = fs.readFileSync(to, "utf-8");

      expect(processor.process(input, {from, to})
                      .then(result => result.css)).to.eventually
                                                  .eq(output)
                                                  .notify(done);
    });
  });
});
