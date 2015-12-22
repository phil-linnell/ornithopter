// See http://devmag.org.za/2011/04/05/bzier-curves-a-tutorial/

export function point(x = 0, y = 0) {
  return {x, y};
}

export function linear(t, {x: x1, y: y1}, {x: x2, y: y2}) {
  return point(x1 * (1 - t) + x2 * t ,
               y1 * (1 - t) + y2 * t );
};

export function quadratic(t, p1, p2, p3) {
  return point(quadraticCoord(t, p1.x, p2.x, p3.x),
               quadraticCoord(t, p1.y, p2.y, p3.y));
};

// 1 = t2 + 2t(1 - t) + (1 - t)2
function quadraticCoord(t, x1, x2, x3) {
  function b1(t) {
    return Math.pow((1 - t), 2);
  };

  function b2(t) {
    return 2 * t * (1 - t);
  };

  function b3(t) {
    return Math.pow(t, 2);
  };

  return x1 * b1(t) + x2 * b2(t) + x3 * b3(t);
};

export function cubic(d, p1, p2, p3, p4) {
  return point(cubicCoord(d, p1.x, p2.x, p3.x, p4.x),
               cubicCoord(d, p1.y, p2.y, p3.y, p4.y));
};


// p = P1 B1(d) + P2 B2(d) + P3 B3(d) + P4 B4(d)
// where:
//   Pi are the control points
//   Bi are the Beziér functions
//   d is a percentage of the distance along the curve (between 0 and 1)
//   p is the point in 2D space
function cubicCoord(d, x1, x2, x3, x4) {
  function b1(t) {
    return Math.pow(1 - t, 3);
  };

  function b2(t) {
    return 3 * t * Math.pow(1 - t, 2);
  };

  function b3(t) {
    return 3 * Math.pow(t, 2) * (1 - t);
  };

  function b4(t) {
    return Math.pow(t, 3);
  };

  return x1 * b1(d) + x2 * b2(d) + x3 * b3(d) + x4 * b4(d)
};
