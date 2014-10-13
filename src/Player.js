var Player = cc.Layer.extend({
    mainSprite:null,
    ctor:function (space) {
        var winsize = cc.director.getWinSize();

        this._super();
        this.init();

        this.x_ = winsize.width / 2;
        this.y_ = winsize.height / 2;
        this.velX = 0;
        this.velY = 0;
        this.speed = 4.5;
        this.friction = 0.85;
        //W = 87, A = 65, S = 83, D = 68

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
        this.y_ += this.velY;
        this.velX *= this.friction;
        this.x_ += this.velX;

        MW.PLAYER.x = this.x_;
        MW.PLAYER.y = this.y_;

        var angle = Math.atan2(MW.MOUSE.x-this.x_,MW.MOUSE.y-this.y_);
        angle = angle * (180/Math.PI);
        this.mainSprite.setRotation(angle);
        this.mainSprite.setPosition(cc.p(this.x_, this.y_));
    },
    init:function() {
        this._super();

        this.mainSprite = new cc.Sprite(res.Player_png);

        this.addChild(this.mainSprite);
        this.schedule(this.update);
    },
    collideRect:function() {
        var contentSize = this.mainSprite.getContentSize();
        return cc.rect(this.x_, this.y_, contentSize.width, contentSize.height);
    }
});