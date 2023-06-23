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

  splitLines(line, maxLength) {
    if (line.length <= maxLength) {
      return [line];
    }

    const splitIndex = line.lastIndexOf(' ', maxLength);

    const firstLine = line.slice(0, splitIndex);
    const secondLine = line.slice(splitIndex + 1);

    const furtherLines = this.splitLines(secondLine, maxLength);

    return [firstLine, ...furtherLines];
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

      // Recursively split lines that are too long.
      const splitLines = this.splitLines(line.join(' '), 70);

      lines.push(...splitLines);
    }

    return lines.join('\n');
  }
}
