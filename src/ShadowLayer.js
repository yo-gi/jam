/*
var ShadowLayer = cc.Layer.extend({
    drawer:null,
    ctor:function(){
        this._super();
        this.drawer = cc.DrawNode.create();
        this.addChild(this.drawer, 10);
        this.scheduleUpdate();
    },
    update:function(){
        this.drawer.clear();
        this.drawer.drawCircle(cc.p(MW.PLAYER.x, MW.PLAYER.y), 600, 360, 20, false, 850, cc.color(0,0,0,100));
    }
});*/
var ShadowLayer = cc.Layer.extend({
    mainCoin:null,
    ctor:function () {
        this._super();
        this.init();
        this.x = MW.PLAYER.x;
        this.y = MW.PLAYER.y;
    },
    update:function(dt){
        this.x = MW.PLAYER.x;
        this.y = MW.PLAYER.y;
    },
    init:function () {
        this._super();
        this.mainOverlay = new cc.Sprite(res.black_png);
        this.addChild(this.mainOverlay);
        this.mainOverlay.setPosition(new cc.Point(this.x, this.y));
        this.schedule(this.update);
    }
});