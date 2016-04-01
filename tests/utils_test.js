import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";

import {parseTransformValue} from "utils/value";
import {isTime, isTimingFunction, splitByTime, toMilliseconds} from "utils/time";

chai.use(chaiAsPromised);

describe("utils", function () {
  describe("value", function () {
      it("should parse a simple integer", function () {
        expect(parseTransformValue("scale(1,2)")).to.deep.equal(["scale","1","2"]);
        expect(parseTransformValue("scale( 1, 2 )")).to.deep.equal(["scale","1","2"]);
      });
      it("should parse a integer with pixels", function () {
        expect(parseTransformValue("translateX(1px,2px)")).to.deep.equal(["translateX","1px","2px"]);
      });
      it("should parse a integer with degrees", function () {
        expect(parseTransformValue("rotateX(1deg,2deg)")).to.deep.equal(["rotateX","1deg","2deg"]);
      });
  });

  describe("isTime", function () {
    it("should be true for the given value", function () {
      expect(isTime("1s")).to.be.true;
      expect(isTime("1ms")).to.be.true;
      expect(isTime("0.5s")).to.be.true;
      expect(isTime(".5s")).to.be.true;
      expect(isTime("0")).to.be.true;
      expect(isTime("0s")).to.be.true;
      expect(isTime("25.5s")).to.be.true;
    })
  });

  describe("isTimingFunction", function () {
    it("should be true for the given value", function () {
      expect(isTimingFunction("linear")).to.be.true;
    });
    it("should be true for the given value", function () {
      expect(isTimingFunction("ease-in-out")).to.be.true;
    });
    it("should be true for the given value", function () {
      expect(isTimingFunction("cubic-bezier(.5,1,1,0)")).to.be.true;
    });
  });

  describe("splitByTime", function () {
    it("should return the second array empty", function () {
      expect(splitByTime(["red", "green"])).to.deep.equal([["red", "green"], []]);
    });
    it("should return the second array with one time value", function () {
      expect(splitByTime(["red", "green", "1s"])).to.deep.equal([["red", "green"], ["1s"]]);
    });
    it("should return the second array with two time values", function () {
      expect(splitByTime(["red", "green", "1s", "0.5s"])).to.deep.equal([["red", "green"], ["1s", "0.5s"]]);
    });
    it("should return the second array with one time value and a timing function", function () {
      expect(splitByTime(["red", "green", "1s", "ease-in"])).to.deep.equal([["red", "green"], ["1s", "ease-in"]]);
    });
    it("should return the second array with two time values and a timing function", function () {
      expect(splitByTime(["red", "green", "1s", ".5s", "cubic-bezier(.5,1,1,0)"])).to.deep.equal([["red", "green"], ["1s", ".5s", "cubic-bezier(.5,1,1,0)"]]);
    });
  });

  describe("toMilliseconds", function () {
    it("should convert duration in seconds to duration in milliseconds", function () {
      expect(toMilliseconds("1s")).to.deep.equal("1000ms");
    });
    it("should return duration as it is already in milliseconds", function () {
      expect(toMilliseconds("1000ms")).to.deep.equal("1000ms");
    });
  });

});
