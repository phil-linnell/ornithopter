import {expect} from "chai";
import {process, tokeniser, steps, keyframe} from "ornithopter";

describe("ornithopter", () => {
  describe(".process()", () => {
    it("should fail because requires at least two tokens", () => {
      var actual = () => process('color', ['yellow']);
      expect(actual).to.throw(Error);
    });
    it("should fail because requires two parameters", () => {
      var actual = () => process(['yellow']);
      expect(actual).to.throw(Error);
    });
    it("should return two keyframes", () => {
      var actual = process('color', ['red', 'green']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'red'}]},
                      {step: 100, properties: [{name: 'color', value: 'green'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return two keyframes", () => {
      var actual = process('color', ['yellow', 'blue']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'yellow'}]},
                      {step: 100, properties: [{name: 'color', value: 'blue'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return three keyframes", () => {
      var actual = process('color', ['red', 'green', 'yellow']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'red'}]},
                      {step: 50, properties: [{name: 'color', value: 'green'}]},
                      {step: 100, properties: [{name: 'color', value: 'yellow'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return six keyframes", () => {
      var actual = process('color', ['red', 'green', 'yellow', 'blue', 'pink', 'orange']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'red'}]},
                      {step: 20, properties: [{name: 'color', value: 'green'}]},
                      {step: 40, properties: [{name: 'color', value: 'yellow'}]},
                      {step: 60, properties: [{name: 'color', value: 'blue'}]},
                      {step: 80, properties: [{name: 'color', value: 'pink'}]},
                      {step: 100, properties: [{name: 'color', value: 'orange'}]}];
      expect(actual).to.deep.equal(expected);
    });

    // it("should return keyframes that includes a delay", () => {
    //   var actual = process(['red', 'green', '1s', '1s']);
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

  describe(".steps()", () => {
    it("should return an array of 2", () => {
      var actual = steps('color', ['yellow', 'blue']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'yellow'}]},
                      {step: 100, properties: [{name: 'color', value: 'blue'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return an array of 3", () => {
      var actual = steps('color', ['red', 'green', 'yellow']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'red'}]},
                      {step: 50, properties: [{name: 'color', value: 'green'}]},
                      {step: 100, properties: [{name: 'color', value: 'yellow'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return an array of 4", () => {
      var actual = steps('color', ['red', 'green', 'yellow', 'blue']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'red'}]},
                      {step: 33.33, properties: [{name: 'color', value: 'green'}]},
                      {step: 66.67, properties: [{name: 'color', value: 'yellow'}]},
                      {step: 100, properties: [{name: 'color', value: 'blue'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return an array of 6", () => {
      var actual = steps('color', ['red', 'green', 'yellow', 'blue', 'pink', 'orange']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'red'}]},
                      {step: 20, properties: [{name: 'color', value: 'green'}]},
                      {step: 40, properties: [{name: 'color', value: 'yellow'}]},
                      {step: 60, properties: [{name: 'color', value: 'blue'}]},
                      {step: 80, properties: [{name: 'color', value: 'pink'}]},
                      {step: 100, properties: [{name: 'color', value: 'orange'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return an array of 7", () => {
      var actual = steps('color', ['red', 'green', 'yellow', 'blue', 'pink', 'purple', 'orange']);
      var expected = [{step: 0, properties: [{name: 'color', value: 'red'}]},
                      {step: 16.67, properties: [{name: 'color', value: 'green'}]},
                      {step: 33.33, properties: [{name: 'color', value: 'yellow'}]},
                      {step: 50, properties: [{name: 'color', value: 'blue'}]},
                      {step: 66.67, properties: [{name: 'color', value: 'pink'}]},
                      {step: 83.33, properties: [{name: 'color', value: 'purple'}]},
                      {step: 100, properties: [{name: 'color', value: 'orange'}]}];
      expect(actual).to.deep.equal(expected);
    });
  });

  describe(".keyframe()", () => {
    it("should return a keyframe", () => {
      expect(keyframe(0, 'color', 'red')).to.deep.equal({step: 0, properties: [{name: 'color', value: 'red'}]});
    });
  });
});
