var PlayScene = cc.Scene.extend({
    gameLayer:null,
    /*onEnter:function () {
        this._super();

        this.addChild(new GameLayer());
        this.addChild(new BackgroundLayer());
        //this.addChild(new ShadowLayer());
        this.addChild(new Enemy_01());
        this.addChild(new Player());

        this.scheduleUpdate();
    },*/
    onEnter:function () {
        this._super();
        //add three layer in the right order
        this.gameLayer = new cc.Layer();
        this.gameLayer.addChild(new GameLayer());
        this.gameLayer.addChild(new BackgroundLayer(), 0, TagOfLayer.Background);
        this.gameLayer.addChild(new ShadowLayer());
        //this.gameLayer.addChild(new Enemy_01());
        this.gameLayer.addChild(new Player(), 0, TagOfLayer.Player);
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