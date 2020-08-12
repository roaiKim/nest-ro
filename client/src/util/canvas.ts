const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
let WIDTH = document.documentElement.clientWidth;
let HEIGHT = document.documentElement.clientHeight;
const initStarsPopulation = 80;
let mouseMoving = false;
let mouseMoveChecker: NodeJS.Timeout;
let mouseX = 0;
let mouseY = 0;
const dotsMinDist = 2;
const maxDistFromCursor = 50;
const stars: (Star | null)[] = [];
const dots: (Dot | null)[] = [];
let requestAnimationFrameId: number;
// 一大堆是啥呀

function rancolor(a: number) {
  const r = Math.floor(Math.random() * 255);// random()方法可返回介于 0~1 之间的一个随机数
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r},${g},${b},${a})`;
}

function getPreviousDot(id: number, stepback: number) {
  if (id === 0 || id - stepback < 0) return false;
  if (typeof dots[id - stepback] !== 'undefined') return dots[id - stepback];
  return false;// getPreviousDot(id - stepback);
}

function degToRad(deg: number) {
  return deg * (Math.PI / 180);
}

function setCanvasSize() {
  WIDTH = document.documentElement.clientWidth;
  HEIGHT = document.documentElement.clientHeight;

  canvas.setAttribute('width', `${WIDTH}`);
  canvas.setAttribute('height', `${HEIGHT}`);
}
setCanvasSize();
// 星星
class Star {
  r: number; // 半径

  color: string; // 颜色

  // xy为坐标
  constructor(private id: number, private x: number, private y:number) {
    this.r = Math.floor(Math.random() * 2) + 1;
    const alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = rancolor(alpha);
  }

  draw = () => {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  };

  move = () => {
    this.y -= 0.15;
    if (this.y <= -10) this.y = HEIGHT + 10;
    this.draw();
  };

  die = () => {
    stars[this.id] = null;
    delete stars[this.id];
  };
}

// 点
class Dot {
  r: number;

  maxLinks: number;

  speed: number;

  a: number;

  aReduction: number;

  color: string;

  linkColor: string;

  dir: number;

  constructor(private id: number, public x: number, public y:number) {
    this.r = Math.floor(Math.random() * 5) + 1;
    this.maxLinks = 2;
    this.speed = 0.5;
    this.a = 0.5;
    this.aReduction = 0.005;
    this.color = rancolor(this.a);
    this.linkColor = rancolor(this.a / 4);
    this.dir = Math.floor(Math.random() * 140) + 200;
  }

  draw = () => {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  };

  link = () => {
    if (this.id === 0) return;
    const previousDot1 = getPreviousDot(this.id, 1);
    const previousDot2 = getPreviousDot(this.id, 2);
    const previousDot3 = getPreviousDot(this.id, 3);
    if (!previousDot1) return;
    ctx.strokeStyle = this.linkColor;
    ctx.moveTo(previousDot1.x, previousDot1.y);
    ctx.beginPath();
    ctx.lineTo(this.x, this.y);
    if (previousDot2 !== false) ctx.lineTo(previousDot2!.x, previousDot2!.y);
    if (previousDot3 !== false) ctx.lineTo(previousDot3!.x, previousDot3!.y);
    ctx.stroke();
    ctx.closePath();
  };

  move = () => {
    this.a -= this.aReduction;
    if (this.a <= 0) {
      this.die();
      return;
    }
    // this.color =  "rgba(255,255,255,"+this.a+")";
    // this.linkColor =  "rgba(255,255,255,"+this.a/4+")";
    this.x += Math.cos(degToRad(this.dir)) * this.speed;
    this.y += Math.sin(degToRad(this.dir)) * this.speed;

    this.draw();
    this.link();
  };

  die = () => {
    dots[this.id] = null;
    delete dots[this.id];
  };
}

canvas.onmousemove = function o(e: { clientX: number; clientY: number; }) {
  mouseMoving = true;
  mouseX = e.clientX;
  mouseY = e.clientY;
  clearInterval(mouseMoveChecker);
  mouseMoveChecker = setTimeout(() => {
    mouseMoving = false;
  }, 100);
};

function drawIfMouseMoving() {
  if (!mouseMoving) return;

  if (dots.length === 0) {
    dots[0] = new Dot(0, mouseX, mouseY);
    dots[0].draw();
    return;
  }

  const previousDot = getPreviousDot(dots.length, 1);
  const prevX = previousDot ? previousDot.x : 0;
  const prevY = previousDot ? previousDot.y : 0;

  const diffX = Math.abs(prevX - mouseX);
  const diffY = Math.abs(prevY - mouseY);

  if (diffX < dotsMinDist || diffY < dotsMinDist) return;

  let xVariation = Math.random() > 0.5 ? -1 : 1;
  xVariation = xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
  let yVariation = Math.random() > 0.5 ? -1 : 1;
  yVariation = yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
  dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation);
  dots[dots.length - 1]!.draw();
  dots[dots.length - 1]!.link();
}

function animate() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  stars.forEach((_) => {
    if (_) _.move();
  });

  dots.forEach((_) => {
    if (_) _.move();
  });

  drawIfMouseMoving();
  requestAnimationFrameId = requestAnimationFrame(animate);
}

function init() {
  ctx.strokeStyle = 'white';
  ctx.shadowColor = 'white';

  for (let i = 0; i < initStarsPopulation; i += 1) {
    stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT));
  }

  ctx.shadowBlur = 0;
  animate();
}

init();

setTimeout(() => {
  cancelAnimationFrame(requestAnimationFrameId);
}, 10000);
//
