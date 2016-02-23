import {expect} from "chai";
import {process} from "ornithopter";

describe("ornithopter", () => {
  describe(".process()", () => {
    it("should return two keyframes for transform with translateX", () => {
      var actual = process('transform', ['100px', '200px'], 'translateX');
      var expected = [{step: 0, properties: [{property: 'transform', value: 'translateX(100px)'}]},
                      {step: 100, properties: [{property: 'transform', value: 'translateX(200px)'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return two keyframes for transform with rotate", () => {
      var actual = process('transform', ['0deg', '360deg'], 'rotate');
      var expected = [{step: 0, properties: [{property: 'transform', value: 'rotate(0deg)'}]},
                      {step: 100, properties: [{property: 'transform', value: 'rotate(360deg)'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return three keyframes for transform with translateY", () => {
      var actual = process('transform', ['0', '100px', '150px'], 'translateX');
      var expected = [{step: 0, properties: [{property: 'transform', value: 'translateX(0)'}]},
                      {step: 50, properties: [{property: 'transform', value: 'translateX(100px)'}]},
                      {step: 100, properties: [{property: 'transform', value: 'translateX(150px)'}]}];
      expect(actual).to.deep.equal(expected);
    });
  });
});
