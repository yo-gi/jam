var Enemy = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new Enemy_01());
        this.addChild(new Enemy_02());
    }
});