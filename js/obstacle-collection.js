function ObstacleCollection(ctx, difficulty) {
  this.ctx = ctx;
  
  this.difficulty = difficulty;
  
  if (this.difficulty === "easy") {
    this.coin = Math.floor(Math.random() * 50) + 20;
    this.pipe = Math.floor(Math.random() * 1000) + 600;
    this.brick = Math.floor(Math.random() * 200) + 140;
    this.shooter = Math.floor(Math.random() * 300) + 100;
    this.helicopter = Math.floor(Math.random() * 300) + 100;
    this.bulletPack = Math.floor(Math.random() * 200) + 100;
    this.heart = Math.floor(Math.random() * 800) + 500;
    
  } else if (this.difficulty === "hard") {
    this.coin = Math.floor(Math.random() * 60) + 50;
    this.pipe = Math.floor(Math.random() * 300) + 200;
    this.brick = Math.floor(Math.random() * 100) + 50;
    this.shooter = Math.floor(Math.random() * 200) + 100;
    this.helicopter = Math.floor(Math.random() * 150) + 100;
    this.heart = Math.floor(Math.random() * 600) + 400;
    
  } else if (this.difficulty === "extreme") {
    this.coin = Math.floor(Math.random() * 60) + 50;
    this.pipe = Math.floor(Math.random() * 100) + 90;
    this.brick = Math.floor(Math.random() * 80) + 30;
    this.shooter = Math.floor(Math.random() * 100) + 80;
    this.helicopter = Math.floor(Math.random() * 100) + 70;
    this.heart = Math.floor(Math.random() * 400) + 300;
  }
  
  this.obstacles = [];
  this.pipeFramesCount = 0;
  this.coinFramesCount = 0;
  this.brickFramesCount = 0;
  this.shooterFramesCount = 0;
  this.helicopterFramesCount = 0;
  this.heartFramesCount = 0;
}

//DRAW ALL OBSTACLES
ObstacleCollection.prototype.draw = function() {
  this.pipeFramesCount++;
  this.coinFramesCount++;
  this.brickFramesCount++;
  this.shooterFramesCount++;
  this.helicopterFramesCount++;
  this.heartFramesCount++;
  
  if (this.coinFramesCount >= this.coin) {
    this.obstacles.push(new Coin(this.ctx));
    this.coinFramesCount = 0;
  }
  
  if (this.heartFramesCount >= this.heart) {
    this.obstacles.push(new Heart(this.ctx));
    this.heartFramesCount = 0;
  }
  
  if (this.pipeFramesCount >= this.pipe) {
    this.obstacles.push(new Pipe(this.ctx));
    this.pipeFramesCount = 0;
  }
  
  if (this.brickFramesCount >= this.brick) {
    this.obstacles.push(new Brick(this.ctx));
    this.obstacles.forEach(function(obstacle) {
      if (obstacle instanceof Brick) {
        this.obstacles.push(new BulletPack(this.ctx, obstacle));
      }
    }.bind(this)
  );
  this.brickFramesCount = 0;
}

if (this.shooterFramesCount >= this.shooter) {
  this.obstacles.push(new Shooter(this.ctx));
  this.shooterFramesCount = 0;
}

if (this.helicopterFramesCount >= this.helicopter) {
  this.obstacles.push(new Helicopter(this.ctx));
  this.helicopterFramesCount = 0;
}

this.obstacles.forEach(
  function(obstacle) {
    obstacle.draw();
  }.bind(this));
};

//MOVE EVERYTHING
ObstacleCollection.prototype.move = function() {
  this.obstacles.forEach(
    function(obstacle) {
      obstacle.move();
      
      if ((obstacle instanceof Shooter && obstacle.mustShoot()) || (obstacle instanceof Helicopter && obstacle.mustShoot())) {
        this.obstacles.push(obstacle.shoot());
      }
    }.bind(this));    
  };
  
  //CLEAN OBSTACLES OUT OF CANVAS
  ObstacleCollection.prototype.clean = function() {
    this.obstacles = this.obstacles.filter(function(obstacle) {
      return obstacle.x + obstacle.w >= 0;
    });
  };
  
  //REMOVE PICKED COINS & DIED ENEMIES
  ObstacleCollection.prototype.removeElement = function(obstacle) {
    this.obstacles = this.obstacles.filter(function(o) {
      return o !== obstacle;
    });
  };
  