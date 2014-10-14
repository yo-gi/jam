var Enemy_01 = cc.Sprite.extend({
    Enemy1:null,
    spriteSheet:null,
    swimmingAction:null,
    ctor:function (speed, startX, startY, endX, endY) {
        var winsize = cc.director.getWinSize();
        this._super();
        this.init();
        this.action = 0;
        this.speed = speed;
        this.x = startX;
        this.y = startY;
        this.ampX = (Math.abs(endX - this.x)/2);
        this.ampY = (Math.abs(endY - this.y)/2);
        var offsetX = Math.abs(endX + this.x)/2;
        var offsetY = Math.abs(endY + this.y)/2;
        this.A = offsetX;
        this.B = offsetY;
        this.gameTicks = 0;
        this.distanceToPlayer = 0;
        this.GameOver = 0;
        //W = 87
        //A = 65
        //S = 83
        //D = 68
    },
    update:function(dt){
        if(this.GameOver == 0)
        {
            this.x = (this.ampX * Math.sin((this.gameTicks * 0.5 * Math.PI)/this.speed)) + this.A;
            this.y = (this.ampY * Math.sin((this.gameTicks * 0.5 * Math.PI)/this.speed)) + this.B;
            //
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

            //this.rotate();
            this.distanceToPlayer = Math.sqrt((MW.PLAYER.x-this.x) * (MW.PLAYER.x-this.x) + (MW.PLAYER.y-this.y) * (MW.PLAYER.y-this.y));
            MW.ENEMYd[1] = this.distanceToPlayer;
            if(this.distanceToPlayer < 40)
            {
                var actionTo = new cc.MoveTo(2, cc.p(MW.PLAYER.x, MW.PLAYER.y));
                this.Enemy1.runAction(new cc.Sequence(actionTo));
                this.GameOver = 1;
                cc.log("GameOver0");
                cc.director.runScene(new GameOver());

            }
            if(this.distanceToPlayer > 255)
            {
                this.Enemy1.setOpacity(0);
            }
            else
            {
                this.Enemy1.setOpacity(255-this.distanceToPlayer);
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
        this.Enemy1 = new cc.Sprite("#Fish01.png");
        this.Enemy1.attr({x:this.x, y:this.y});
        this.Enemy1.runAction(this.swimmingAction);
        this.spriteSheet.addChild(this.Enemy1);
        this.Enemy1.setRotation(190 * 180 / Math.PI);

        //create the hero sprite
        /*this.Enemy1 = new cc.Sprite(res.Enemy_01_png);
        this.addChild(this.Enemy1);
        this.Enemy1.setPosition(new cc.Point(this.x,this.y));
*/
        //create the move action
/*        var actionTo = cc.MoveTo.create(0.5, cc.p(300, 50));
        this.Enemy1.runAction(cc.Sequence.create(actionTo));*/
        this.schedule(this.update);
    }
});