import {expect} from "chai";
import {processColor, tokeniser} from "ornithopter";

describe("ornithopter", () => {
  describe(".processColor()", () => {
    it("should return keyframes", () => {
      var actual = processColor(['red', 'green']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'red'}]},
                      {step: 100, properties: [{name: 'color', value: 'green'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return keyframes", () => {
      var actual = processColor(['yellow', 'blue']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'yellow'}]},
                      {step: 100, properties: [{name: 'color', value: 'blue'}]}];
      expect(actual).to.deep.equal(expected);
    });
    // it("should return keyframes that includes a delay", () => {
    //   var actual = processColor(['red', 'green', '1s', '1s']);
    //   var expected = [{step: 50, properties: [{name: 'color', value: 'red'}]},
    //                   {step: 100, properties: [{name: 'color', value: 'green'}]}];
    //   expect(actual).to.deep.equal(expected);
    // });
  });
  describe(".tokeniser()", () => {
    it("should return an array", () => {
      expect(tokeniser("red green")).to.deep.equal(['red', 'green']);
    });
  });
});
