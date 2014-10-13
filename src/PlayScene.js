var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //add three layer in the right order
        this.addChild(new GameLayer());
        this.addChild(new BackgroundLayer());
        this.addChild(new ShadowLayer());
        this.addChild(new Player());
    }
});