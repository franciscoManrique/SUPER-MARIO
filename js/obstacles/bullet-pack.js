function BulletPack(ctx, obstacle){

    this.ctx = ctx;    
    this.img = new Image();
    this.img.src = 'img/score-images/bullet_pack.png';
    
    this.w = 30;
    this.h = 40;

    this.x = (obstacle.x + obstacle.w / 2);
    this.y = obstacle.y - this.h;
    
    this.vx = obstacle.vx;
}

BulletPack.prototype.draw = function(){    
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    );
};

BulletPack.prototype.move = function(){        
    this.x -= this.vx;
};

BulletPack.prototype.collide = function(element) { 
    return element.x + element.w >= this.x && 
    element.x <= this.x + this.w &&
    element.y + element.h >= this.y &&
    element.y <= this.y + this.h;
};




