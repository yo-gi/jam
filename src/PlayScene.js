var PlayScene = cc.Scene.extend({
    gameLayer:null,
    onEnter:function () {
        this._super();

        //add three layer in the right order

        this.gameLayer = new cc.Layer();
        this.gameLayer.addChild(new GameLayer());
        this.gameLayer.addChild(new BackgroundLayer(), 0 , TagOfLayer.Background);
        //Add Coins here
        this.gameLayer.addChild(new Coin(250, 1050));
        this.gameLayer.addChild(new Coin(650, 1050));
        this.gameLayer.addChild(new Coin(450, 250));
        this.gameLayer.addChild(new Coin(950, 650));
        this.gameLayer.addChild(new Coin(1050, 750));
        this.gameLayer.addChild(new Coin(1550, 450));
        this.gameLayer.addChild(new Coin(1350, 1050));
        this.gameLayer.addChild(new Coin(1550, 1250));
        this.gameLayer.addChild(new Coin(1550, 1350));
        this.gameLayer.addChild(new Coin(1750, 1350));
        this.gameLayer.addChild(new Enemy());
        //this.gameLayer.addChild(new ShadowLayer(), 0, TagOfLayer.Shadow);
        this.gameLayer.addChild(new Player(), 0 , TagOfLayer.Player);
        this.gameLayer.addChild(new StatusLayer(300, 200));
        this.addChild(this.gameLayer);
        this.scheduleUpdate();
    },
    update:function (dt) {
        // chipmunk step
        //this.space.step(dt);
        //var PlayerLayer = this.gameLayer.getChildByTag(TagOfLayer.Player);
        //cc.log(MW.PLAYER.x + " " + MW.PLAYER.y);
        //cc.log(MW.VIEWPORT.x + " " + MW.VIEWPORT.y);
        this.updateViewport();
    },
    updateViewport:function(){
        var winsize = cc.director.getWinSize();
        /*if(MW.PLAYER.x - MW.VIEWPORT.x < 10)
        {
            MW.VIEWPORT.x+=MW.VIEWPORT.speed;
        }
        else if(MW.PLAYER.x + MW.VIEWPORT.x > 1270)
        {
            MW.VIEWPORT.x-=MW.VIEWPORT.speed;
        }
        if(MW.PLAYER.y - MW.VIEWPORT.y < 10)
        {
            MW.VIEWPORT.y+=MW.VIEWPORT.speed;
        }
        else if(MW.PLAYER.y + MW.VIEWPORT.y > 710)
        {
            MW.VIEWPORT.y-=MW.VIEWPORT.speed;
        }*/
        MW.VIEWPORT.x = -MW.PLAYER.x + winsize.width/2;
        MW.VIEWPORT.y = -MW.PLAYER.y + winsize.height/2;
        this.gameLayer.setPosition(cc.p(MW.VIEWPORT.x,MW.VIEWPORT.y));
    }
});