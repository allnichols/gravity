const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})

// Objects
function Ball(x, y, radius, color, dy) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
}

Ball.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}

Ball.prototype.update = function() {
  if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy;
  } else {
    this.dy += 1;
    console.log(this.dy);
  }
    this.y += this.dy;
    this.draw()
}

// Implementation
var ball;
function init() {
 ball = new Ball(canvas.width / 2, canvas.height / 2, 30, 'red', 5);
console.log(ball);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    ball.update();
    // objects.forEach(object => {
    //  object.update();
    // });
}

init()
animate()
