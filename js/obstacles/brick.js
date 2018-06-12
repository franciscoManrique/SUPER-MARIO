function Brick(ctx){
    this.ctx = ctx;
    
    this.img = new Image();
    this.img.src = 'img/obstacles/brick_0.png';
    
    this.w = 100;

    this.h = 30;
    this.x = this.ctx.canvas.width;

    var max = 500, min = 150;
    var random = Math.floor(Math.random() * (max - min + 1) + min);

    this.y = this.ctx.canvas.height - random;
    
    this.vx = 7;
}

Brick.prototype.draw = function(){
    this.ctx.drawImage(
        this.img,
        0,
        0,
        this.img.width,
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h
    );
};

Brick.prototype.move = function(){  
    this.x -= this.vx;
};

Brick.prototype.collide = function(mario) {  
    return mario.x + mario.w >= this.x && 
    mario.x <= this.x + this.w &&
    mario.y + mario.h >= this.y &&
    mario.y <= this.y + this.h;
};
