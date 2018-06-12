function Pipe(ctx){
    this.ctx = ctx;
    
    this.img = new Image();
    this.img.src = 'img/obstacles/pipe_'+ Math.round(Math.random() * 2) +'.png';
    
    this.w = this.ctx.canvas.width / (Math.floor(Math.random() * 30) + 20);
    
    this.h = this.w * 2;
    this.x = this.ctx.canvas.width;
    this.y = this.ctx.canvas.height * 0.95 - this.h;
    
    this.vx = 7;
}

Pipe.prototype.draw = function(){
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

Pipe.prototype.move = function(){  
    this.x -= this.vx;
};

Pipe.prototype.collide = function(mario) {  
    return mario.x + mario.w >= this.x && 
    mario.x <= this.x + this.w &&
    mario.y + mario.h >= this.y &&
    mario.y <= this.y + this.h;
};
