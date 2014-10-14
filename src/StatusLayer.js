var StatusLayer = cc.Layer.extend({
    labelCoin:null,
    labelMeter:null,
    coins:0,

    ctor:function (inX, inY) {
        this._super();
        this.init();
        this.A = inX;
        this.B = inY;
        this.x = MW.PLAYER.x;
        this.y = MW.PLAYER.y;
    },
    update:function(dt){
        this.x = MW.PLAYER.x;
        this.y = MW.PLAYER.y;
        this.labelCoin.setString("Treasure: " + MW.COIN.TOTAL);
    },
    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();

        this.labelCoin = new cc.LabelTTF("Treasure: " + MW.COIN.TOTAL, "Helvetica", 20);
        this.labelCoin.setColor(cc.color(255, 255, 255));
        this.labelCoin.setPosition(cc.p(this.x + 300, this.y + 200));
        this.addChild(this.labelCoin);

        this.schedule(this.update);
    },
    addTreasure:function (num) {
        this.coins += num;
        this.labelCoin.setString("Coins:" + this.coins);
    },
});
