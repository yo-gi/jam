var Enemy_02 = cc.Sprite.extend({
    Enemy2:null,
    ctor:function () {
        var winsize = cc.director.getWinSize();
        this._super();
        this.init();
        this.action = 0;
        this.x = 70;
        this.y = 100;
        this.x_prev = 0;
        this.y_prev = 0;
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
            this.x_prev = this.x;
            this.y_prev = this.y;
            if((this.gameTicks % 600) < 150)
            {
                this.y = this.y + 1.6;
            }
            else if((this.gameTicks % 600) < 300)
            {
                this.x = this.x + 2.2;
            }
            else if((this.gameTicks % 600) < 450)
            {
                this.y = this.y - 1.6;
            }
            else
            {
                this.x = this.x - 2.2;
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

        //create the hero sprite
        this.Enemy2 = new cc.Sprite(res.Enemy_02_png);
        this.addChild(this.Enemy2);
        this.Enemy2.setPosition(new cc.Point(this.x,this.y));

        //create the move action
        /*        var actionTo = cc.MoveTo.create(0.5, cc.p(300, 50));
         this.Enemy2.runAction(cc.Sequence.create(actionTo));*/
        this.schedule(this.update);
    }
});