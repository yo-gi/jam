var Player = cc.Sprite.extend({
    currentRotation:0,
    spriteRunner:null,
    ctor:function () {
        var winsize = cc.director.getWinSize();
        this._super();
        this.init();
        //
        this.x = winsize.width / 2;
        this.y = winsize.height / 2;
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
/*        var angle = Math.atan2(GX-this.x,GY-this.y);
        angle = angle * (180/Math.PI);
        this.currentRotation = angle;*/
    },
    init:function () {
        this._super();

        //create the hero sprite
        this.spriteRunner = new cc.Sprite(res.Player_png);
        this.addChild(this.spriteRunner);
        this.spriteRunner.setPosition(new cc.Point(this.x,this.y));
        this.schedule(this.update);
    }
});