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
MW.MAP.xextreme = 1000;
MW.MAP.yextreme = 800;

MW.PLAYER = {};
MW.PLAYER.x = 0;
MW.PLAYER.y = 0;

MW.SEGMENTS = [];

var GameLayer = cc.Layer.extend({

    ctor:function(){
        this._super();
        this.init();
    },
    init:function () {
        // accept touch now!

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
                //var str = "MousePosition X: " + event.getLocationX() + "  Y:" + event.getLocationY();
                //cc.log(str);
            }
        }, this);
    }
});
