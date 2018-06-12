function Shooter(ctx){
    this.ctx = ctx;
    
    this.random = Math.round(Math.random() * 2);
    this.src = "img/obstacles/shooter/shooter_" + this.random + ".png";
    
    if (this.random === 0) {
        this.numFrames = 3;
        this.bulletWidth = 30;
        this.bulletHeight = 10;

    } else if(this.random === 1){
        this.numFrames = 12;
        this.bulletWidth = 30;
        this.bulletHeight = 10;

    } else if(this.random === 2){
        this.numFrames = 5;
        this.bulletWidth = 12;
        this.bulletHeight = 7;
    }
    
    this.img = new Image();
    
    this.img.src = this.src;
    
    this.w = this.ctx.canvas.width / 15;
    this.h = this.w / 1.2;
    this.x = this.ctx.canvas.width;
    
    this.y0 = this.ctx.canvas.height * 0.95 - this.h;
    this.y = this.y0;
    
    this.img.frames = this.numFrames;
    this.img.animateEvery = 5;
    this.drawCount = 0;
    this.img.frameIndex = 0;
    
    this.countToJump = 0;
    
    this.vx = Math.floor(Math.random() * 6) + 8;
    this.vy = 0;
    this.g = 0.2;
    
    this.randomBullet = (Math.floor(Math.random()* 12) + 1);
    this.randomSpeedBullet = -(Math.floor(Math.random()* 8) + 16);

    this.hasShoot = false;
}

Shooter.prototype.draw = function(){
    
    this.ctx.drawImage(
        this.img,
        (this.img.width / this.img.frames) * this.img.frameIndex,
        0,
        this.img.width / this.img.frames,
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h
    );
    this.animate();
};

Shooter.prototype.animate = function(){
    if (this.y !== this.y0) return;
    this.drawCount++;
    if (this.drawCount === this.img.animateEvery) {
        this.img.frameIndex++;
        this.drawCount = 0;
        
        if (this.img.frameIndex === this.img.frames) {
            this.img.frameIndex = 0;
        }
    }
};

Shooter.prototype.move = function(){ 
    this.countToJump++;
    
    this.x -= this.vx;
    this.y += this.vy;
    this.vy += this.g;
    
    if (!this.isJumping()) {
        this.y = this.y0;
        this.vy = 0;
    }
    
    if (this.mustJump()) {
        this.jump();
    }  
};

Shooter.prototype.jump = function(){
    this.randomHeight = Math.floor(Math.random() * 6) + 2;
    
    this.vy -= this.randomHeight;
    this.y -= 30;
};

Shooter.prototype.mustJump = function(){
    this.countToJump++;
    
    var random = Math.floor(Math.random() * 20) + 10;
    
    if (this.countToJump === random && !this.isJumping()) {
        this.countToJump = 0;
        return true;
    }
};

Shooter.prototype.isJumping = function(){
    return this.y < this.y0;
};

Shooter.prototype.mustShoot = function(){  
    return (!this.hasShoot && this.x <= this.ctx.canvas.width * 0.8);  
};

Shooter.prototype.shoot = function(){    
    this.hasShoot = true;
    return new Bullet(this.ctx, this.x - 20, this.y + this.h / 2, 'img/bullets/torpedo_'+ this.randomBullet +'.png',this.bulletWidth, this.bulletHeight, this.randomSpeedBullet);
    // this.hasShoot = true;
    // return true;
};

//collide with mario
Shooter.prototype.collide = function(mario) {  
    return mario.x + mario.w >= this.x && 
    mario.x <= this.x + this.w &&
    mario.y + mario.h >= this.y &&
    mario.y <= this.y + this.h;
};

//when i hit him from the top
Shooter.prototype.isKilling = function(mario) {
    return (
        mario.y + mario.h >= this.y &&
        mario.x + mario.w > this.x &&
        mario.x <= this.x + this.w &&
        mario.y !== mario.y0
    );
};
