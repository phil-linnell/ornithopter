import {expect} from "chai";
import {initialStepValue, nextStepValue} from "ornithopter";

describe("steps", () => {
  describe(".initialStepValue()", () => {
    it("should return 0 when delay is 0", () => {
      expect(initialStepValue([1, 0, 'linear'], 1)).to.equal(0);
    });
    it("should return 50 when delay is 0.5", () => {
      expect(initialStepValue([1, 0.5, 'linear'], 1)).to.equal(50);
    });
  });

  describe(".nextStepValue()", () => {
    it("should return the next step from 0", () => {
      expect(initialStepValue(1, 0, 1, 2)).to.equal(100);
    });
  });
});
