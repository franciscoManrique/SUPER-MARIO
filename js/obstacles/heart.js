
function Heart(ctx){
    this.ctx = ctx;
    
    this.img = new Image();
    this.img.src = 'img/score-images/hearts.png';
    
    this.w = this.ctx.canvas.width / 50;
    this.h = this.w;
    this.x = this.ctx.canvas.width;
    
    var max = 600, min = 300;
    var random = Math.floor(Math.random() * (max - min + 1) + min);

    this.y = random;

    this.vx = 7;
}

Heart.prototype.draw = function(){
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    );
};


Heart.prototype.move = function(){
    
    this.x -= this.vx;
};

Heart.prototype.collide = function(element) { 
    return element.x + element.w >= this.x && 
    element.x <= this.x + this.w &&
    element.y + element.h >= this.y &&
    element.y <= this.y + this.h;
};
