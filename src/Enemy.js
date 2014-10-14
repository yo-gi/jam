var Enemy = cc.Scene.extend({
    onEnter:function () {
        this._super();
        MW.ENEMYd.push(0);
        MW.ENEMYd.push(0);
        MW.ENEMYd.push(0);
        this.addChild(new Enemy_01());
        this.addChild(new Enemy_02());
    }
});