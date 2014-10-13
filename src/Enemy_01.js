var Enemy_01 = cc.Sprite.extend({
    Enemy1:null,
    ctor:function () {
        var winsize = cc.director.getWinSize();
        this._super();
        this.init();
        this.action = 0;
        this.x = 300;
        this.y = 0;
        this.y_prev = 0;
        this.gameTicks = 0;
        //W = 87
        //A = 65
        //S = 83
        //D = 68
    },
    update:function(dt){
        this.y_prev = this.y;
        this.y = (250 * Math.sin((this.gameTicks * 0.5 * Math.PI)/80)) + 200;
        this.gameTicks++;
/*        var angle = Math.atan2(0,this.y-this.y_prev);
        angle = angle * (180/Math.PI);
        this.setRotation(angle);*/
        if((this.y > this.y_prev))
        {
            //this.setRotation(0);
        }
        else
        {
            //this.setRotation(180);
        }
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
    },
    init:function () {
        this._super();

        //create the hero sprite
        this.Enemy1 = new cc.Sprite(res.Enemy_01_png);
        this.addChild(this.Enemy1);
        this.Enemy1.setPosition(new cc.Point(300,0));

        //create the move action
/*        var actionTo = cc.MoveTo.create(0.5, cc.p(300, 50));
        this.Enemy1.runAction(cc.Sequence.create(actionTo));*/
        this.schedule(this.update);
    }
});