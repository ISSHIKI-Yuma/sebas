const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const overlay = document.getElementById('overlay');
const overlayMessage = document.getElementById('overlay-message');
const restartBtn = document.getElementById('restart-btn');

const paddleWidth = 100;
const paddleHeight = 15;
const ballRadius = 8;
const brickRowCount = 5;
const brickColumnCount = 9;
const brickPadding = 10;
const brickOffsetTop = 50;
const brickOffsetLeft = 35;
const brickWidth = 75;
const brickHeight = 20;

let paddleX = (canvas.width - paddleWidth) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let dx = 4;
let dy = -4;
let score = 0;
let lives = 3;
let bricks = [];
let isGameOver = false;
let isPaused = false;
let animationId;

const colors = ['#e94560', '#0f3460', '#533483', '#16213e', '#e94560'];

function initBricks() {
  bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1, color: colors[r % colors.length] };
    }
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(canvas.width / 2 - paddleWidth / 2, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
  ctx.fillStyle = '#00adb5';
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#e94560';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = bricks[c][r].color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score += 10;
          scoreElement.textContent = `Score: ${score}`;
          if (score === brickRowCount * brickColumnCount * 10) {
            gameOver(true);
          }
        }
      }
    }
  }
}

function draw() {
  if (isPaused) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
    dx = -dx;
  }
  if (ballY + dy < ballRadius) {
    dy = -dy;
  } else if (ballY + dy > canvas.height - ballRadius - paddleHeight) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      livesElement.textContent = `Lives: ${lives}`;
      if (lives === 0) {
        gameOver(false);
      } else {
        ballX = canvas.width / 2;
        ballY = canvas.height - 30;
        dx = 4;
        dy = -4;
      }
    }
  }

  ballX += dx;
  ballY += dy;

  if (!isGameOver) {
    animationId = requestAnimationFrame(draw);
  }
}

function gameOver(win) {
  isGameOver = true;
  cancelAnimationFrame(animationId);
  overlayMessage.textContent = win ? 'You Win!' : 'Game Over';
  overlay.classList.remove('hidden');
}

function restartGame() {
  score = 0;
  lives = 3;
  isGameOver = false;
  isPaused = false;
  scoreElement.textContent = 'Score: 0';
  livesElement.textContent = 'Lives: 3';
  overlay.classList.add('hidden');
  paddleX = (canvas.width - paddleWidth) / 2;
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  dx = 4;
  dy = -4;
  initBricks();
  draw();
}

restartBtn.addEventListener('click', restartGame);

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    rightPressed = true;
  } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    leftPressed = true;
  } else if (e.key === 'p' || e.key === 'P') {
    isPaused = !isPaused;
    if (!isPaused) draw();
  }
}

function keyUpHandler(e) {
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    rightPressed = false;
  } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.getBoundingClientRect().left;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function paddleMovement() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

setInterval(paddleMovement, 10);

initBricks();
draw();