import {expect} from "chai";
import {process} from "ornithopter";

describe("ornithopter", () => {
  describe(".process()", () => {
    it("should fail because requires at least two tokens", () => {
      var actual = () => process({property: 'color', value: ['yellow'], totalDuration: '1s'});
      expect(actual).to.throw(Error);
    });
    it("should fail because requires two parameters", () => {
      var actual = () => process({value: ['yellow'], totalDuration: '1s'});
      expect(actual).to.throw(Error);
    });
    it("should return an array of 2 keyframes", () => {
      var actual = process({property: 'color', value: ['yellow', 'blue'], totalDuration: '1s'});
      var expected = [{step: 0, properties: [{property: 'color', value: 'yellow'}]},
      {step: 100, properties: [{property: 'color', value: 'blue'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return an array of 3 keyframes", () => {
      var actual = process({property: 'color', value: ['red', 'green', 'yellow'], totalDuration: '1s'});
      var expected = [{step: 0, properties: [{property: 'color', value: 'red'}]},
      {step: 50, properties: [{property: 'color', value: 'green'}]},
      {step: 100, properties: [{property: 'color', value: 'yellow'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return an array of 4 keyframes", () => {
      var actual = process({property: 'color', value: ['red', 'green', 'yellow', 'blue'], totalDuration: '1s'});
      var expected = [{step: 0, properties: [{property: 'color', value: 'red'}]},
      {step: 33.33, properties: [{property: 'color', value: 'green'}]},
      {step: 66.67, properties: [{property: 'color', value: 'yellow'}]},
      {step: 100, properties: [{property: 'color', value: 'blue'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return an array of 6 keyframes", () => {
      var actual = process({property: 'color', value: ['red', 'green', 'yellow', 'blue', 'pink', 'orange'], totalDuration: '1s'});
      var expected = [{step: 0, properties: [{property: 'color', value: 'red'}]},
      {step: 20, properties: [{property: 'color', value: 'green'}]},
      {step: 40, properties: [{property: 'color', value: 'yellow'}]},
      {step: 60, properties: [{property: 'color', value: 'blue'}]},
      {step: 80, properties: [{property: 'color', value: 'pink'}]},
      {step: 100, properties: [{property: 'color', value: 'orange'}]}];
      expect(actual).to.deep.equal(expected);
    });
    it("should return an array of 7 keyframes", () => {
      var actual = process({property: 'color', value: ['red', 'green', 'yellow', 'blue', 'pink', 'purple', 'orange'], totalDuration: '1s'});
      var expected = [{step: 0, properties: [{property: 'color', value: 'red'}]},
      {step: 16.67, properties: [{property: 'color', value: 'green'}]},
      {step: 33.33, properties: [{property: 'color', value: 'yellow'}]},
      {step: 50, properties: [{property: 'color', value: 'blue'}]},
      {step: 66.67, properties: [{property: 'color', value: 'pink'}]},
      {step: 83.33, properties: [{property: 'color', value: 'purple'}]},
      {step: 100, properties: [{property: 'color', value: 'orange'}]}];
      expect(actual).to.deep.equal(expected);
    });
  });

  describe(".process()", () => {
    it("should return steps with delay and duration applied", () => {
      var actual = () => process({property: 'color', value: ['red', 'green', '.5s', '.5s'], totalDuration: '1s'});
      var expected = [{step: 50, properties: [{property: 'color', value: 'red'}]},
      {step: 100, properties: [{property: 'color', value: 'green'}]}];
      expect(actual).to.throw(Error);
    });
  });
});
