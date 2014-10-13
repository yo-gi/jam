var Coin = cc.Sprite.extend({
    mainCoin:null,
    ctor:function () {
        this._super();
        this.init();
        this.x = 650;
        this.y = 300;
    },
    update:function(dt){
    },
    init:function () {
        this._super();
        this.mainCoin = new cc.Sprite(res.coin_png);
        this.addChild(this.mainCoin);
        this.mainCoin.setPosition(new cc.Point(this.x,this.y));
        this.schedule(this.update);
    },
});