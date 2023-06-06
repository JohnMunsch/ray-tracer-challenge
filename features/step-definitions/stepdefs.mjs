import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';

import { approximatelyEqual } from './math.mjs';
import { Color, Point, Tuple, Vector } from './tuple.mjs';

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

When('{word} ← normalize\\({word})', function (v1, v2) {
  this[v1] = Vector.normalize(this[v2]);
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
  '{word} * {word} = color\\({float}, {float}, {float})',
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
