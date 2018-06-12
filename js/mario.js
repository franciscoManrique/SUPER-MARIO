//CONSTRUCTOR MARIO
function Mario(ctx) {
  this.ctx = ctx;
  
  this.img = new Image();
  this.img.src = "img/mario/mario.jpg";
  this.gunSong = new Audio();
  
  this.h = this.ctx.canvas.height / 10;
  this.w = this.h / 1.5;
  this.x = 400;
  this.y0 = 0.95 * this.ctx.canvas.height - this.h;
  this.y = this.y0;
  
  this.vx = 0;
  this.vy = 0;
  this.g = 0.4;
  
  this.img.frameIndex = 0;
  this.img.frames = 7;
  this.img.animateEvery = 3;
  this.drawCount = 0;
  
  this.coins = 0;
  
  this.isSimpleJumping = false;
  this.isDoubleJumping = false;
  
  this.bulletsCount = 0;
  this.bullets = [];
  
}

// Mario.prototype.isJumping = function() {  
//   return this.isSimpleJumping || this.isDoubleJumping;
// };

Mario.prototype.isJumping = function() {
  if (this.y < this.y0) {
    return true;
  }
};

//DRAW MARIO
Mario.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.img.width / this.img.frames * this.img.frameIndex,
    0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );
  this.bullets.forEach(function(bullet){
    bullet.move();
    bullet.draw();
  });
};

//MOVE MARIO
// Mario.prototype.move = function() {
  
//   this.animate();
  
//   this.x += this.vx;
//   this.y += this.vy;  
  
//   if (this.x <= 0) {
//     this.x = 0;
//   }
  
//   if (this.x + this.w > this.ctx.canvas.width){
//     this.x = this.ctx.canvas.width - this.w;
//   }
  
//   if (this.isJumping()) {
//     this.vy += this.g;
//   } else {    
//     this.y = this.y0;
//     this.vy = 0;
//   }
  
//   if (this.y === this.y0) {        
//     this.vy = 0;
//     this.y = this.y0;
//     this.isDoubleJumping = false;
//     this.isSimpleJumping = false;
//   }
// };

Mario.prototype.move = function() {
  this.animate();
  
  this.x += this.vx;
  this.y += this.vy;  
  
  if (this.x <= 0) this.x = 0;
  
  if (this.x + this.w > this.ctx.canvas.width){
    this.x = this.ctx.canvas.width - this.w;
  }
  
  if (this.isJumping()) {
    this.vy += this.g;
  } else {
    this.y = this.y0;
    this.vy = 0;
    
  }
};

//ANIMATING MARIO
Mario.prototype.animate = function() {
  if (this.isJumping()) return;
  
  this.drawCount++;
  
  if (this.drawCount === this.img.animateEvery) {
    this.img.frameIndex++;
    this.drawCount = 0;
    
    if (this.img.frameIndex === this.img.frames) {
      this.img.frameIndex = 0;
    }
  }
};

//KEY CODES
Mario.prototype.TOP = 38;
Mario.prototype.DOWN = 40;
Mario.prototype.LEFT = 37;
Mario.prototype.RIGHT = 39;
Mario.prototype.SHOOT = 32;

//KEYDOWN
Mario.prototype.onKeyDown = function(evt) {
  switch (evt.keyCode) {
    case this.LEFT:
    // this.vx = -10;
    break;
    case this.RIGHT:
    // this.vx = 10;
    break;
    case this.TOP:
    this.jump();
    break;
    case this.DOWN:
    this.vy += 10;
    break;
    case this.SHOOT:
    this.shoot();
    break;
  }
};

//KEYUP
Mario.prototype.onKeyUp = function(evt) {
  switch (evt.keyCode) {
    // case this.LEFT:
    // case this.RIGHT:
    // this.vx = 0;
    // break;
  }
};

//ACTIONS
// Mario.prototype.jump = function() {  
//   if (!this.isSimpleJumping) {
//     this.isSimpleJumping = true;
//     this.vy -= 10;
//   } else if (!this.isDoubleJumping) {
//     this.isDoubleJumping = true;
//     this.vy -= 10;
//   } 
// };

Mario.prototype.jump = function() {
  if(this.y === this.y0){
    this.jumping = 0;
  }
  if (this.jumping < 2) {
    this.jumping++;
    this.vy -= 10; 
  }   
};

//MARIO RELOAD AND SHOOT
Mario.prototype.reloadBullets = function(bulletsCollected){
  this.bulletsCount += bulletsCollected;
};

Mario.prototype.shoot = function(){  
  if (this.bulletsCount > 0) {
    this.bullets.push(new Bullet(this.ctx, this.x, this.y + 30, 'img/bullets/bullet_red.png', 30, 15, 20));
    this.bulletsCount--;
    
    this.gunSong.src = "music/gun.WAV";
    this.gunSong.play();
  }
};

Mario.prototype.countingBullets = function(){
  return this.bulletsCount;
};

//CLEAN BULLETS MARIO
Mario.prototype.cleanBullets = function(){
  
  this.bullets = this.bullets.filter(function(bullet){
    return !(bullet.x >= this.ctx.canvas.width);
  }.bind(this));
};

//CHECK COLLITIONS MARIO WITH EVERYTHING
Mario.prototype.checkCollitions = function(obstacles) {
  var collitions = obstacles.filter(
    function(obstacle) {
      return obstacle.collide(this);
    }.bind(this)
  );  
  
  collitions.forEach(
    function(obstacle) {
      if (!(obstacle instanceof Coin || obstacle instanceof Heart)) { // todo menos coins re-posicionan a mario
        this.collideWithObstacle(obstacle);
      } 
    }.bind(this)
  );
  return collitions; 
};

//COMMON COLLITIONS 
Mario.prototype.collideWithObstacle = function(o) {
  //top
  if (this.y + this.h - 20 <= o.y && this.x + this.w >= o.x && this.x <= o.x + o.w) {
    this.y = o.y - this.h;
    // this.y0 = this.y;
  }
  //left
  else if (this.x + this.w >= o.x && this.x < o.x) {
    this.x = o.x - this.w;
  }
  //right
  else if (this.x <= o.x + o.w && this.y + 10 > o.y && this.y + this.h - 10 < o.y + o.h) {
    this.x = o.x + o.w;
  }
  //bottom WRONG!!!!
  else if(this.y <= o.y + o.h && this.y + this.h >= o.y) {
    this.vy *= -1;
  }
  
  if (this.x + this.w >= o.x && this.x <= 0 && this.y + this.h > o.y) {
    
    this.x = 400;
    this.y = 0;
  }
};

