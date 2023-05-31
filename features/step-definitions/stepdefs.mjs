import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';

import { approximatelyEqual } from './math.mjs';
import { Point, Tuple, Vector } from './tuple.mjs';

Given(
  '{word} ← tuple\\({float}, {float}, {float}, {float})',
  function (variable, float, float2, float3, float4) {
    this[variable] = new Tuple(float, float2, float3, float4);
  }
);

Given(
  '{word} ← point\\({float}, {float}, {float})',
  function (variable, float, float2, float3) {
    this[variable] = new Point(float, float2, float3);
  }
);

Given(
  '{word} ← vector\\({float}, {float}, {float})',
  function (variable, float, float2, float3) {
    this[variable] = new Vector(float, float2, float3);
  }
);

Given('{word} is {float}', function (word, float) {
  this[word] = float;
});

When('{word} ← normalize\\({word})', function (v1, v2) {
  this[v1] = Vector.normalize(this[v2]);
});

Then('{word}.{word} = {float}', function (variable, key, float) {
  assert(this[variable][key] === float);
});

Then(
  '{word} = tuple\\({float}, {float}, {float}, {float})',
  function (variable, float, float2, float3, float4) {
    assert(this[variable].x === float);
    assert(this[variable].y === float2);
    assert(this[variable].z === float3);
    assert(this[variable].w === float4);
  }
);

Then('{word} is a point', function (variable) {
  assert(this[variable].isPoint());
});

Then('{word} is not a point', function (variable) {
  assert(this[variable].isPoint() === false);
});

Then('{word} is a vector', function (variable) {
  assert(this[variable].isPoint() === false);
});

Then('{word} is not a vector', function (variable) {
  assert(this[variable].isPoint());
});

Then('a and b are equal', function () {
  assert(approximatelyEqual(this.a, this.b));
});

Then('a and b are not equal', function () {
  assert(approximatelyEqual(this.a, this.b) === false);
});

Then(
  '{word} + {word} = tuple\\({float}, {float}, {float}, {float})',
  function (v1, v2, float, float2, float3, float4) {
    const result = Tuple.add(this[v1], this[v2]);
    assert(Tuple.equal(result, new Tuple(float, float2, float3, float4)));
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
  function (variable, float, float2, float3, float4) {
    const result = Tuple.negate(this[variable]);
    assert(Tuple.equal(result, new Tuple(float, float2, float3, float4)));
  }
);

Then(
  '{word} * {float} = tuple\\({float}, {float}, {float}, {float})',
  function (variable, float, float2, float3, float4, float5) {
    const result = Tuple.multiply(this[variable], float);
    assert(Tuple.equal(result, new Tuple(float2, float3, float4, float5)));
  }
);

Then(
  '{word} \\/ {float} = tuple\\({float}, {float}, {float}, {float})',
  function (variable, float, float2, float3, float4, float5) {
    const result = Tuple.divide(this.a, float);
    assert(Tuple.equal(result, new Tuple(float2, float3, float4, float5)));
  }
);

Then('magnitude\\({word}) = {float}', function (variable, float) {
  const result = Vector.magnitude(this[variable]);
  assert(approximatelyEqual(result, float));
});

Then(
  'normalize\\({word}) = vector\\({float}, {float}, {float})',
  function (variable, float, float2, float3) {
    const result = Vector.normalize(this[variable]);
    assert(Tuple.equal(result, new Vector(float, float2, float3)));
  }
);

Then('dot\\({word}, {word}) = {float}', function (v1, v2, float) {
  const result = Vector.dot(this[v1], this[v2]);
  assert(approximatelyEqual(result, float));
});

Then(
  'cross\\({word}, {word}) = vector\\({float}, {float}, {float})',
  function (v1, v2, float, float2, float3) {
    const result = Vector.cross(this[v1], this[v2]);
    assert(Tuple.equal(result, new Vector(float, float2, float3)));
  }
);
