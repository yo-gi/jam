var Coin = cc.Sprite.extend({
    mainCoin:null,
    ctor:function (X, Y) {
        this._super();
        this.init();
        this.x = X;
        this.y = Y;
        this.visited = 0;
        this.distanceToPlayer = 0;
    },
    update:function(dt){
        this.distanceToPlayer = Math.sqrt((MW.PLAYER.x-this.x) * (MW.PLAYER.x-this.x) + (MW.PLAYER.y-this.y) * (MW.PLAYER.y-this.y));
        if(this.distanceToPlayer < 40)
        {
            if(this.visited == 0)
            {
                this.visited = 1;
                MW.COIN.TOTAL++;
                cc.log(MW.COIN.TOTAL);
                this.removeAllChildren();
                this.mainCoin = null;

            }
        }
    },
    init:function () {
        this._super();
        this.mainCoin = new cc.Sprite(res.coin_png);
        this.addChild(this.mainCoin);
        this.mainCoin.setPosition(new cc.Point(this.x,this.y));
        this.schedule(this.update);
    },
});