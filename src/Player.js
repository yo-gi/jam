var Player = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        //create the hero sprite
        var spriteRunner = new cc.Sprite(res.Player_png);
        spriteRunner.attr({x: 400, y: 300});
    }
});