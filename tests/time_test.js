import chai, { expect } from 'chai';

import { parseTransformValue } from 'utils/value';
import { isTime, isTimingFunction, splitByTime, toMilliseconds, keyframePercentage, splitBySmoothness, isUnitless } from "utils/time";

describe('utils/time', function () {
  describe('isTime', function () {
    it('should be true for the given value', function () {
      expect(isTime('1s')).to.be.true;
      expect(isTime('1ms')).to.be.true;
      expect(isTime('0.5s')).to.be.true;
      expect(isTime('.5s')).to.be.true;
      expect(isTime('0')).to.be.true;
      expect(isTime('0s')).to.be.true;
      expect(isTime('25.5s')).to.be.true;
    })
  });

  describe('isTimingFunction', function () {
    it('should be true for the given value', function () {
      expect(isTimingFunction('linear')).to.be.true;
    });
    it('should be true for the given value', function () {
      expect(isTimingFunction('ease-in-out')).to.be.true;
    });
    it('should be true for the given value', function () {
      expect(isTimingFunction('cubic-bezier(.5,1,1,0)')).to.be.true;
    });
  });

  describe('splitByTime', function () {
    it('should return the second array empty', function () {
      expect(splitByTime(['red', 'green'])).to.deep.equal([['red', 'green'], []]);
    });
    it('should return the second array with one time value', function () {
      expect(splitByTime(['red', 'green', '1s'])).to.deep.equal([['red', 'green'], ['1s']]);
    });
    it('should return the second array with two time values', function () {
      expect(splitByTime(['red', 'green', '1s', '0.5s'])).to.deep.equal([['red', 'green'], ['1s', '0.5s']]);
    });
    it('should return the second array with one time value and a timing function', function () {
      expect(splitByTime(['red', 'green', '1s', 'ease-in'])).to.deep.equal([['red', 'green'], ['1s', 'ease-in']]);
    });
    it('should return the second array with two time values and a timing function', function () {
      expect(splitByTime(['red', 'green', '1s', '.5s', 'cubic-bezier(.5,1,1,0)'])).to.deep.equal([['red', 'green'], ['1s', '.5s', 'cubic-bezier(.5,1,1,0)']]);
    });
  });

  describe("toMilliseconds", function () {
    it("should convert duration in seconds to duration in milliseconds", function () {
      expect(toMilliseconds("1s")).to.deep.equal(1000);
    });
    it("should convert duration in seconds to duration in milliseconds", function () {
      expect(toMilliseconds("1.5s")).to.deep.equal(1500);
    });
    it("should return duration as it is already in milliseconds", function () {
      expect(toMilliseconds("1000ms")).to.deep.equal(1000);
    });
  });

  describe("keyframePercentage", function () {
    it("should convert a time value to a value that represents a percentage of the total duration", function () {
      expect(keyframePercentage(1000, 2000)).to.deep.equal(50);
    });
    it("should convert a time value to a value that represents a percentage of the total duration", function () {
      expect(keyframePercentage(500, 1700)).to.deep.equal(29.4);
    });
  });

  describe("splitBySmoothness", function () {
    it("should return the default value", function () {
      expect(splitBySmoothness([], 4)).to.deep.equal([[], 4]);
    });
    it("should return the smoothness value", function () {
      expect(splitBySmoothness(["3"], 4)).to.deep.equal([[], 3]);
    });
    it("should return the smoothness value", function () {
      expect(splitBySmoothness([".5s", "3"], 4)).to.deep.equal([[".5s"], 3]);
    });
    it("should return the smoothness value", function () {
      expect(splitBySmoothness([".5s"], 4)).to.deep.equal([[".5s"], 4]);
    });
    it("should return the smoothness value", function () {
      expect(splitBySmoothness([".5s", "1s", "ease-out"], 4)).to.deep.equal([[".5s", "1s", "ease-out"], 4]);
    });
  });

  describe("isUnitless", function () {
    it("should return true", function () {
      expect(isUnitless("5")).to.be.true;
    });
    it("should return false", function () {
      expect(isUnitless("5s")).to.be.false;
    });
  });
});
