import {expect} from "chai";
import Color, {isColor, rangeLength} from "utils/color";
import {keyframeValue} from "steps";

describe("color", function () {
  describe("experiment", function () {
    it("sanity check", function () {
      expect(Color("red").rgb()).to.deep.equal({r: 255, g: 0, b: 0});
      expect(Color("deeppink").rgb()).to.deep.equal({r: 255, g: 20, b: 147});
    });
  });

  describe("Is color?", function () {
    it("isColor() true", function () {
      expect(isColor("red")).to.be.true;
      expect(isColor("deeppink")).to.be.true;
    });

    it("isColor() false", function () {
      expect(isColor("bronze")).to.be.false;
    });

    it("isColor() false", function () {
      expect(isColor("100px")).to.be.false;
      expect(isColor("0")).to.be.false;
    });
  });

  describe("Range length", function () {
    it("rangeLength()", function () {
      expect(rangeLength(255, 0)).to.equal(255);
    });

    it("rangeLength()", function () {
      expect(rangeLength(50, 255)).to.equal(-205);
    });
  });

  describe("keyframeValue", function () {
    it("should return the first value", function () {
      expect(keyframeValue(0, null, [Color("red"), Color("green")], 4, x => x)).to.deep.equal(Color("red"));
    });

    it("should return the last value", function () {
      expect(keyframeValue(4, null, [Color("red"), Color("green")], 4, x => x)).to.deep.equal(Color("green"));
    });

    it("should return the second value", function () {
      expect(keyframeValue(1, Color("red"), [Color("red"), Color("green")], 4, valueByLinearColor)).to.deep.equal(Color({r: 204, g: 26, b: 0}));
    });
  });
});
