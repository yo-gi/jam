var Enemy_01 = cc.Sprite.extend({
    Enemy1:null,
    ctor:function () {
        var winsize = cc.director.getWinSize();
        this._super();
        this.init();
        this.action = 0;
        this.x = 300;
        this.y = 0;
        this.x_prev = 0;
        this.y_prev = 0;
        this.gameTicks = 0;
        //W = 87
        //A = 65
        //S = 83
        //D = 68
    },
    update:function(dt){
        this.x_prev = this.x;
        this.y_prev = this.y;
        this.y = (250 * Math.sin((this.gameTicks * 0.5 * Math.PI)/80)) + 200;
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
    },
    rotate:function(){
        var angle = Math.atan2(MW.PLAYER.x-this.x, MW.PLAYER.y-this.y);
        angle = angle * (180/Math.PI);
        this.setRotation(angle);
    },
    init:function () {
        this._super();

        //create the hero sprite
        this.Enemy1 = new cc.Sprite(res.Enemy_01_png);
        this.addChild(this.Enemy1);
        this.Enemy1.setPosition(new cc.Point(this.x,this.y));

        //create the move action
/*        var actionTo = cc.MoveTo.create(0.5, cc.p(300, 50));
        this.Enemy1.runAction(cc.Sequence.create(actionTo));*/
        this.schedule(this.update);
    }
});