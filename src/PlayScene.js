var PlayScene = cc.Scene.extend({
    space:null,
    onEnter:function () {
        this._super();

        this.addChild(new GameLayer());
        this.addChild(new BackgroundLayer());
        this.addChild(new ShadowLayer());
        this.addChild(new Enemy_01());
        this.addChild(new Player());

        this.scheduleUpdate();
    },
    update:function (dt) {
    }
});