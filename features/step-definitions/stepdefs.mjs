import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';

import { Canvas } from './canvas.mjs';
import { approximatelyEqual } from './math.mjs';
import { Color, Point, Tuple, Vector } from './tuple.mjs';

// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
const range = (start, end, increment) => {
  // if the end is not defined...
  const isEndDef = typeof end !== 'undefined';
  // ...the first argument should be the end of the range...
  end = isEndDef ? end : start;
  // ...and 0 should be the start
  start = isEndDef ? start : 0;

  // if the increment is not defined, we could need a +1 or -1
  // depending on whether we are going up or down
  if (typeof increment === 'undefined') {
    increment = Math.sign(end - start);
  }

  // calculating the lenght of the array, which has always to be positive
  const length = Math.abs((end - start) / (increment || 1));

  // In order to return the right result, we need to create a new array
  // with the calculated length and fill it with the items starting from
  // the start value + the value of increment.
  const { result } = Array.from({ length }).reduce(
    ({ result, current }) => ({
      // append the current value to the result array
      result: [...result, current],
      // adding the increment to the current item
      // to be used in the next iteration
      current: current + increment,
    }),
    { current: start, result: [] }
  );

  return result;
};

Given(
  '{word} ← tuple\\({float}, {float}, {float}, {float})',
  function (v1, float, float2, float3, float4) {
    this[v1] = new Tuple(float, float2, float3, float4);
  }
);

Given(
  '{word} ← point\\({float}, {float}, {float})',
  function (v1, float, float2, float3) {
    this[v1] = new Point(float, float2, float3);
  }
);

Given(
  '{word} ← vector\\({float}, {float}, {float})',
  function (v1, float, float2, float3) {
    this[v1] = new Vector(float, float2, float3);
  }
);

Given('{word} is {float}', function (v1, float) {
  this[v1] = float;
});

Given(
  '{word} ← color\\({float}, {float}, {float})',
  function (v1, float, float2, float3) {
    this[v1] = new Color(float, float2, float3);
  }
);

Given('{word} ← canvas\\({int}, {int})', function (key, int, int2) {
  this[key] = new Canvas(int, int2);
});

When('{word} ← normalize\\({word})', function (v1, v2) {
  this[v1] = Vector.normalize(this[v2]);
});

When(
  'write_pixel\\({word}, {int}, {int}, {word})',
  function (key, int, int2, v1) {
    // Write code here that turns the phrase above into concrete actions
    this[key].writePixel(int, int2, this[v1]);
  }
);

When(
  'every pixel of {word} is set to color\\({float}, {float}, {float})',
  function (key, float, float2, float3) {
    this[key].pixels.forEach((pixel) => {
      pixel.red = float;
      pixel.green = float2;
      pixel.blue = float3;
    });
  }
);

When('{word} ← canvas_to_ppm\\({word})', function (key, v1) {
  this[key] = this[v1].toPpm();
});

Then('{word}.{word} = {float}', function (v1, key, float) {
  assert(this[v1][key] === float);
});

Then(
  '{word} = tuple\\({float}, {float}, {float}, {float})',
  function (v1, float, float2, float3, float4) {
    assert(this[v1].x === float);
    assert(this[v1].y === float2);
    assert(this[v1].z === float3);
    assert(this[v1].w === float4);
  }
);

Then('{word} is a point', function (v1) {
  assert(this[v1].isPoint());
});

Then('{word} is not a point', function (v1) {
  assert(this[v1].isPoint() === false);
});

Then('{word} is a vector', function (v1) {
  assert(this[v1].isPoint() === false);
});

Then('{word} is not a vector', function (v1) {
  assert(this[v1].isPoint());
});

Then('a and b are equal', function () {
  assert(approximatelyEqual(this.a, this.b));
});

Then('a and b are not equal', function () {
  assert(approximatelyEqual(this.a, this.b) === false);
});

Then(
  '{word} + {word} = color\\({float}, {float}, {float})',
  function (v1, v2, float, float2, float3) {
    const result = Color.add(this[v1], this[v2]);
    assert(Tuple.equal(result, new Color(float, float2, float3)));
  }
);

