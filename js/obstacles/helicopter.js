function Helicopter(ctx) {
    this.ctx = ctx;
    
    this.img = new Image();
    
    this.img.src = 'img/obstacles/helicopter/helicopter.png';
    
    this.x = this.ctx.canvas.width;
    this.y = Math.floor(Math.random() * 400) + 100;
    
    this.w = 120;
    this.h = 120;
    
    this.img.framesX = 5;
    this.img.framesY = 4;
    this.img.frameXIndex = 0;
    this.img.frameYIndex = 0;
    
    this.img.animateEvery = 1;
    this.drawCount = 0;
    
    this.vx = Math.floor(Math.random() * 8) + 8;
    this.vy = Math.floor(Math.random() * -5) + 4;

    this.randomSpeedBullet = -(Math.floor(Math.random() * 4) + 16);
}

Helicopter.prototype.draw = function () {
    this.drawCount++;
    this.ctx.drawImage( 
        this.img,
        this.img.width  / this.img.framesX * this.img.frameXIndex,
        this.img.height / this.img.framesY * this.img.frameYIndex,
        this.img.width  / this.img.framesX,
        this.img.height / this.img.framesY,
        this.x,
        this.y,
        this.w,
        this.h
    );
    
    if (this.drawCount === this.img.animateEvery) {
        this.animate();
    }    
};

Helicopter.prototype.animate = function(){
    this.img.frameXIndex++;
    if (this.img.frameXIndex === this.img.framesX) {
        this.img.frameYIndex++;
        this.img.frameXIndex = 0;
        
        if (this.img.frameYIndex === this.img.framesY) {
            this.img.frameYIndex = 0;
        }
    }
    this.drawCount = 0;  
};

Helicopter.prototype.move = function(){
    this.x -= this.vx;
    this.y += this.vy;
    
    if(this.y <= 80 || this.y >= this.ctx.canvas.height / 2){
        this.vy *= -1;        
    }
};

Helicopter.prototype.mustShoot = function(){    
    return this.img.frameXIndex === 1 && this.img.frameYIndex === 2;
};

Helicopter.prototype.shoot = function(){    
    return new Bullet(this.ctx, this.x, this.y + this.h / 1.7, 'img/bullets/bullet_helicopter.png', 10, 10, this.randomSpeedBullet);
};

Helicopter.prototype.collide = function(mario) {      
    return mario.x + mario.w >= this.x && 
    mario.x <= this.x + this.w &&
    mario.y + mario.h >= this.y &&
    mario.y <= this.y + this.h;
};

//when i hit him from the top
Helicopter.prototype.isKilling = function(mario) {        
    return (mario.y + mario.h >= this.y && mario.x + mario.w > this.x && mario.x <= this.x + this.w && mario.y !== mario.y0);
};



