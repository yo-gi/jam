var MW = MW || {};
MW.KEYS = [];
MW.MOUSE = {};
MW.MOUSE.x = 0;
MW.MOUSE.y = 0;
GX = 0;
GY = 0;

MW.PLAYER = {};
MW.PLAYER.x = 0;
MW.PLAYER.y = 0;

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