Then(
  '{word} + {word} = tuple\\({float}, {float}, {float}, {float})',
  function (v1, v2, float, float2, float3, float4) {
    const result = Tuple.add(this[v1], this[v2]);
    assert(Tuple.equal(result, new Tuple(float, float2, float3, float4)));
  }
);

Then(
  '{word} - {word} = color\\({float}, {float}, {float})',
  function (v1, v2, float, float2, float3) {
    const result = Tuple.subtractVectors(this[v1], this[v2]);
    assert(Tuple.equal(result, new Color(float, float2, float3)));
  }
);
Then(
  '{word} - {word} = vector\\({float}, {float}, {float})',
  function (v1, v2, float, float2, float3) {
    const result = Tuple.subtractPoints(this[v1], this[v2]);
    assert(Tuple.equal(result, new Vector(float, float2, float3)));
  }
);

Then(
  '{word} - {word} = point\\({float}, {float}, {float})',
  function (v1, v2, float, float2, float3) {
    const result = Tuple.subtractVectorFromPoint(this[v1], this[v2]);
    assert(Tuple.equal(result, new Point(float, float2, float3)));
  }
);

Then(
  'negative\\({word})         = tuple\\({float}, {float}, {float}, {float})',
  function (v1, float, float2, float3, float4) {
    const result = Tuple.negate(this[v1]);
    assert(Tuple.equal(result, new Tuple(float, float2, float3, float4)));
  }
);

Then(
  '{word} * {int} = color\\({float}, {float}, {float})',
  function (v1, int, float, float2, float3) {
    const result = Vector.multiply(this[v1], int);
    assert(Tuple.equal(result, new Color(float, float2, float3)));
  }
);

Then(
  '{word} * {float} = tuple\\({float}, {float}, {float}, {float})',
  function (v1, float, float2, float3, float4, float5) {
    const result = Tuple.multiply(this[v1], float);
    assert(Tuple.equal(result, new Tuple(float2, float3, float4, float5)));
  }
);

Then(
  '{word} \\/ {float} = tuple\\({float}, {float}, {float}, {float})',
  function (v1, float, float2, float3, float4, float5) {
    const result = Tuple.divide(this[v1], float);
    assert(Tuple.equal(result, new Tuple(float2, float3, float4, float5)));
  }
);

Then('magnitude\\({word}) = {float}', function (v1, float) {
  const result = Vector.magnitude(this[v1]);
  assert(approximatelyEqual(result, float));
});

Then(
  'normalize\\({word}) = vector\\({float}, {float}, {float})',
  function (v1, float, float2, float3) {
    const result = Vector.normalize(this[v1]);
    assert(Tuple.equal(result, new Vector(float, float2, float3)));
  }
);

Then('dot\\({word}, {word}) = {float}', function (v1, v2, float) {
  const result = Vector.dot(this[v1], this[v2]);
  assert(approximatelyEqual(result, float));
});

Then(
  'mult\\({word}, {word}) = color\\({float}, {float}, {float})',
  function (v1, v2, float, float2, float3) {
    const result = Color.hadamardProduct(this[v1], this[v2]);
    assert(Tuple.equal(result, new Color(float, float2, float3)));
  }
);

Then(
  'cross\\({word}, {word}) = vector\\({float}, {float}, {float})',
  function (v1, v2, float, float2, float3) {
    const result = Vector.cross(this[v1], this[v2]);
    assert(Tuple.equal(result, new Vector(float, float2, float3)));
  }
);

Then(
  'every pixel of {word} is color\\({float}, {float}, {float})',
  function (key, float, float2, float3) {
    this[key].pixels.forEach((pixel) => {
      assert(pixel.red === float);
      assert(pixel.green === float2);
      assert(pixel.blue === float3);
    });
  }
);

Then(
  'pixel_at\\({word}, {int}, {int}) = {word}',
  function (key, int, int2, v1) {
    this[key].pixels[int * int2] === this[v1];
  }
);

Then('lines {int}-{int} of {word} are', function (int, int2, key, docString) {
  const lines = this[key].split('\n');
  const expectedLines = docString.split('\n');

  range(int, int2).forEach((i) => {
    assert(lines[i - 1] === expectedLines[i - int]);
  });
});

Then('{word} ends with a newline character', function (key) {
  this[key].endsWith('\n');
});
