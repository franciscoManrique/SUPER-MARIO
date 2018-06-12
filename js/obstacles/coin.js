
function Coin(ctx){
    this.ctx = ctx;
    
    this.img = new Image();
    this.img.src = 'img/prizes/prize_0.png';
    
    this.w = this.ctx.canvas.width / 50;
    this.h = this.w;
    this.x = this.ctx.canvas.width;
    
    var max = 600, min = 300;
    var random = Math.floor(Math.random() * (max - min + 1) + min);

    this.y = random;
        
    this.img.frames = 4;
    this.img.animateEvery = 5;
    this.img.drawCount = 0;
    this.img.frameIndex = 0;

    this.vx = 7;
}

Coin.prototype.draw = function(){
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


Coin.prototype.move = function(){
    this.x -= this.vx;
};

//ANIMATING COIN
Coin.prototype.animate = function(){    

    this.img.drawCount++;
    
    if (this.img.drawCount === this.img.animateEvery) {
        this.img.frameIndex++;
        this.img.drawCount = 0;        
        
        if (this.img.frameIndex === this.img.frames) {
            this.img.frameIndex = 0;
        }
    }    
};

Coin.prototype.collide = function(element) { 
    
    return element.x + element.w >= this.x && 
    element.x <= this.x + this.w &&
    element.y + element.h >= this.y &&
    element.y <= this.y + this.h;
};
