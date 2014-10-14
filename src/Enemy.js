var Enemy = cc.Scene.extend({
    onEnter:function () {
        this._super();
        MW.ENEMYd.push(0);
        MW.ENEMYd.push(0);
        MW.ENEMYd.push(0);
        MW.ENEMYd.push(0);
        //(speed, startX, startY, endX, endY)
        this.addChild(new Enemy_01(80, 150, 450, 150, 1150));
        this.addChild(new Enemy_01(80, 1450, 1050, 1850, 1050));
        this.addChild(new Enemy_01(80, 1450, 850, 1450, 450));
        this.addChild(new Enemy_01(80, 1050, 350, 1050, 1150));
        //(ticksX, ticksY, startX, startY, endX, endY)
        this.addChild(new Enemy_02(50, 200, 550, 450, 450, 1050));
        this.addChild(new Enemy_02(300, 50, 550, 1450, 1250, 1350));
        this.addChild(new Enemy_02(200, 200, 1150, 950, 850, 550));
        this.addChild(new Enemy_02(200, 50, 450, 150, 850, 250));
        this.addChild(new Enemy_02(50, 50, 1750, 150, 1850, 250));
    }
});