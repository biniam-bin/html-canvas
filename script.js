const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ParticleArray = [];
let hue = 0;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: null,
  y: null,
};

canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 3; i++) {
    ParticleArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.8) {
      this.size -= 0.1;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// function init() {
//     for (let i = 0; i < 100; i++) {
//         ParticleArray.push(new Particle())
//     }
// }
// init()

function handleParticles() {
  for (let i = 0; i < ParticleArray.length; i++) {
    ParticleArray[i].update();
    ParticleArray[i].draw();
    for (let j = i; j < ParticleArray.length; j++) {
      const dx = ParticleArray[i].x - ParticleArray[j].x;
      const dy = ParticleArray[i].y - ParticleArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= 100) {
        ctx.beginPath();
        ctx.strokeStyle = ParticleArray[i].color;
        ctx.lineWidth = 0.4;
        ctx.moveTo(ParticleArray[i].x, ParticleArray[i].y);
        ctx.lineTo(ParticleArray[j].x, ParticleArray[j].y);
        ctx.stroke();
      }
    }
    if (ParticleArray[i] <= 0.3) {
      ParticleArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  //   ctx.fillRect(0, 0, canvas.width, canvas.height)
  handleParticles();
  hue += 2;
  requestAnimationFrame(animate);
}

animate();
