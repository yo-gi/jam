var Enemy_02 = cc.Sprite.extend({
    Enemy2:null,
    spriteSheet:null,
    swimmingAction:null,
    ctor:function (totalTicks, startX, startY, endX, endY) {
        var winsize = cc.director.getWinSize();
        this._super();
        this.totalTicks = totalTicks;
        this.total4 = 0;
        this.init();
        this.action = 0;
        this.x = startX;
        this.y = startY;
        this.velX = (endX - this.x)/this.total4;
        this.velY = (endY - this.y)/this.total4;
        this.gameTicks = 0;
        this.distanceToPlayer = 0;
        this.GameOver = 0;
    },
    update:function(dt){
        if(this.GameOver == 0)
        {
            if((this.gameTicks % this.totalTicks) < this.total4)
            {
                this.y = this.y + this.velY;
            }
            else if((this.gameTicks % this.totalTicks) < 2*this.total4)
            {
                this.x = this.x + this.velX;
            }
            else if((this.gameTicks % this.totalTicks) < 3*this.total4)
            {
                this.y = this.y - this.velY;
            }
            else
            {
                this.x = this.x - this.velX;
            }
            this.gameTicks++;
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
            this.rotate();

            this.distanceToPlayer = Math.sqrt((MW.PLAYER.x-this.x) * (MW.PLAYER.x-this.x) + (MW.PLAYER.y-this.y) * (MW.PLAYER.y-this.y));
            MW.ENEMYd[2] = this.distanceToPlayer;
            if(this.distanceToPlayer < 40)
            {
                var actionTo = new cc.MoveTo(2, cc.p(MW.PLAYER.x, MW.PLAYER.y));
                this.Enemy2.runAction(new cc.Sequence(actionTo));
                this.GameOver = 1;
                cc.log("GameOver0");
                cc.director.runScene(new GameOver());

            }
            if(this.distanceToPlayer > 255)
            {
                this.Enemy2.setOpacity(0);
            }
            else
            {
                this.Enemy2.setOpacity(255-this.distanceToPlayer);
            }
        }
    },
    rotate:function(){
        var angle = Math.atan2(MW.PLAYER.x-this.x, MW.PLAYER.y-this.y);
        angle = angle * (180/Math.PI);
        this.setRotation(angle);
    },
    init:function () {
        this._super();

        /*
        cc.spriteFrameCache.addSpriteFrames(res.Fish_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.Fish_png);
        this.addChild(this.spriteSheet);

        var animFrames = [];
        for (var i = 1; i < 4; ++i) {
            var str = "Fish0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.swimmingAction = new cc.RepeatForever(new cc.Animate(animation));
        this.Enemy1 = new cc.Sprite("#.png");
        this.Enemy1.attr({x:this.x, y:this.y});
        this.Enemy1.runAction(this.swimmingAction);
        this.spriteSheet.addChild(this.Enemy1);
        this.Enemy1.setRotation(190 * 180 / Math.PI);*/

        //create the hero sprite
        this.Enemy2 = new cc.Sprite(res.Enemy_02_png);
        this.addChild(this.Enemy2);
        this.Enemy2.setPosition(new cc.Point(this.x,this.y));
        this.total4 = this.totalTicks/4;

        this.schedule(this.update);
    }
});