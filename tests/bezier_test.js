import {expect} from "chai";
import {point, linear, quadratic, cubic} from "bezier";

describe("bezier", function () {
  describe(".linear()", function () {
    it("should return a point at 0", function () {
      expect(linear(0, point(0, 0),
                       point(1, 1))).to.deep.equal(point(0, 0));
    });

    it("should return a point at 0.5", function () {
      expect(linear(0.5, point(0, 0),
                         point(1, 1))).to.deep.equal(point(0.5, 0.5));
    });
    it("should return a point at 1", function () {
      expect(linear(1, point(0, 0),
                       point(1, 1))).to.deep.equal(point(1, 1));
    });
  });

  describe(".quadratic()", function () {
    it("should return a point at 0", function () {
      expect(quadratic(0, point(0, 0),
                          point(0, 1),
                          point(1, 1))).to.deep.equal(point(0, 0));
    });

    it("should return a point at 0.5", function () {
      expect(quadratic(0.5, point(0, 0),
                            point(0, 1),
                            point(1, 1))).to.deep.equal(point(0.25, 0.75));
    });

    it("should return a point at 1", function () {
      expect(quadratic(1, point(0, 0),
                          point(0, 1),
                          point(1, 1))).to.deep.equal(point(1, 1));
    });
  });

  describe(".cubic()", () => {
    it("should return a point at 0", function () {
      expect(cubic(0, point(0, 0),
                      point(0, 1),
                      point(1, 0),
                      point(1, 1))).to.deep.equal(point(0, 0));
    });

    it("should return a point at 0.5", function () {
      expect(cubic(0.5, point(0, 0),
                        point(0, 1),
                        point(1, 0),
                        point(1, 1))).to.deep.equal(point(0.5, 0.5));
    });

    it("should return a point at 1", function () {
      expect(cubic(1, point(0, 0),
                      point(0, 1),
                      point(1, 0),
                      point(1, 1))).to.deep.equal(point(1, 1));
    });
  });
});
