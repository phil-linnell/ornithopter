import {expect} from "chai";
import {processTransform} from "ornithopter";

describe("ornithopter", () => {
  describe(".processTransform()", () => {
    it("should return two keyframes for transform with translateX", () => {
      var actual = processTransform('transform', 'translateX', ['100px', '200px']);
      var expected = [{step: 0, properties: [{property: 'transform', value: 'translateX(100px)'}]},
                      {step: 100, properties: [{property: 'transform', value: 'translateX(200px)'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return two keyframes for transform with rotate", () => {
      var actual = processTransform('transform', 'rotate', ['0deg', '360deg']);
      var expected = [{step: 0, properties: [{property: 'transform', value: 'rotate(0deg)'}]},
                      {step: 100, properties: [{property: 'transform', value: 'rotate(360deg)'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return three keyframes for transform with translateY", () => {
      var actual = processTransform('transform', 'translateX', ['0', '100px', '150px']);
      var expected = [{step: 0, properties: [{property: 'transform', value: 'translateX(0)'}]},
                      {step: 50, properties: [{property: 'transform', value: 'translateX(100px)'}]},
                      {step: 100, properties: [{property: 'transform', value: 'translateX(150px)'}]}];
      expect(actual).to.deep.equal(expected);
    });
  });
});
