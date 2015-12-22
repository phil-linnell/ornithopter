import {expect} from "chai";
import {point, linear, quadratic, cubic} from "bezier";

describe("bezier", () => {
  describe(".linear()", () => {
    it("should return a point at 0", () => {
      expect(linear(0, point(50, 50),
                       point(300, 300))).to.deep.equal(point(300, 300));
    });

    it("should return a point at 0.5", () => {
      expect(linear(0.5, point(50, 50),
                         point(300, 300))).to.deep.equal(point(175, 175));
    });
    it("should return a point at 1", () => {
      expect(linear(1, point(50, 50),
                       point(300, 300))).to.deep.equal(point(50, 50));
    });
  });

  describe(".quadratic()", () => {
    it("should return a point at 0", () => {
      expect(quadratic(0, point(50, 50),
                          point(50, 300),
                          point(300, 300))).to.deep.equal(point(300, 300));
    });

    it("should return a point at 0.5", () => {
      expect(quadratic(0.5, point(50, 50),
                            point(50, 300),
                            point(300, 300))).to.deep.equal(point(112.5, 237.5));
    });

    it("should return a point at 1", () => {
      expect(quadratic(1, point(50, 50),
                          point(50, 300),
                          point(300, 300))).to.deep.equal(point(50, 50));
    });
  });

  describe(".cubic()", () => {
    it("should return a point at 0", () => {
      expect(cubic(0, point(50, 50),
                      point(50, 300),
                      point(300, 50),
                      point(300, 300))).to.deep.equal(point(300, 300));
    });

    it("should return a point at 0.5", () => {
      expect(cubic(0.5, point(50, 50),
                        point(50, 300),
                        point(300, 50),
                        point(300, 300))).to.deep.equal(point(175, 175));
    });

    it("should return a point at 1", () => {
      expect(cubic(1, point(50, 50),
                      point(50, 300),
                      point(300, 50),
                      point(300, 300))).to.deep.equal(point(50, 50));
    });
  });
});
