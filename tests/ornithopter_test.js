import {expect} from "chai";
import {processColor, tokeniser, getKeyframes} from "ornithopter";

describe("ornithopter", () => {
  describe(".processColor()", () => {
    it("should fail because requires at least two tokens", () => {
      var actual = () => processColor(['yellow']);
      expect(actual).to.throw(Error);
    });
    it("should return two keyframes", () => {
      var actual = processColor(['red', 'green']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'red'}]},
                      {step: 100, properties: [{name: 'color', value: 'green'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return two keyframes", () => {
      var actual = processColor(['yellow', 'blue']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'yellow'}]},
                      {step: 100, properties: [{name: 'color', value: 'blue'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return three keyframes", () => {
      var actual = processColor(['red', 'green', 'yellow']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'red'}]},
                      {step: 50, properties: [{name: 'color', value: 'green'}]},
                      {step: 100, properties: [{name: 'color', value: 'yellow'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return six keyframes", () => {
      var actual = processColor(['red', 'green', 'yellow', 'blue', 'pink', 'orange']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'red'}]},
                      {step: 20, properties: [{name: 'color', value: 'green'}]},
                      {step: 40, properties: [{name: 'color', value: 'yellow'}]},
                      {step: 60, properties: [{name: 'color', value: 'blue'}]},
                      {step: 80, properties: [{name: 'color', value: 'pink'}]},
                      {step: 100, properties: [{name: 'color', value: 'orange'}]}];
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

  describe(".getKeyframes()", () => {
    it("should return an array of 2", () => {
      expect(getKeyframes(2)).to.deep.equal([0,100]);
    });
    it("should return an array of 3", () => {
      expect(getKeyframes(3)).to.deep.equal([0,50,100]);
    });
    it("should return an array of 4", () => {
      expect(getKeyframes(4)).to.deep.equal([0,33.33,66.67,100]);
    });
    it("should return an array of 6", () => {
      expect(getKeyframes(6)).to.deep.equal([0,20,40,60,80,100]);
    });
    it("should return an array of 7", () => {
      expect(getKeyframes(7)).to.deep.equal([0,16.67,33.33,50,66.67,83.33,100]);
    });
  });
});
