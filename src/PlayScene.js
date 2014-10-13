var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //add three layer in the right order
        this.addChild(new GameLayer());
        this.addChild(new BackgroundLayer());
        //Disable ShadowLayer to make the lines go away
        //this.addChild(new ShadowLayer());
        this.addChild(new Enemy_01());
        this.addChild(new Enemy_02());
        this.addChild(new Player());
    }
});