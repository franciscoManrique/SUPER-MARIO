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
  
  this.collectCoin = 1000;
  this.coinsKillEnemy = 5;
  this.restLife = -1;
  this.sumLife = 1;
  this.collectBullets = 3;
  
  this.timeMsg = 200;
  
  this.paused = false;
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

Game.prototype.stop = function() {
  if (!this.paused) {
    this.paused = true;
    clearInterval(this.drawIntervalId);
    $('.paused').fadeIn(300);
    this.songIntro.pause();
  } else{
    this.paused = false;
    this.drawIntervalId = undefined;
    this.start();
    $('.paused').fadeOut(300);
    this.songIntro.play();
  }
};

//DRAW MARIO & BACKGROUND & OBSTACLES & SCORE
Game.prototype.draw = function() {
  this.background.draw();
  this.mario.draw();
  this.score.draw();
  this.obstaclesCollection.draw();
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

Game.prototype.checkGameOver = function(){
  if (this.score.gameOver) {
    this.gameOver(this.score.score);
    $('.paused').css('display', 'none');
  }
};


Game.prototype.gameOver = function(score){
  this.stop();
  $("#canvas").fadeOut(500, function() {
    $(".hero").fadeIn(500, function() {
      $(".fondoModal2").fadeIn(500);
      $("#score").text(score);
    });
  });
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
      
    } else if((obstacle instanceof Shooter || obstacle instanceof Helicopter) &&  obstacle.isKilling(this.mario)) {
      this.obstaclesCollection.removeElement(obstacle); 
      this.score.updateScore(this.coinsKillEnemy);
      
      this.score.msg(this.timeMsg);
      this.playSong("music/smashed.mp3");
      
    } else if(obstacle instanceof BulletPack){
      this.obstaclesCollection.removeElement(obstacle);       
      this.mario.reloadBullets(this.collectBullets);
      this.playSong("music/reload.mp3");
      
    } else if (obstacle instanceof Bullet) { 
      this.score.updateLifes(this.restLife);
      this.obstaclesCollection.removeElement(obstacle);
      this.playSong("music/explosion.mp3");
      
    } else if(obstacle instanceof Heart){
      this.score.updateLifes(this.sumLife);
      this.obstaclesCollection.removeElement(obstacle); 
    }
  }.bind(this));
};

Game.prototype.playSong = function(src) {
  this.audios.src = src;
  this.audios.play();
};


//BULLET MARIO HIT ENEMY
Game.prototype.bulletCollideWithEnemy = function(){
  
  this.mario.bullets.forEach(function(bullet, index){
    this.obstaclesCollection.obstacles.forEach(function(obstacle){
      if (obstacle instanceof Shooter || obstacle instanceof Helicopter) {
        if (bullet.checkBulletToEnemy(obstacle)) {
          this.obstaclesCollection.removeElement(obstacle); 
          this.score.updateScore(this.coinsKillEnemy);
          
          this.playSong("music/explosion.mp3");
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
    if (evt.keyCode === 27) {
      this.stop();
    }
  }.bind(this);
  
  document.onkeyup = function(evt) {
    this.mario.onKeyUp(evt);
  }.bind(this);

  document.onclick = function(){
    this.mario.vy -= 10;
  }.bind(this);
};


