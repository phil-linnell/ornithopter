import {expect} from "chai";
import {process} from "ornithopter";

describe("ornithopter", () => {
  describe(".process()", () => {
    it("should return two keyframes for width", () => {
      var actual = process('width', ['100px', '200px']);
      var expected = [{step: 0, properties: [{name: 'width', value: '100px'}]},
                      {step: 100, properties: [{name: 'width', value: '200px'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return two keyframes for height", () => {
      var actual = process('height', ['100px', '200px']);
      var expected = [{step: 0, properties: [{name: 'height', value: '100px'}]},
                      {step: 100, properties: [{name: 'height', value: '200px'}]}];
      expect(actual).to.deep.equal(expected);
    });
  });
});
