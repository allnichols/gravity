const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
var gravity = 1;
var friction = 0.8;
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

//integer functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//random color functions
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

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
    c.fill();
    c.stroke();
    c.closePath();
}

Ball.prototype.update = function() {
  if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy * friction;
  } else {
    this.dy += gravity;
    console.log(this.dy);
  }
    this.y += this.dy;
    this.draw()
}

// Implementation
var ball;
var ballArray = [];
function init() {
  for (var i = 0; i < 100; i++) {
    var x = randomIntFromRange(0, canvas.width);
    var y = randomIntFromRange(0, canvas.height);
    var color = randomColor(colors);
    ballArray.push(new Ball(x, y, 30, color, 2));
  }

console.log(ballArray);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < ballArray.length; i++) {
      ballArray[i].update();
    }
}

init()
animate()
