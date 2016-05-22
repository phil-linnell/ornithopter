import { expect } from 'chai';
import { processMultiple } from 'ornithopter';

describe('ornithopter', function () {
  describe('.processMultiple()', function () {
    it('should return two keyframes for width and transform', function () {
      const properties = [
        { property: 'color', value: ['red', 'green'] },
        { property: 'transform', value: ['0', '100px'], fn: 'translateX' }
      ];

      const expected = [{
        step: 0,
        properties: [
          { property: 'color', value: 'rgb(255, 0, 0)' },
          { property: 'transform', value: 'translateX(0)' }
        ]
      }, {
        step: 100,
        properties: [
          { property: 'color', value: 'rgb(0, 128, 0)' },
          { property: 'transform', value: 'translateX(100px)' }
        ]
      }];

      expect(processMultiple(properties, '1s')).to.deep.equal(expected);
    });
  });
});
