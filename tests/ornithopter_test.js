import { expect } from 'chai';
import { process } from 'ornithopter';

describe('ornithopter', function () {
  describe(".process()", function () {
    it('should fail because requires at least two tokens', function () {
      const actual = () => process({
        property: 'color',
        value: ['yellow'],
        totalDuration: '1s'
      });

      expect(actual).to.throw(Error);
    });

    it('should fail because requires two parameters', function () {
      const actual = () => process({value: ['yellow'], totalDuration: '1s'});

      expect(actual).to.throw(Error);
    });

    it('should return an array of 2 keyframes', function () {
      const actual = process({
        property: 'color',
        value: ['yellow', 'blue'],
        totalDuration: '1s',
      });
      const expected = [
        { step: 0, properties: [{ property: 'color', value: 'rgb(255, 255, 0)' }] },
        { step: 100, properties: [{ property: 'color', value: 'rgb(0, 0, 255)' }] }
      ];

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('.process() with delay', function () {
    it('should return steps with delay and duration applied', function () {
      const actual = process({
        property: 'color',
        value: ['red', 'green', '.5s', '.5s'],
        totalDuration: '1s',
      });
      const expected = [
        { step: 50, properties: [{ property: 'color', value: 'rgb(255, 0, 0)' }] },
        { step: 100, properties: [{ property: 'color', value: 'rgb(0, 128, 0)' }] }
      ];

      expect(actual).to.deep.equal(expected);
    });
  });
});
