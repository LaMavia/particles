import { Vector } from "./vector";

export class Particle { 
  pos: Vector
  m: number
  r: number
  v: Vector
  a: Vector
  ctx: CanvasRenderingContext2D
  id: string
  added: boolean
  constructor(position: Vector, mass: number, a0: Vector, v0: Vector, ctx: CanvasRenderingContext2D, added: boolean = false, r: number = mass) {
    this.pos = position
    this.m = mass
    this.r = r
    this.a = a0
    this.v = v0

    this.ctx = ctx
    this.id = (Math.random() * 10**12).toString(16)
    this.added = added
  }

  applyForce(f: number[], dt: number) {
    dt = dt/1000
    const a = f.map(x => x/this.m)
    this.a.add(a)
    
    const v = this.a.array.map(x => x*dt)
    this.v.add(v)
    
    this.pos.add(this.v.array.map(x => x*dt))
  }

  update(state: {particles: Particle[]}, dt: number) { 
    let abort = false
    const others = state.particles.filter(x => x.id !== this.id)
    const Fw = others.reduce((f, p) => {
      if(abort) return f
      const [x, y] = Particle.calcForce(this, p)
      const d = p.pos.dist(this.pos.array)
      if(d < this.r + p.r) {
        const mom1 = this.v.scale(this.m)
        const mom2 = p.v.scale(p.m)
        const nv = (mom1.add(mom2.array).scale(1/(this.m+p.m)))

        const np = new Particle(
          this.pos,
          this.m + p.m,
          new Vector(0, 0),
          new Vector(0, 0),
          this.ctx,
          false,
          (Math.sqrt(this.r**2 + p.r**2))
        )
        console.log(np)
        state.particles.push(np)
        state.particles = state.particles
          .filter(x => !(x.id === this.id || x.id === p.id))
        
        abort = true
        return f
      }
      return [
        f[0] + x,
        f[1] + y
      ]
    }, [0, 0])

    

    // if(abort) return
    // if(this.added) console.table(Fw)

    this.applyForce(Fw, dt)
    
    // Wall hit detection
    const hitScalar = 0.8
    if(this.pos.h + this.r > this.ctx.canvas.width ||
      this.pos.h - this.r <= 0 ) {
        this.v.mult([-hitScalar, hitScalar])
        this.a.mult([-hitScalar, hitScalar])
      }

    if(this.pos.v + this.r > this.ctx.canvas.height ||
      this.pos.v - this.r <= 0 ) {
        this.v.mult([hitScalar, -hitScalar])
        this.a.mult([hitScalar, -hitScalar])
      }
  }

  draw(ctx: CanvasRenderingContext2D) {

    ctx.beginPath()
    ctx.arc(this.pos.h, this.pos.v, this.r, 0, Math.PI*2)
    if(this.added) ctx.fillStyle = 'red'
    else ctx.fillStyle = 'white'
    ctx.fill()
    ctx.closePath()

  }

  static calcDist(p1: Particle, p2: Particle) {
    const s = Math.sign(p1.pos.h - p2.pos.h) * 
      Math.sign(p1.pos.v - p2.pos.v)
    return s * p1.pos.dist(p2.pos.array)
  }

  /**
   * Returns an array of angles [p1, p2]
   */
  static calcAngle(p1: Particle, p2: Particle) {
    const h = Math.abs(p1.pos.h - p2.pos.h) 
    const v = Math.abs(p1.pos.v - p2.pos.v)

    return Math.atan(v/h)
  }

  static calcRatio(p1: Particle, p2: Particle) {
    const b = Math.abs(p1.pos.h - p2.pos.h) || 1
    const a = Math.abs(p1.pos.v - p2.pos.v) || 1
    return [a/b, b/a]
  }

  /**
   * Returns an array of forces [horizonal, vertical] with which particles work on each other
   * @param p1 {Particle}
   * @param p2 {Particle}
   */
  static calcForce(p1: Particle, p2: Particle): number[] {
    function formula(M: number, m: number, r: number) {
      return G*M*m/(r**2)
    }
    const G = 6.67 * (10**-5);
    const d = Particle.calcDist(p1, p2)
    const f = formula(p1.m, p2.m, d)
    const th = Particle.calcAngle(p1 ,p2)
    return [
      -(Math.sign(p1.pos.h - p2.pos.h))*f*Math.cos(th),
      -(Math.sign(p1.pos.v - p2.pos.v))*f*Math.sin(th),
    ]
  }
}