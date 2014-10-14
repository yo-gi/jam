var MW = MW || {};
MW.KEYS = [];
MW.MOUSE = {};
MW.MOUSE.x = 0;
MW.MOUSE.y = 0;

MW.VIEWPORT = {};
MW.VIEWPORT.x = 0;
MW.VIEWPORT.y = 0;
MW.VIEWPORT.speed = 2;

MW.MAP = {};
MW.MAP.xextreme = 2000;
MW.MAP.yextreme = 1600;
MW.MAP.data = [];

MW.PLAYER = {};
MW.PLAYER.x = 0;
MW.PLAYER.y = 0;

MW.ENEMYd = [];

MW.SEGMENTS = [];
MW.RECTS = [];

var GameLayer = cc.Layer.extend({

    ctor:function(){
        this._super();
        this.init();
    },
    init:function () {
        // accept touch now!
        MW.KEYS = [];
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function (key, event) {
                MW.KEYS[key] = true;
            },
            onKeyReleased:function (key, event) {
                MW.KEYS[key] = false;
            }
        }, this);
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function(event){
                MW.MOUSE.x = event.getLocationX();
                MW.MOUSE.y = event.getLocationY();
                //cc.log("MousePosition X: " + event.getLocationX() + "  Y:" + event.getLocationY());
            }
        }, this);
    }
});
