function Bullet(ctx, x, y, imgSrc, w, h, vx){
    this.ctx = ctx;    
    
    this.img = new Image();
    this.img.src = imgSrc;
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.vx = vx;
}

Bullet.prototype.draw = function(){    
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    );
};

Bullet.prototype.move = function(){        
    this.x += this.vx;
};

Bullet.prototype.collide = function(element) { 
    return element.x + element.w >= this.x && 
    element.x <= this.x + this.w &&
    element.y + element.h >= this.y &&
    element.y <= this.y + this.h;
};

Bullet.prototype.checkBulletToEnemy = function(enemy) { 
   return this.x + this.w >= enemy.x && this.x <= enemy.x + enemy.w && this.y + this.h >= enemy.y && this.y <= enemy.y + enemy.h;
};



