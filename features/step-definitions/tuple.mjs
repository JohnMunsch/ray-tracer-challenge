import { approximatelyEqual } from './math.mjs';

export class Tuple {
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  isPoint() {
    return this.w === 1.0;
  }

  static negate(a) {
    return new Tuple(-a.x, -a.y, -a.z, -a.w);
  }

  static add(a, b) {
    return new Tuple(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
  }

  static subtractPoints(a, b) {
    return new Vector(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  static subtractVectors(a, b) {
    return new Vector(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  static subtractVectorFromPoint(a, b) {
    return new Point(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  static multiply(a, b) {
    return new Tuple(a.x * b, a.y * b, a.z * b, a.w * b);
  }

  static divide(a, b) {
    return new Tuple(a.x / b, a.y / b, a.z / b, a.w / b);
  }

  static equal(a, b) {
    return (
      approximatelyEqual(a.x, b.x) &&
      approximatelyEqual(a.y, b.y) &&
      approximatelyEqual(a.z, b.z) &&
      approximatelyEqual(a.w, b.w)
    );
  }
}

export class Point extends Tuple {
  constructor(x, y, z) {
    super(x, y, z, 1.0);
  }
}

export class Vector extends Tuple {
  constructor(x, y, z) {
    super(x, y, z, 0.0);
  }

  static cross(a, b) {
    return new Vector(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
  }

  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  }

  static magnitude(a) {
    return Math.sqrt(a.x ** 2 + a.y ** 2 + a.z ** 2 + a.w ** 2);
  }

  static normalize(a) {
    const magnitude = Vector.magnitude(a);
    return new Vector(
      a.x / magnitude,
      a.y / magnitude,
      a.z / magnitude,
      a.w / magnitude
    );
  }
}
