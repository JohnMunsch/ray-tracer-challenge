import { Color } from './tuple.mjs';

export class Canvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.pixels = new Array(width * height);
    this.pixels.fill(new Color(0, 0, 0));
  }

  pixelAt(x, y) {
    return this.pixels[y * this.width + x];
  }

  writePixel(x, y, color) {
    this.pixels[y * this.width + x] = color;
  }

  convertFloatToPpmColor(float) {
    if (float < 0) {
      float = 0;
    } else if (float > 1) {
      float = 1;
    }

    return Math.round(float * 255);
  }

  toPpm() {
    const lines = [];

    lines[0] = 'P3';
    lines[1] = `${this.width} ${this.height}`;
    lines[2] = '255';

    for (let y = 0; y < this.height; y++) {
      const line = [];

      for (let x = 0; x < this.width; x++) {
        const pixel = this.pixelAt(x, y);

        const red = this.convertFloatToPpmColor(pixel.red);
        const green = this.convertFloatToPpmColor(pixel.green);
        const blue = this.convertFloatToPpmColor(pixel.blue);

        line.push(`${red} ${green} ${blue}`);
      }

      // If necessary, split the line into multiple lines so that each line is 70 characters long.

      lines.push(line.join(' '));
    }

    return lines.join('\n');
  }
}
