import {expect} from "chai";
import {process} from "ornithopter";

describe("ornithopter", function () {
  describe(".process()", function () {
    it("should return two keyframes for transform with translateX", function () {
      var actual = process({property: 'transform', value: ['100px', '200px'], fn: 'translateX', totalDuration: '1s'});
      var expected = [{step: 0, properties: [{property: 'transform', value: 'translateX(100px)'}]},
                      {step: 100, properties: [{property: 'transform', value: 'translateX(200px)'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return two keyframes for transform with rotate", function () {
      var actual = process({property: 'transform', value: ['0deg', '360deg'], fn: 'rotate', totalDuration: '1s'});
      var expected = [{step: 0, properties: [{property: 'transform', value: 'rotate(0deg)'}]},
                      {step: 100, properties: [{property: 'transform', value: 'rotate(360deg)'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return three keyframes for transform with translateY", function () {
      var actual = process({property: 'transform', value: ['0', '100px', '150px'], fn: 'translateX', totalDuration: '1s'});
      var expected = [{step: 0, properties: [{property: 'transform', value: 'translateX(0)'}]},
                      {step: 50, properties: [{property: 'transform', value: 'translateX(100px)'}]},
                      {step: 100, properties: [{property: 'transform', value: 'translateX(150px)'}]}];
      expect(actual).to.deep.equal(expected);
    });
  });
});
