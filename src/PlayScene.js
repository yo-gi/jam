var PlayScene = cc.Scene.extend({
    space:null,
    onEnter:function () {
        this._super();
        this.initPhysics();

        this.addChild(new GameLayer());
        this.addChild(new BackgroundLayer(this.space));
        this.addChild(new ShadowLayer());
        this.addChild(new Enemy_01());
        this.addChild(new Player(this.space));

        this.scheduleUpdate();
    },
    initPhysics: function() {
        var winSize = cc.director.getWinSize();

        this.space = new cp.Space();

        //2. setup the  Gravity
        this.space.gravity = cp.v(0, 0);
        this.space.collisionSlop = 0;
    },
    update:function (dt) {
        // chipmunk step
        this.space.step(dt);
    }
});