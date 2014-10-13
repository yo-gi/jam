var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //add three layer in the right order
        this.addChild(new GameLayer());
        this.addChild(new BackgroundLayer());
        //Disable ShadowLayer to make the lines go away
        this.addChild(new Player());
        this.addChild(new ShadowLayer());

    }
});