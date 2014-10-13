var Player = cc.Sprite.extend({
    currentRotation:0,
    spriteRunner:null,
    ctor:function () {
        var winsize = cc.director.getWinSize();
        this._super();
        this.init();
        this.x = winsize.width / 2;
        this.y = winsize.height / 2;
        this.velY = 0;
        this.velX = 0;
        this.speed = 0;
        this.friction = 0.98;
        //W = 87
        //A = 65
        //S = 83
        //D = 68
    },
    update:function(dt){
        if ((MW.KEYS[cc.KEY.w] || MW.KEYS[cc.KEY.up]) && this.y <= 720) {
            this.y += 10;
        }
        if ((MW.KEYS[cc.KEY.s] || MW.KEYS[cc.KEY.down]) && this.y >= 0) {
            this.y -= 10;
        }
        if ((MW.KEYS[cc.KEY.a] || MW.KEYS[cc.KEY.left]) && this.x >= 0) {
            this.x -= 10;
        }
        if ((MW.KEYS[cc.KEY.d] || MW.KEYS[cc.KEY.right]) && this.x <= 1280) {
            this.x += 10;
        }

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