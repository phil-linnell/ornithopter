import {expect} from "chai";
import O from "ornithopter";
import {processColor} from "ornithopter";

describe("ornithopter", () => {
  describe(".processColor()", () => {
    it("noop", () => {
      expect(processColor(['red', 'green'])).to.deep.equal(['red', 'green']);
    });
  });
});
