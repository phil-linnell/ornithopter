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

  describe('.process() with delay and smoothness', function () {
    it('should return steps with delay and duration applied', function () {
      const actual = process({
        property: 'top',
        value: ['0', '100px', '4', '1s', '.5s'],
        totalDuration: '2s',
      });
      const expected = [
        { step: 25, properties: [{ property: 'top', value: '0' }] },
        { step: 35, properties: [{ property: 'top', value: '20px' }] },
        { step: 45, properties: [{ property: 'top', value: '40px' }] },
        { step: 55, properties: [{ property: 'top', value: '60px' }] },
        { step: 65, properties: [{ property: 'top', value: '80px' }] },
        { step: 75, properties: [{ property: 'top', value: '100px' }] },
      ];

      expect(actual).to.deep.equal(expected);
    });
  });
});

//top: 0 100px 5 1s .5s;
