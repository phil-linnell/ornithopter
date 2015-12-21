export function point(x = 0, y = 0) {
  return {x, y};
}

// p = P1 B1(d) + P2 B2(d) + P3 B3(d) + P4 B4(d)
// where:
//   Pi are the control points
//   Bi are the Beziér functions
//   d is a percentage of the distance along the curve (between 0 and 1)
//   p is the point in 2D space
export function cubic(d, p1, p2, p3, p4) {
  return point(product(d, p1.x, p2.x, p3.x, p4.x),
               product(d, p1.y, p2.y, p3.y, p4.y));
}

function product(d, x1, x2, x3, x4) {
  return x1 * b1(d) + x2 * b2(d) + x3 * b3(d) + x4 * b4(d)
}

// 1 = t^3 + 3 * t^2 * (1 - t) + 3 * t * (1 - t)^2 + (1 - t)^3
//
// B1(t) = t^3
function b1(t) {
  return Math.pow(t, 3);
}

// B2(t) = 3 * t^2 * (1 - t)
function b2(t) {
  return 3 * Math.pow(t, 2) * (1 - t);
}

// B3(t) = 3 * t * (1 - t)^2
function b3(t) {
  return 3 * t * Math.pow(1 - t, 2);
}

// B4(t) = (1 - t)^3
function b4(t) {
  return Math.pow(1 - t, 3);
}
