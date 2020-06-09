let scoreLeft = 0;
let scoreRight = 0;
let paddle;
let ball = {
  x: 0,
  y: 0,
  speedX: 10,
  speedY: 0,
  radius: 40,

}
let ball2 = {
  x: 0,
  y: 0,
  speedX: 10,
  speedY: 0,
  radius: 40,

}

let paddleLeft; // = {
// x: 30,
// y: 0,
// width: 20,
// height: 150
//}

let paddleRight; //= {
// x: 0,
// y: 0,
// width: 20,
// height: 150
//}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  rectMode(CENTER);
  noStroke();
  paddleRight = new Paddle(width - 30, 0, 20, 150, 'vertical', fill(255));
  paddleLeft = new Paddle(30, 0, 20, 150, 'horizontal', fill(255));
  ball.x = width / 2;
  ball.y = height / 2;
  ball2.x = width / 2;
  ball2.y = height / 2;

  //paddleRight.x = width - 30;
}

function draw() {
  background(0);
  stroke(250, 30, 40);
  moveBall();
  bounceBall();
  drawElements();
  paddleLeft.afficher();
  paddleRight.afficher();
  paddleLeft.bouger();
  paddleRight.bouger();
}


function drawElements() {

  ellipse(ball.x, ball.y, ball.radius);
  ellipse(ball2.x, ball2.y, ball2.radius);
  textSize(100);
  textAlign(RIGHT)
  text(scoreLeft, width / 2 - 40, 100);
  textAlign(LEFT)
  text(scoreRight, width / 2 + 40, 100);

  for (let y = 0; y < height; y = y + 30) {
    rect(width / 2, y, 20, 20);
  }

}

function bounceBall() {
  // Detection de collision Paddle Right
  if (ball.x >= paddleRight.x - paddleRight.width * 2 &&
    ball.y >= paddleRight.y - paddleRight.height / 2 &&
    ball.y <= paddleRight.y + paddleRight.height / 2) {
    ball.speedX = -ball.speedX;
    ball.speedY = random(-5, 5);
    ball2.speedX = -ball.speedX;
    ball2.speedY = random(-5, 5);
    paddleRight.changeCouleur();
  }

  // Detection de collision Paddle Left
  if (ball.x <= paddleLeft.x + paddleLeft.width * 2 &&
    ball.y >= paddleLeft.y - paddleLeft.height / 2 &&
    ball.y <= paddleLeft.y + paddleLeft.height / 2) {
    ball.speedX = -ball.speedX;
    ball.speedY = random(-5, 5);
    ball2.speedX = -ball.speedX;
    ball2.speedY = random(-5, 5);
    paddleLeft.changeCouleur();

  }

  // Detection collision "murs" haut et bas
  if (ball.y <= ball.radius || ball.y >= height - ball.radius) {
    ball.speedY = -ball.speedY;
  }

  if (ball.x > width) {
    resetBall('left');
    scoreLeft += 1;
  } else if (ball.x < 0) {
    resetBall('right');
    scoreRight += 1;

  }
}


function moveBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  ball2.x += ball2.speedX;
  ball2.y += ball2.speedY;
}

function resetBall() {
  ball.x = width / 2;
  ball.y = height / 2;
  ball.speedX = -ball.speedX;
  ball.speedY = random(-2, 2);
  ball2.x = width / 2;
  ball2.y = height / 2;
  ball2.speedX = -ball.speedX;
  ball2.speedY = random(-2, 2);

}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
}

class Paddle {
  constructor(x, y, width, height, axis, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.axis = axis;
    this.color = color;
  }
  changeCouleur() {
    this.color = fill(random(0, 255), random(0, 255), random(0, 255));
  }
  //afficher
  afficher() {

    rect(this.x, this.y, this.width, this.height);

  }
  bouger() {
    if (this.axis == 'vertical') {
      this.y = mouseY;
    } else if (this.axis == 'horizontal') {
      this.y = mouseX;
    }
  }
}