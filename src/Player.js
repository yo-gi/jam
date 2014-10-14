var Player = cc.Sprite.extend({
    mainPlayer:null,
    ctor:function () {
        this._super();
        this.init();
        this.x = 400;
        this.y = 300;
        this.velX = 0;
        this.velY = 0;
        this.speed = 4.5;
        this.friction = 0.85;
        this.gameTicks = 0;
        this.closest = 0;
        //W = 87
        //A = 65
        //S = 83
        //D = 68
    },
    update:function(dt){
        this.gameTicks++;
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
        if(this.x >= MW.MAP.xextreme - 1)
        {
            this.x = MW.MAP.xextreme - 1;
        }
        else if(this.x <= 1)
        {
            this.x = 1;
        }
        if(this.y >= MW.MAP.yextreme - 1)
        {
            this.y = MW.MAP.yextreme - 1;
        }
        else if(this.y <= 1)
        {
            this.y = 1;
        }
        if(MW.ENEMY1.d < MW.ENEMY2.d)
        {
            this.closest = MW.ENEMY1.d;
        }
        else
        {
            this.closest = MW.ENEMY2.d;
        }
        var winsize = cc.director.getWinSize();
        MW.PLAYER.x = this.x;
        MW.PLAYER.y = this.y;
        var angle = Math.atan2(MW.MOUSE.x-(winsize.width/2), MW.MOUSE.y-(winsize.height/2));
        //cc.log(MW.VIEWPORT.x + " " + MW.VIEWPORT.y);
        angle = angle * (180/Math.PI);
        //cc.log("velX = " + this.velX + " velY = " + this.velY + " X " + this.x + " Y " + this.y);
        this.setRotation(angle);
        if(this.closest > 150)
        {
            if((this.gameTicks % 100) == 0)
            {
                cc.audioEngine.playEffect(res.heartbeat_mp3);
            }
        }
        else
        {
            if((this.gameTicks % 40) == 0)
            {
                cc.audioEngine.playEffect(res.heartbeat_mp3);
            }
        }
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
    collideRect:function() {
        var contentSize = this.mainSprite.getContentSize();
        return cc.rect(this.x, this.y, contentSize.width, contentSize.height);
    }
});