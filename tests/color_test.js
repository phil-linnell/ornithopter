import { expect } from 'chai';
import Color, { isColor, rangeLength } from 'utils/color';

describe('color', function () {
  describe('experiment', function () {
    it('sanity check', function () {
      expect(Color('red').rgb()).to.deep.equal({r: 255, g: 0, b: 0});
      expect(Color('deeppink').rgb()).to.deep.equal({r: 255, g: 20, b: 147});
    });
  });

  describe('Is color?', function () {
    it('isColor() true', function () {
      expect(isColor('red')).to.be.true;
      expect(isColor('deeppink')).to.be.true;
    });

    it('isColor() false', function () {
      expect(isColor('bronze')).to.be.false;
    });

    it('isColor() false', function () {
      expect(isColor('100px')).to.be.false;
      expect(isColor('0')).to.be.false;
    });
  });

  describe('Range length', function () {
    it('rangeLength()', function () {
      expect(rangeLength(255, 0)).to.equal(255);
    });

    it('rangeLength()', function () {
      expect(rangeLength(50, 255)).to.equal(-205);
    });
  });
});
