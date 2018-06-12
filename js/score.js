function Score(game) {
  this.ctx = game.ctx;
  this.x = 30;
  this.y = 30;
  this.w = 30;
  this.h = 30;
  
  this.imgCoin = new Image();
  this.imgCoin.src = "img/score-images/coin.gif";
  
  this.imgBulletPack = new Image();
  this.imgBulletPack.src = "img/score-images/bullet_pack.png";
  
  this.hearts = new Image();
  this.hearts.src = "img/score-images/hearts.png";
  
  this.score = 0;
  this.bulletsCollected = 0;
  this.heartsLeft = 3;
  this.game = game;
  this.localStorage = game.localStorage;
  
  this.timingMsg = 500;

  this.gameOver = false;
}

Score.prototype.draw = function() {
  this.ctx.font = "16px Verdana";
  this.ctx.fillText(this.score, this.x + this.w + 20, this.y + this.h / 1.7);
  this.ctx.drawImage(
    this.imgCoin,
    0,
    0,
    this.imgCoin.width,
    this.imgCoin.height,
    this.x,
    this.y,
    this.w,
    this.h
  );
  
  this.ctx.font = "16px Verdana";
  this.ctx.fillText(
    this.bulletsCollected,
    this.x + this.w + 20,
    this.y * 3 + this.h / 1.7
  );
  this.ctx.drawImage(
    this.imgBulletPack,
    0,
    0,
    this.imgBulletPack.width,
    this.imgBulletPack.height,
    this.x,
    this.y * 3,
    this.w,
    this.h
  );
  
  this.ctx.font = "16px Verdana";
  this.ctx.fillText(
    this.heartsLeft,
    this.x + this.w + 20,
    this.y * 5 + this.h / 1.7
  );
  this.ctx.drawImage(
    this.hearts,
    0,
    0,
    this.imgBulletPack.width,
    this.imgBulletPack.height,
    this.x,
    this.y * 5,
    this.w,
    this.h
  );
};

//MESSSAGES WHEN SMASH
Score.prototype.msg = function() {
  var body = $("body");
  var div = $("<div></div>");
  var image = $("<img></img>");
  image.css({
    transform:
    "rotate" +
    ["X", "Y"][Math.floor(Math.random() * 2)] +
    "(" +
    Math.floor(Math.random() * 45) +
    "deg)",
    width: "" + (Math.floor(Math.random() * 300) + 150) + "px"
  });
  image.css(
    "transform",
    "translate" +
    ["X", "Y"][Math.floor(Math.random() * 2)] +
    "(" +
    Math.floor(Math.random() * 300) +
    "px"
  );
  image.attr(
    "src",
    "img/score-images/img_" + (Math.floor(Math.random() * 6) + 1) + ".png"
  );
  
  div.append(image);
  body.append(div);
  
  div.addClass("reveal");
  setTimeout(function() {
    div.remove();
  }, this.timingMsg);
};

Score.prototype.updateScore = function(score) {
  this.score += score;
};

Score.prototype.updateLifes = function(life) {
  this.heartsLeft += life;
  if (this.heartsLeft <= 0) {
    this.heartsLeft = 0;
    this.gameOver = true;
  }
};

Score.prototype.updateBullet = function(bullet) {
  this.bulletsCollected = bullet;
  if (this.bulletsCollected <= 0) {
    this.bulletsCollected = 0;
  }
};
