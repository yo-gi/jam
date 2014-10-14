var Player = cc.Sprite.extend({
    mainPlayer:null,
    ctor:function () {
        this._super();
        this.init();
        this.x = 200;
        this.y = 100;
        this.velX = 0;
        this.velY = 0;
        this.speed = 4.5;
        this.friction = 0.85;
        this.gameTicks = 0;
        this.closest = 0;
        this.tileWidth = map01['tilewidth'];
        this.drawer = cc.DrawNode.create();
        this.addChild(this.drawer, 10);

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
        if (this.collisionDetected()) {
            this.y -= (this.velY + 0);
            this.x -= (this.velX + 0);
            this.velY /= this.friction;
            this.velX /= this.friction;
            //console.log(this.x + ", " + this.y);
        }

        /*if(this.x >= MW.MAP.xextreme - 1)
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
        }*/
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
        this.drawer.clear();
        //console.log(this.contentsize.width + ", " + this.contentsize.height);


        this.drawer.drawRect(
            cc.p(0, 0),
            cc.p(this.contentsize.width, this.contentsize.height),
            cc.color(0, 0, 0, 255),
            5,
            cc.color(255, 255, 255, 255));
    },
    init:function () {
        this._super();
        //create the hero sprite
        this.velX = 0;
        this.velY = 0;
        this.mainPlayer = new cc.Sprite(res.Player_png);
        this.addChild(this.mainPlayer);
        this.mainPlayer.setPosition(new cc.Point(this.x,this.y));
        this.contentsize = this.mainPlayer.getContentSize();
        this.schedule(this.update);
    },
    collideRect:function() {
        return cc.rect(this.x, this.y, 1, 1);
    },
    collisionDetected:function() {
        for (var i = 0; i < MW.MAP.data.length; ++i) {
            //console.log(MW.MAP.data[i].collideKey);
            if (MW.MAP.data[i].collideKey == 3) {
                if (this.collide(this, MW.MAP.data[i])) {
                    console.log("true " + MW.MAP.data[i].x + ", " + MW.MAP.data[i].y);
                    //MW.MAP.data[i].setOpacity(125);
                    return true;
                    //return false;
                }
                else {
                    //console.log("false");
                }
            }
        }
        return false;
    },
    collide:function(a, b) {
        var aRect = this.collideRect();
        var bRect = cc.rect(b.x, b.y, this.tileWidth, this.tilewidth);
        console.log("b: " + bRect.x + ", " + bRect.y);

        return cc.rectIntersectsRect(aRect, bRect);
    }
});