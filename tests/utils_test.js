import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";

import {parseTransformValue} from "utils/value";
import {isTime} from "utils/time";

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
});
