var Enemy = cc.Scene.extend({
    onEnter:function () {
        this._super();
        MW.ENEMYd.push(0);
        MW.ENEMYd.push(0);
        MW.ENEMYd.push(0);
        MW.ENEMYd.push(0);
        this.addChild(new Enemy_01(80, 100, 600, 500, 600));
        this.addChild(new Enemy_01(80, 100, 400, 500, 200));
        this.addChild(new Enemy_02(600, 70, 100, 400, 340));
        this.addChild(new Enemy_02(600, 420, 50, 730, 310));
    }
});