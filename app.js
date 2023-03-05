const canvas = document.querySelector("#myCanvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const ctx = canvas.getContext("2d");

//球
let circleX = 160;
let circleY = 60;
let radius = 20;
let speedX = 20;
let speedY = 20;
let dirX = "right";
let dirY = "down";

//地板
let groundX = 100;
let groundY = 500;
let groundHeight = 5;
let groundWidth = 200;

// min,max中取隨機數
function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

//磚塊
let brickArray = [];
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    brickArray.push(this);
  }

  drawBricks() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

for (let i = 0; i < 10; i++) {
  new Brick(getRandom(0, 950), getRandom(0, 550));
}

canvas.addEventListener("mousemove", (e) => {
  groundX = e.clientX;
  grondY = e.clientY;
});

function drawCircle() {
  //檢查球有沒有碰到bircks
  brickArray.forEach((b, index) => {
    if (
      circleX + radius >= b.x &&
      circleX - radius <= b.x + b.width &&
      circleY + radius >= b.y &&
      circleY - radius <= b.y + b.height
    ) {
      //球撞擊後的方向變化
      if (circleY >= b.y + b.height) dirY = "down"; //球由下往上
      else if (circleY <= b.y) dirY = "up"; //球由上往下
      else if (circleX <= b.x) dirX = "left"; //球由右往左
      else if (circleX >= b.x + b.width) dirX = "rigth"; //球由左往右

      //消除被打到的brick
      brickArray.splice(index, 1);
      if (brickArray.length == 0) {
        alert("遊戲結束");
        clearInterval(game);
      }
    }
  });

  //更動圓的座標
  //邊界
  if (dirX == "right") {
    if (circleX + radius == canvasWidth) dirX = "left";
    else circleX += speedX;
  } else {
    if (circleX - radius == 0) dirX = "right";
    else circleX -= speedX;
  }

  if (dirY == "down") {
    if (circleY + radius == canvasHeight) dirY = "up";
    else circleY += speedY;
  } else {
    if (circleY - radius == 0) dirY = "down";
    else circleY -= speedY;
  }

  //地板

  if (
    circleX >= groundX - radius &&
    circleX <= groundX + groundWidth + radius &&
    circleY >= groundY - radius &&
    circleY <= groundY + radius
  ) {
    if (dirY == "up") dirY = "down";
    else dirY = "up";
  }

  // 初始的黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //畫出所有brick
  brickArray.forEach((brick) => {
    brick.drawBricks();
  });

  //畫出圓球
  //x,y,radius,startAngle,endAngle
  ctx.beginPath();
  ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();

  //畫出地板
  ctx.fillStyle = "orange";
  ctx.fillRect(groundX, groundY, groundWidth, groundHeight);
}

let game = setInterval(drawCircle, 25);
