var Enemy = cc.Scene.extend({
    onEnter:function () {
        this._super();
        MW.ENEMYd.push(0);
        MW.ENEMYd.push(0);
        MW.ENEMYd.push(0);
        MW.ENEMYd.push(0);
        //(speed, startX, startY, endX, endY)
        this.addChild(new Enemy_01(240, 250 ,250 ,2150 ,750));
        this.addChild(new Enemy_01(140, 2050 ,2150 ,550 ,1450));
        this.addChild(new Enemy_01(140, 2250 ,450 ,250 ,2350));
        this.addChild(new Enemy_01(140, 1450 ,450 ,2850 ,850));
        this.addChild(new Enemy_01(140, 2950 ,250 ,1950 ,750));
        this.addChild(new Enemy_01(240, 250 ,250 ,2150 ,950));
        this.addChild(new Enemy_01(140, 250 ,150 ,2950 ,350));
        this.addChild(new Enemy_01(140, 2150 ,2050 ,350 ,2550));
        this.addChild(new Enemy_01(140, 1950 ,1650 ,2250 ,550));
/*        this.addChild(new Enemy_01(80, 1050, 250, 250, 250));
        this.addChild(new Enemy_01(80, 2750, 150, 3850, 150));
        this.addChild(new Enemy_01(80, 2850, 350, 2550, 350));
        this.addChild(new Enemy_01(80, 2950, 1350, 2950, 550));
        this.addChild(new Enemy_01(80, 3250, 350, 3250, 1050));
        this.addChild(new Enemy_01(80, 3450, 1150, 3450, 650));
        this.addChild(new Enemy_01(80, 3750, 550, 3750, 1150));
        this.addChild(new Enemy_01(80, 3150, 1350, 3550, 1350));
        this.addChild(new Enemy_01(80, 3250, 1550, 3750, 1550));
        this.addChild(new Enemy_01(80, 250, 250, 1050, 250));*/
        //(ticksX, ticksY, startX, startY, endX, endY)
/*        this.addChild(new Enemy_02(50, 200, 550, 450, 450, 1050));*/
/*        this.addChild(new Enemy_02(50, 150, 750, 1050, 850, 1350));
        this.addChild(new Enemy_02(50, 150, 750, 1050, 850, 1350));*/
        this.addChild(new Enemy_02(200, 50, 150, 250, 550, 450));
        this.addChild(new Enemy_02(50, 250, 250, 350, 450, 950));
        this.addChild(new Enemy_02(250, 350, 350, 1750, 950, 2550));
        this.addChild(new Enemy_02(350, 350, 650, 2150, 250, 3250));
        this.addChild(new Enemy_02(250, 250, 150, 250, 850, 350));
        this.addChild(new Enemy_02(250, 250, 450, 150, 550, 350));
        this.addChild(new Enemy_02(550, 550, 2150, 1550, 350, 3250));
        this.addChild(new Enemy_02(450, 350, 1550, 3250, 50, 550));
        this.addChild(new Enemy_02(250, 150, 50, 50, 50, 50));
        this.addChild(new Enemy_02(550, 550, 2250, 2150, 1150, 2150));
        this.addChild(new Enemy_02(350, 1050, 150, 2950, 1850, 950));
        this.addChild(new Enemy_02(250, 450, 2350, 350, 550, 1850));
        this.addChild(new Enemy_02(350, 450, 450, 150, 950, 650));
    }
});