var MW = MW || {};
MW.KEYS = [];

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
    }
/*

        if ('mouse' in cc.sys.capabilities)
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseMove: function(event){
                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
                        event.getCurrentTarget().processEvent(event);
                }
            }, this);

        if (cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                prevTouchId: -1,
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMoved:function (touches, event) {
                    var touch = touches[0];
                    if (this.prevTouchId != touch.getId())
                        this.prevTouchId = touch.getId();
                    else event.getCurrentTarget().processEvent(touches[0]);
                }
            }, this);
        }
*/
});
