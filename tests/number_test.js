import {expect} from 'chai';
import {Number, toNumber, fromNumber} from 'utils/number';

describe('utils/number', function () {
  describe('Number constructor', function () {
    it('should create a number object', function () {
      expect(Number(10, 'px')).to.deep.equal({value: 10, unit: 'px'});
    });
  });

  describe('toNumber', function () {
    it('should return a pixel object', function () {
      expect(toNumber('10px')).to.deep.equal({value: 10, unit: 'px'});
    });

    it('should return a decimal percentage object', function () {
      expect(toNumber('52.2%')).to.deep.equal({value: 52.2, unit: '%'});
    });

    it('should return a zeroless decimal number object', function () {
      expect(toNumber('.5s')).to.deep.equal({value: 0.5, unit: 's'});
    });

    it('should return a unitless zero object', function () {
      expect(toNumber('0')).to.deep.equal({value: 0, unit: ''});
    });

    it('should return a unitless zero object', function () {
      expect(toNumber('75.5')).to.deep.equal({value: 75.5, unit: ''});
    });
  });

  describe('fromNumber', function () {
    it('should serialise as a string', function () {
      expect(fromNumber(Number(10, 'px'))).to.equal('10px');
      expect(fromNumber(Number(52.2 ,'%'))).to.equal('52.2%');
      expect(fromNumber(Number(0.5, 's'))).to.equal('0.5s');
      expect(fromNumber(Number(0, ''))).to.equal('0');
      expect(fromNumber(Number(75.5, ''))).to.equal('75.5');
    });
  });
});
