var Player = cc.Sprite.extend({
    mainPlayer:null,
    ctor:function () {
        this._super();
        this.init();
        this.x = 800;
        this.y = 300;
        this.velX = 0;
        this.velY = 0;
        this.speed = 4.5;
        this.friction = 0.85;
        this.gameTicks = 0;
        this.closest = 0;
        this.tileWidth = map01['tilewidth'];
        this.drawer = cc.DrawNode.create();
        this.addChild(this.drawer, 10);
        //this.animStart = false;

        //W = 87
        //A = 65
        //S = 83
        //D = 68
    },
    update:function(dt){
        this.gameTicks++;
        var winsize = cc.director.getWinSize();
        MW.PLAYER.x = this.x;
        MW.PLAYER.y = this.y;
        var angle = Math.atan2(MW.MOUSE.x-(winsize.width/2), MW.MOUSE.y-(winsize.height/2));

        //cc.log(MW.VIEWPORT.x + " " + MW.VIEWPORT.y);
        var degreesangle = angle * (180/Math.PI);
        cc.log("degrees: " + degreesangle);
        this.setRotation(degreesangle);
        if (MW.KEYS[cc.KEY.w] || MW.KEYS[cc.KEY.up]) {
            if (this.velY < this.speed) {
                this.velY += Math.cos(angle);
                this.velX += Math.sin(angle);
            }
        }
        if (MW.KEYS[cc.KEY.s] || MW.KEYS[cc.KEY.down]) {
            if (this.velY > -this.speed) {
                this.velY -= 1*Math.cos(angle);
                this.velX -= 1*Math.sin(angle);
            }
        }

        this.velY *= this.friction;
        this.y += this.velY;
        this.velX *= this.friction;
        this.x += this.velX;
        if (this.collisionDetected()) {
            this.y -= (this.velY + 0);
            this.x -= (this.velX + 0);
            this.velY = 0;
            this.velX = 0;
            //console.log(this.x + ", " + this.y);
        }

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
        if(MW.ENEMYd[1] < MW.ENEMYd[2])
        {
            this.closest = MW.ENEMYd[1];
        }
        else
        {
            this.closest = MW.ENEMYd[2];
        }
/*        cc.log(this.closest);
        for(var i = 1; i <= 2; ++i)
        {
            if((this.closest == 0) || (MW.ENEMYd[i] < this.closest))
            {
                this.closest = MW.ENEMYd[i];
            }
        }*/
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
        //this.drawer.clear();
        //console.log(this.contentsize.width + ", " + this.contentsize.height);

        /*if (this.animStart == false) {
            if (this.velX != 0 || this.velY != 0) {
                this.animStart = true;
                this.mainPlayer.runAction(this.swimmingAction);
            }
            else {
                this.mainPlayer.stopAction(this.swimmingAction);
                this.animStart = false;
            }
        }*/

        /*this.drawer.drawRect(
            cc.p(0, 0),
            cc.p(this.contentsize.width, this.contentsize.height),
            cc.color(0, 0, 0, 255),
            5,
            cc.color(255, 255, 255, 255));*/
        /*this.drawer.drawRect(
            cc.p(-10, 10),
            cc.p(this.contentsize.width, this.contentsize.height),
            cc.color(0, 0, 0, 255),
            5,
            cc.color(255, 255, 255, 255))*/
    },
    init:function () {
        this._super();
        this.velX = 0;
        this.velY = 0;

        cc.spriteFrameCache.addSpriteFrames(res.Divers_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.Divers_png);
        this.addChild(this.spriteSheet);

        var animFrames = [];
        for (var i = 1; i < 6; i++) {
            var str = "Diver" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.25);
        this.swimmingAction = new cc.RepeatForever(new cc.Animate(animation));

        this.mainPlayer = new cc.Sprite("#Diver1.png");
        this.mainPlayer.attr({x:this.x, y:this.y});
        this.mainPlayer.runAction(this.swimmingAction);
        this.spriteSheet.addChild(this.mainPlayer);

        /*this.addChild(this.mainPlayer);
        this.mainPlayer.setPosition(new cc.Point(this.x,this.y));*/
        this.contentsize = this.mainPlayer.getContentSize();
        this.schedule(this.update);
    },
    collideRect:function() {
        return cc.rect(this.x, this.y, this.contentsize.width/3, this.contentsize.height/3);
    },
    collisionDetected:function() {
        for (var i = 0; i < MW.MAP.data.length; ++i) {
            if (MW.MAP.unwalkable.indexOf(MW.MAP.data[i].collideKey) > -1) {
                if (this.collide(this, MW.MAP.data[i])) {
                    return true;
                }
            }
        }
        return false;
    },
    collide:function(a, b) {

        var aRect = this.collideRect();
        var bRect = cc.rect(b.x, b.y, this.tileWidth, this.tileWidth);

        return cc.rectIntersectsRect(aRect, bRect);
    }
});