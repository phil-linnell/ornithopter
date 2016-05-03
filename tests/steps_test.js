import {expect} from "chai";
import {first, next, changePoint, percentage, keyframeValue, valueByLinear} from "steps";

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
      expect(Math.round(changePoint(0, 4, n => n) * 1000) / 1000).to.equal(0);
    });

    it("should always return 1", () => {
      expect(Math.round(changePoint(4, 4, n => n) * 1000) / 1000).to.equal(1);
    });

    it("should return a change point between 0 and 1", () => {
      expect(Math.round(changePoint(1, 4, n => n) * 1000) / 1000).to.equal(0.25);
    });

    it("should return a change point between 0 and 1", () => {
      expect(Math.round(changePoint(3, 7, n => n) * 1000) / 1000).to.equal(0.429);
    });

    it("should return a change point between 0 and 1", () => {
      expect(Math.round(changePoint(5, 11, n => n) * 1000) / 1000).to.equal(0.455);
    });

    it("should return a change point between 0 and 1", () => {
      expect(Math.round(changePoint(4, 9, n => n) * 1000) / 1000).to.equal(0.444);
    });
  });

  describe(".percentage()", () => {
    it("should return the second keyframe with no delay", () => {
      expect(percentage(0.25, 500, 0)).to.equal(25);
    });

    it("should return the second keyframe with a .5s delay", () => {
      expect(percentage(0.25, 500, 500, 1000)).to.equal(62.5);
    });

    it("should return the second keyframe with a .2s delay", () => {
      expect(percentage(0.5, 800, 200, 1000)).to.equal(60);
    });

    it("should return the middle keyframe with a .2s delay and shorter than total duration animation", () => {
      expect(percentage(0.5, 200, 200, 1000)).to.equal(30);
    });

    it("should return the first keyframe with a .1s delay and shorter than total duration animation", () => {
      expect(percentage(0, 160, 100, 640)).to.equal(15.63);
    });

    it("should return the middle keyframe with a .1s delay and shorter than total duration animation", () => {
      expect(percentage(0.5, 160, 100, 640)).to.equal(28.13);
    });

    it("should return the penultimate keyframe with a .1s delay and shorter than total duration animation", () => {
      expect(percentage(0.75, 480, 70, 825)).to.equal(52.12);
    });

    it("should return the penultimate keyframe with a .1s delay and shorter than total duration animation", () => {
      expect(percentage((1/3), 1000, 0, 1000)).to.equal(33.33);
    });
  });

  describe(".keyframeValue()", () => {
    it("should return the first value", () => {
      expect(keyframeValue(0, null, [0, 100], 4, x => x)).to.equal(0);
    });

    it("should return the last value", () => {
      expect(keyframeValue(4, null, [0, 100], 4, x => x)).to.equal(100);
    });

    it("should return the second value", () => {
      expect(keyframeValue(1, 0, [0, 100], 4, valueByLinear)).to.equal(20);
    });
  });

  describe(".valueByLinear()", () => {
    it("should return the nth value in a linear timing function", () => {
      expect(valueByLinear(4, 0, 100)).to.equal(20);
    });

    it("should return the nth value in a linear timing function", () => {
      expect(valueByLinear(4, 40, 100)).to.equal(60);
    });

    it("should return the nth value in a linear timing function", () => {
      expect(valueByLinear(4, 14.6, 73)).to.equal(29.2);
    });
  });
});
