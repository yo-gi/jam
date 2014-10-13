var Player = cc.Sprite.extend({
    mainPlayer:null,
    ctor:function () {
        var winsize = cc.director.getWinSize();
        this._super();
        this.init();
        this.x = 400;
        this.y = 300;
        this.velX = 0;
        this.velY = 0;
        this.speed = 4.5;
        this.friction = 0.85;
        //W = 87
        //A = 65
        //S = 83
        //D = 68
    },
    update:function(dt){
        if (MW.KEYS[cc.KEY.w] || MW.KEYS[cc.KEY.up]) {
            if (this.velY < this.speed) {
                this.velY++;
            }
        }
        if (MW.KEYS[cc.KEY.s] || MW.KEYS[cc.KEY.down]) {
            if (this.velY > -this.speed) {
                this.velY--;
            }
        }
        if (MW.KEYS[cc.KEY.a] || MW.KEYS[cc.KEY.left]) {
            if (this.velX > -this.speed) {
                this.velX--;
            }
        }
        if (MW.KEYS[cc.KEY.d] || MW.KEYS[cc.KEY.right]) {
            if (this.velX < this.speed) {
                this.velX++;
            }
        }
        this.velY *= this.friction;
        this.y += this.velY;
        this.velX *= this.friction;
        this.x += this.velX;
        if(this.x >= 1250)
        {
            this.x = 1250;
        }
        else if(this.x <= 30)
        {
            this.x = 30;
        }
        if(this.y >= 710)
        {
            this.y = 710;
        }
        else if(this.y <= 10)
        {
            this.y = 10;
        }
        MW.PLAYER.x = this.x;
        MW.PLAYER.y = this.y;
        var angle = Math.atan2(MW.MOUSE.x-this.x,MW.MOUSE.y-this.y);
        angle = angle * (180/Math.PI);
        cc.log("velX = " + this.velX + " velY = " + this.velY + " X " + this.x + " Y " + this.y);
        this.setRotation(angle);
    },
    init:function () {
        this._super();
        //create the hero sprite
        this.velX = 0;
        this.velY = 0;
        this.mainPlayer = new cc.Sprite(res.Player_png);
        this.addChild(this.mainPlayer);
        this.mainPlayer.setPosition(new cc.Point(this.x,this.y));
        this.schedule(this.update);
    },
    is_colliding:function(p1, p2) {
        var potentialx = this.x + this.velX*this.friction;
        var potentialy = this.y + this.velY*this.friction;
        var denominator = ((potentialx - this.x) * (p2.y - p1.y)) - ((potentialx - this.y) * (p2.x - p1.x));
        var numerator1 = ((this.y - p1.y) * (p2.x - p1.x)) - ((this.x - p1.x) * (p2.y - p1.y));
        var numerator2 = ((this.y - p1.y) * (potentialx - this.x)) - ((this.x - p1.y) * (potentialy - this.x));
        if (denominator == 0) return numerator1 == 0 && numerator2 == 0;
        var r = numerator1 / denominator;
        var s = numerator2 / denominator;
        return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
    }
});