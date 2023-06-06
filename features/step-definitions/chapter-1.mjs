import { Point, Tuple, Vector } from './tuple.mjs';

class Projectile {
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;
  }
}

class Environment {
  constructor(gravity, wind) {
    this.gravity = gravity;
    this.wind = wind;
  }
}

function tick(env, proj) {
  const position = Tuple.add(proj.position, proj.velocity);
  const velocity = Tuple.add(proj.velocity, Tuple.add(env.gravity, env.wind));

  return new Projectile(position, velocity);
}

let projectile = new Projectile(new Point(0, 1, 0), new Vector(1, 5, 0));
let environment = new Environment(
  new Vector(0, -0.1, 0),
  Vector.normalize(new Vector(-0.01, 0, 0))
);

let tickCount = 0;
while (projectile.position.y > 0) {
  projectile = tick(environment, projectile);
  tickCount++;
  console.log(tickCount, projectile.position);
}
