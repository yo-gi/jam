var Player = cc.Layer.extend({
    mainSprite:null,
    space:null,
    sprite:null,
    ctor:function (space) {
        var winsize = cc.director.getWinSize();

        this._super();
        this.space = space; //chipmunk
        this.init();
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this.addChild(this._debugNode, 10);

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

        /*if(this.x_ >= 1250)
        {
            this.x_ = 1250;
        }
        else if(this.x_ <= 30)
        {
            this.x_ = 30;
        }

        if(this.y_ >= 710)
        {
            this.y_ = 710;
        }
        else if(this.y_ <= 10)
        {
            this.y_ = 10;
        }*/
        MW.PLAYER.x = this.x_;
        MW.PLAYER.y = this.y_;
        this.body.p = cc.p(this.x_, this.y_);

        var angle = Math.atan2(MW.MOUSE.x-this.x_,MW.MOUSE.y-this.y_);
        angle = angle * (180/Math.PI);
        this.mainSprite.setRotation(angle);
    },
    init:function () {
        this._super();

        this.mainSprite = new cc.PhysicsSprite(res.Player_png);
        var contentSize = this.mainSprite.getContentSize();
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p(this.x_, this.y_);
        this.body.applyImpulse(cp.v(0, 0), cp.v(0, 0));
        this.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body, contentSize.width, contentSize.height);
        this.shape.setCollisionType(2);
        this.space.addShape(this.shape);
        this.mainSprite.setBody(this.body);

        this.addChild(this.mainSprite);
        this.schedule(this.update);

        //create the hero sprite
        /*
        this.mainPlayer = new cc.Sprite(res.Player_png);
        this.addChild(this.mainPlayer);
        this.mainPlayer.setPosition(new cc.Point(this.x_,this.y_));
        this.schedule(this.update);
        */
    }
});