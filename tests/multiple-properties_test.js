import {expect} from "chai";
import {processMultiple} from "ornithopter";

describe("ornithopter", function () {
  describe(".processMultiple()", function () {
    it("should return two keyframes for width and transform", function () {
      var actual = processMultiple([{property: 'color', value: ['red', 'green']},
                                    {property: 'transform', value: ['0', '100px'], fn: 'translateX'}], '1s');
      var expected = [{step: 0, properties: [{property: 'color', value: 'red'},
                                             {property: 'transform', value: 'translateX(0)'}]},
                      {step: 100, properties: [{property: 'color', value: 'green'},
                                               {property: 'transform', value: 'translateX(100px)'}]}];
      expect(actual).to.deep.equal(expected);
    });
  });
});
