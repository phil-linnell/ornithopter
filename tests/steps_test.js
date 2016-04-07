import {expect} from "chai";
import {first, next, changePoint, percentage} from "steps";

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
  describe(".changePoint()", () => {
    it("should always return 0", () => {
      expect(changePoint(0, 4, n => n)).to.equal(0);
    });

    it("should always return 1", () => {
      expect(changePoint(4, 4, n => n)).to.equal(1);
    });

    it("should return a change point between 0 and 1", () => {
      expect(changePoint(1, 4, n => n)).to.equal(0.25);
    });

    it("should return a change point between 0 and 1", () => {
      expect(changePoint(3, 7, n => n)).to.equal(0.429);
    });

    it("should return a change point between 0 and 1", () => {
      expect(changePoint(5, 11, n => n)).to.equal(0.455);
    });

    it("should return a change point between 0 and 1", () => {
      expect(changePoint(4, 9, n => n)).to.equal(0.444);
    });
  });

  describe(".percentage()", () => {
    it("should return the second keyframe with no delay", () => {
      expect(percentage(0.25, 500, 0)).to.equal(25);
    });

    it("should return the second keyframe with a .5s delay", () => {
      expect(percentage(0.25, 500, 500, 1000)).to.equal(62.5);
    });
  });
});
