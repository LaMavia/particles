import { Particle } from "./particle";
import { Vector } from "./vector";
interface S {
  particles: Particle[]
}
(() => {
  const ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext("2d")
  const state = {
    particles: [] as Particle[]
  }
   
  const fr = 1000/60
  let k = 1
  let x = 0, y = 0

  function rand(max: number, min: number) {
    return Math.random() * (max - min) + min
  }

  function handleClick(e: MouseEvent) {
    state.particles.push(new Particle(
      new Vector(e.clientX/k, e.clientY/k),
      10**11,
      new Vector(0, 0),
      new Vector(0, 0),
      ctx,
      true,
      5
    ))
  }

  function handleKey(e: KeyboardEvent) {
    switch(e.keyCode) {
      case 107: k = 2;break;
      case 109: k = 1;break;
      case 83: console.log(state);break;
      default:;break;
    }
  }

  function setup() {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    ctx.canvas.addEventListener('click', handleClick, {passive: true})
    window.addEventListener('keyup', handleKey, {passive: true})
    // ctx.canvas.addEventListener('mousemove', e => {
    //   x = ctx.canvas.width-e.clientX*1.3
    //   y = ctx.canvas.width-e.clientY*1.3
    // })

    const v = 3, a = 4 

    for(let i = 0; i < 200; i++) {
      state.particles.push(new Particle(
        new Vector(rand(ctx.canvas.width, 1), rand(ctx.canvas.height, 1)), 
        10**3,
        new Vector(0, 0),
        new Vector(0, 0),
        ctx,
        false,
        1
      ))
    }
 
    setTimeout(loop, fr)
  }

  function loop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    state.particles.forEach(p => {
      ctx.save()
      ctx.translate(x,y)
      ctx.scale(k,k)
      // console.log(particles.length)
      // @ts-ignore
      p.update(state, fr)
      p.draw(ctx)
      ctx.restore()
    })
    
    setTimeout(loop, fr)
  }


  setup()
})()