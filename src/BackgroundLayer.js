var BackgroundLayer = cc.Layer.extend({
    segments: null,
    points:null,
    uniquePoints:null,
    winSize: null,
    map:null,
    mapWidth:0,
    mapIndex:0,
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        // Load necessary constants
        this.winSize = cc.director.getWinSize();

        this.loadSegments();
        this.loadMap(map02);
        //this.schedule(this.update);
    },
    update: function(dt) {
        //this.drawLines(Math.floor(Math.random() * 400) + 1, Math.floor(Math.random() * 400) + 1);
    },
    loadMap: function(newMap) {
        var draw = cc.DrawNode.create();
        this.addChild(draw, 10);
        console.log(newMap);
        MW.MAP.data = [];
        var data = newMap['layers'][1]['data'];
        var height = newMap['height'];
        var width = newMap['width'];
        var tileWidth = newMap['tilewidth'];
        for (var i = 0; i < width; ++i) {
            for (var j = 0; j < height; ++j) {
                var key = data[i * width + j];
                var sprite = new cc.Sprite(newMap.keyMap[key]);
                var x = i * tileWidth, y = j * tileWidth;
                sprite.setPosition(cc.p(x, y));
                sprite.setAnchorPoint(cc.p(0, 0));
                sprite._setWidth(tileWidth);
                sprite._setHeight(tileWidth);
                sprite.collideKey = key;
                this.addChild(sprite);
                MW.MAP.data.push(sprite);
            }
        }
    },
    loadSegments: function() {
        //corner segments
        MW.SEGMENTS.push({a: {x: 0, y: 0}, b:{x: 0, y:MW.MAP.yextreme}});
        MW.SEGMENTS.push({a: {x: 0, y: 0}, b:{x: MW.MAP.xextreme, y:0}});
        MW.SEGMENTS.push({a: {x: MW.MAP.xextreme, y: MW.MAP.yextreme}, b:{x: 0, y:MW.MAP.yextreme}});
        MW.SEGMENTS.push({a: {x: MW.MAP.xextreme, y: MW.MAP.yextreme}, b:{x: MW.MAP.xextreme, y:0}});
    }
});