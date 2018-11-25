export class Vector {
  h: number
  v: number

  constructor(horizontal: number, vertical: number) {
    this.h = horizontal
    this.v = vertical
  }

  get horizontal() {
    return this.h
  }

  get vertical() {
    return this.v
  }

  get array() {
    return [this.h, this.v]
  }

  dist([x2, y2]: number[]) {
    const [x1, y1] = this.array
    const xl = x1 - x2
    const yl = y1 - y2
    return Math.sqrt(xl**2 + yl**2)
  }

  static dist([x1, y1]: number[], [x2, y2]: number[]) {
    const xl = x1 + x2
    const yl = y1 + y2
    return Math.sqrt(xl**2 + yl**2)
  }

  add(array: number[]) {
    this.h += array[0]
    this.v += array[1]
    
    return this
  }

  scale(n: number) {
    this.h *= n
    this.v *= n

    return this
  }

  mult([h, v]: number[]) {
    this.h *= h
    this.v *= v

    return this
  }

  static negV(v: Vector) {
    return new Vector(-v.horizontal, -v.vertical)
  }

  static negA(v: number[]) {
    return v.map(x => x*-1)
  }

  static AddA(...xs) {
    const a = xs.reduce((s, x) => [s[0]+x[0], s[1]+x[1]], [0, 0])
    return new Vector(a[0], a[1])
  }
}