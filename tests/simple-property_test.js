import {expect} from "chai";
import {process} from "ornithopter";

describe("ornithopter", function () {
  describe(".process()", function () {
    it("should return two keyframes for width", function () {
      var actual = process('width', ['100px', '200px']);
      var expected = [{step: 0, properties: [{property: 'width', value: '100px'}]},
                      {step: 100, properties: [{property: 'width', value: '200px'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return two keyframes for height", function () {
      var actual = process('height', ['100px', '200px']);
      var expected = [{step: 0, properties: [{property: 'height', value: '100px'}]},
                      {step: 100, properties: [{property: 'height', value: '200px'}]}];
      expect(actual).to.deep.equal(expected);
    });
  });
});
