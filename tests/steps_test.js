import {expect} from "chai";
import {first, next} from "steps";

describe("steps", () => {
  describe(".first()", () => {
    it("should return 0 when delay is 0", () => {
      expect(first([1, 0, 'linear'], 1)).to.equal(0);
    });

    it("should return 50 when delay is 0.5", () => {
      expect(first([1, 0.5, 'linear'], 1)).to.equal(50);
    });
  });

  describe(".next()", () => {
    it("should return the next step from 0", () => {
      const duration = 1;
      const delay = 0;
      const previous = 0;
      const totalDuration = 1;
      const totalSteps = 2;

      expect(next(duration,
                  delay,
                  previous,
                  totalDuration,
                  totalSteps)).to.equal(100);
    });

    it("should return the next step from 50 with no delay", () => {
      const duration = 1;
      const delay = 0;
      const previous = 50;
      const totalDuration = 1;
      const totalSteps = 2;

      expect(next(duration,
                  delay,
                  previous,
                  totalDuration,
                  totalSteps)).to.equal(100);
    });

    it("should return the next step from 50 with delay", () => {
      const duration = 0.5;
      const delay = 0.5;
      const previous = 50;
      const totalDuration = 1;
      const totalSteps = 2;

      expect(next(duration,
                  delay,
                  previous,
                  totalDuration,
                  totalSteps)).to.equal(100);
    });
  });
});
