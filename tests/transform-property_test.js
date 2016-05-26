import { expect } from 'chai';
import { process } from 'ornithopter';

describe('ornithopter', function () {
  describe('.process()', function () {
    it('should return two keyframes for transform with translateX', function () {
      const actual = process({ property: 'transform', value: ['100px', '200px'], fn: 'translateX', totalDuration: '1s' });
      const expected = [{
        step: 0,
        properties: [{ property: 'transform', value: 'translateX(100px)' }]
      }, {
        step: 100,
        properties: [{ property: 'transform', value: 'translateX(200px)' }]
      }];

      expect(actual).to.deep.equal(expected);
    });

    it('should return two keyframes for transform with rotate', function () {
      const actual = process({ property: 'transform', value: ['0deg', '360deg'], fn: 'rotate', totalDuration: '1s' });
      const expected = [{
        step: 0,
        properties: [{property: 'transform', value: 'rotate(0deg)'}]
      }, {
        step: 100,
        properties: [{property: 'transform', value: 'rotate(360deg)'}]
      }];

      expect(actual).to.deep.equal(expected);
    });

    it('should return three keyframes for transform with translateY', function () {
      const actual = process({ property: 'transform', value: ['0', '150px', '1'], fn: 'translateX', totalDuration: '1s' });
      const expected = [{
        step: 0,
        properties: [{property: 'transform', value: 'translateX(0)'}]
      }, {
        step: 50,
        properties: [{property: 'transform', value: 'translateX(75px)'}]
      }, {
        step: 100,
        properties: [{property: 'transform', value: 'translateX(150px)'}]
      }];

      expect(actual).to.deep.equal(expected);
    });
  });
});
