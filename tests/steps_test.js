import { expect } from 'chai';
import { changePoint,
         percentage,
         interpolateValue,
         valueByLinear,
         valueByLinearNumber,
         valueByLinearColor } from 'steps';
import Color from 'utils/color';
import { Number } from 'utils/number';

describe('steps', function () {
  describe('.changePoint()', function () {
    it('should always return 0', function () {
      expect(Math.round(changePoint(0, null, 4, valueByLinear) * 1000) / 1000).to.equal(0);
    });

    it('should always return 1', function () {
      expect(Math.round(changePoint(4, 0.8, 4, valueByLinear) * 1000) / 1000).to.equal(1);
    });

    it('should return a change point between 0 and 1', function () {
      expect(Math.round(changePoint(1, 0, 4, valueByLinear) * 1000) / 1000).to.equal(0.20);
    });

    it('should return a change point between 0 and 1', function () {
      expect(Math.round(changePoint(1, 0, 7, valueByLinear) * 1000) / 1000).to.equal(0.125);
      expect(Math.round(changePoint(2, 0.125, 7, valueByLinear) * 1000) / 1000).to.equal(0.25);
      expect(Math.round(changePoint(3, 0.25, 7, valueByLinear) * 1000) / 1000).to.equal(0.375);
    });
  });

  describe('.percentage()', function () {
    it('should return the second keyframe with no delay', function () {
      expect(percentage(0.25, 500, 0)).to.equal(25);
    });

    it('should return the second keyframe with a .5s delay', function () {
      expect(percentage(0.25, 500, 500, 1000)).to.equal(62.5);
    });

    it('should return the second keyframe with a .2s delay', function () {
      expect(percentage(0.5, 800, 200, 1000)).to.equal(60);
    });

    it('should return the middle keyframe with a .2s delay and shorter than total duration animation', function () {
      expect(percentage(0.5, 200, 200, 1000)).to.equal(30);
    });

    it('should return the first keyframe with a .1s delay and shorter than total duration animation', function () {
      expect(percentage(0, 160, 100, 640)).to.equal(15.63);
    });

    it('should return the middle keyframe with a .1s delay and shorter than total duration animation', function () {
      expect(percentage(0.5, 160, 100, 640)).to.equal(28.13);
    });

    it('should return the penultimate keyframe with a .1s delay and shorter than total duration animation', function () {
      expect(percentage(0.75, 480, 70, 825)).to.equal(52.12);
    });

    it('should return the penultimate keyframe with a .1s delay and shorter than total duration animation', function () {
      expect(percentage((1/3), 1000, 0, 1000)).to.equal(33.33);
    });
  });

  describe('.interpolateValue()', function () {
    it('should return the first value', function () {
      expect(interpolateValue(0, null, [Number(0, ''), Number(100, '')], 4, valueByLinearNumber)).to.deep.equal(Number(0, ''));
    });

    it('should return the last value', function () {
      expect(interpolateValue(4, null, [Number(0, ''), Number(100, '')], 4, valueByLinearNumber)).to.deep.equal(Number(100, ''));
    });

    it('should return the second value', function () {
      expect(interpolateValue(1, Number(0, ''), [Number(0, ''), Number(100, '')], 4, valueByLinearNumber)).to.deep.equal(Number(20, ''));
    });

    it("should return the first value", function () {
      expect(interpolateValue(0, null, [Color("red"), Color("green")], 4, valueByLinearColor)).to.deep.equal(Color('red'));
    });

    it("should return the last value", function () {
      expect(interpolateValue(4, null, [Color("red"), Color("green")], 4, valueByLinearColor)).to.deep.equal(Color('green'));
    });

    it("should return the second value", function () {
      expect(interpolateValue(1, Color("red"), [Color("red"), Color("green")], 4, valueByLinearColor)).to.deep.equal(Color({r: 204, g: 26, b: 0}));
    });
  });

  describe('.valueByLinearNumber()', function () {
    it('should return the nth value in a linear timing function', function () {
      expect(valueByLinearNumber(4, Number(0, ''), Number(100, ''))).to.deep.equal(Number(20, ''));
    });

    it('should return the nth value in a linear timing function', function () {
      expect(valueByLinearNumber(4, Number(40, '%'), Number(100, '%'))).to.deep.equal(Number(60, '%'));
    });

    it('should return the nth value in a linear timing function', function () {
      expect(valueByLinearNumber(4, Number(14.6, ''), Number(73, ''))).to.deep.equal(Number(29.2, ''));
    });

    it('should return the nth color value in a linear timing function', function () {
      expect(valueByLinearColor(4, Color('red'), Color('pink'))).to.deep.equal(Color().rgb(255, 38, 41));
    });
  });
});
