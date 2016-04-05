import {expect} from "chai";
import {process} from "ornithopter";

describe("ornithopter", function () {
  describe(".process()", function () {
    it("should return two keyframes for width", function () {
      const actual = process({property: 'width', value: ['100px', '200px'], totalDuration: '1s'});
      const expected = [{step: 0, properties: [{property: 'width', value: '100px'}]},
                      {step: 100, properties: [{property: 'width', value: '200px'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return two keyframes for height", function () {
      const actual = process({property: 'height', value: ['100px', '200px'], totalDuration: '1s'});
      const expected = [{step: 0, properties: [{property: 'height', value: '100px'}]},
                      {step: 100, properties: [{property: 'height', value: '200px'}]}];
      expect(actual).to.deep.equal(expected);
    });
  });
});
