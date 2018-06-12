function Game(canvas, songIntro, backgroundChosen, difficulty) {
  
  this.songIntro = songIntro;  
  this.difficulty = difficulty;
  
  this.canvas = canvas;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  this.ctx = this.canvas.getContext("2d");
  
  this.drawIntervalId = undefined;
  this.fps = 60;
  
  this.backgroundChosen = backgroundChosen;
  this.background = new Background(this.ctx, this.backgroundChosen);
  this.mario = new Mario(this.ctx, this.src);
  this.obstaclesCollection = new ObstacleCollection(this.ctx, this.difficulty);
  this.audios = new Audio();
  this.score = new Score(this);
  
  this.listeners();
  
  this.collectCoin = 1;
  this.coinsKillEnemy = 5;
  this.restLife = -1;
  this.sumLife = 1;
  this.collectBullets = 3;
  
  this.timeMsg = 200;
}

Game.prototype.start = function() {
  if (!this.drawIntervalId) {
    this.drawIntervalId = setInterval(function() {
      
      this.clean();
      this.draw();
      this.moveAll();
      this.collitions();
      this.bulletCollideWithEnemy();
      
      this.gameUpdates();
      this.checkGameOver();
      
    }.bind(this), 1000 / this.fps);
  }
};

//DRAW MARIO & BACKGROUND & OBSTACLES & SCORE
Game.prototype.draw = function() {
  this.background.draw();
  this.mario.draw();
  this.obstaclesCollection.draw();
  this.score.draw();
};


//MOVE MARIO & BACKGROUND & OBSTACLES
Game.prototype.moveAll = function() {
  this.background.move();
  this.mario.move();
  this.obstaclesCollection.move();
};


Game.prototype.gameUpdates = function(){
  //update bullet score from here cause from mario i cannot access to score
  this.score.updateBullet(this.mario.countingBullets());
};


//CHECK ALL COLLITIONS WITH MARIO
Game.prototype.collitions = function() {
  
  //Collitions obstacles > mario
  var collitionsMario = this.mario.checkCollitions(this.obstaclesCollection.obstacles);
  
  collitionsMario.forEach(function(obstacle) {
    
    if (obstacle instanceof Coin) {
      this.obstaclesCollection.removeElement(obstacle);
      
      //coins & music
      this.score.updateScore(this.collectCoin);
      this.audios.src = "music/coin.mp3";
      this.audios.play();
      
    } else if(obstacle instanceof Shooter || obstacle instanceof Helicopter) {
      if (obstacle.isKilling(this.mario)) {
        this.obstaclesCollection.removeElement(obstacle); 
        this.score.updateScore(this.coinsKillEnemy);
        
        //msg, coins & music
        this.score.msg(this.timeMsg);
        this.audios.src = "music/smashed.mp3";
        this.audios.play();
      } 
      
    } else if(obstacle instanceof BulletPack){
      this.obstaclesCollection.removeElement(obstacle);       
      this.mario.reloadBullets(this.collectBullets);
      
      this.audios.src = "music/reload.mp3";
      this.audios.play();
      
    } else if (obstacle instanceof Bullet) { 
      this.score.updateLifes(this.restLife);
      this.obstaclesCollection.removeElement(obstacle);
      this.audios.src = "music/explosion.mp3";
      this.audios.play();
      
    } else if(obstacle instanceof Heart){
      
      this.score.updateLifes(this.sumLife);
      this.obstaclesCollection.removeElement(obstacle);
      // this.audios.src = "music/explosion.mp3";
      // this.audios.play();
    }
  }.bind(this));
};


//BULLET MARIO HIT ENEMY
Game.prototype.bulletCollideWithEnemy = function(){
  
  this.mario.bullets.forEach(function(bullet, index){
    this.obstaclesCollection.obstacles.forEach(function(obstacle){
      if (obstacle instanceof Shooter || obstacle instanceof Helicopter) {
        if (bullet.checkBulletToEnemy(obstacle)) {
          this.obstaclesCollection.removeElement(obstacle); 
          this.score.updateScore(this.coinsKillEnemy);
          
          this.audios.src = "music/explosion.mp3";
          this.audios.play();
        }        
      } else if(obstacle instanceof Bullet){
        
        //Bullet mario hit bullet enemy 
        if (bullet.checkBulletToEnemy(obstacle)) {
          this.obstaclesCollection.removeElement(obstacle); 
          this.mario.bullets = this.mario.bullets.filter(function(b){
            return b !== bullet;
          }.bind(this));
        }
      }
    }.bind(this));
  }.bind(this));
};


Game.prototype.checkGameOver = function(){
  if (this.score.gameOver) {
    this.gameOver(this.score.score);
  }
};


Game.prototype.gameOver = function(score){
  clearInterval(this.drawIntervalId);
  $("#canvas").fadeOut(500, function() {
    $(".hero").fadeIn(500, function() {
      $(".fondoModal2").fadeIn(500);
      $(".score").text(score);
    });
  });
  
  this.songIntro.pause();
  this.songIntro.currentTime = 0;
};

//CLEAN OBSTACLES & CANVAS & MARIO BULLETS
Game.prototype.clean = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.obstaclesCollection.clean();
  this.mario.cleanBullets();
};

//LISTENERS
Game.prototype.listeners = function() {
  document.onkeydown = function(evt) {
    this.mario.onKeyDown(evt);
  }.bind(this);
  
  document.onkeyup = function(evt) {
    this.mario.onKeyUp(evt);
  }.bind(this);
};


