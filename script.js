const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = [
  '#3D013C',
  '#60487F',
  '#7888BF',
  '#68C2E5',
  '#4AF8FF']
var gravity = 1;
var friction = 0.9;
// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init();
})

addEventListener('click', () =>{
  init();
});

//integer functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//random color functions
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

// Objects
function Ball(x, y, radius, color, dy, dx) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
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
  if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
  } else {
    this.dy += gravity;
    console.log(this.dy);
  }

  if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0) {
    this.dx = -this.dx;
  }
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
}

// Implementation
var ball;
var ballArray;

function init() {
  ballArray = []; //resets array to prevent call the array again on resize
  for (var i = 0; i < 200; i++) {
    var radius = randomIntFromRange(10, 40);
    var x = randomIntFromRange(radius, canvas.width - radius);
    var y = randomIntFromRange(0, canvas.height - radius);
    var dx = randomIntFromRange(-2, 2);
    var dy = randomIntFromRange(-2, 2);
    var color = randomColor(colors);
    ballArray.push(new Ball(x, y, radius, color, 2, dy, dx));
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

init();
animate()
