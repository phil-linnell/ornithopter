import chai, { expect } from 'chai';

import { parseTransformValue } from 'utils/value';

describe('utils/value', function () {
  it('should parse a simple integer', function () {
    expect(parseTransformValue('scale(1,2)')).to.deep.equal(['scale','1','2']);
    expect(parseTransformValue('scale( 1, 2 )')).to.deep.equal(['scale','1','2']);
  });
  it('should parse a integer with pixels', function () {
    expect(parseTransformValue('translateX(1px,2px)')).to.deep.equal(['translateX','1px','2px']);
  });
  it('should parse a integer with degrees', function () {
    expect(parseTransformValue('rotateX(1deg,2deg)')).to.deep.equal(['rotateX','1deg','2deg']);
  });
});
