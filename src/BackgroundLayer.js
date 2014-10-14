function getIntersection(ray, segment) {
    // RAY in parametric: Point + Delta*T1
    var r_px = ray.a.x;
    var r_py = ray.a.y;
    var r_dx = ray.b.x-ray.a.x;
    var r_dy = ray.b.y-ray.a.y;

    // SEGMENT in parametric: Point + Delta*T2
    var s_px = segment.a.x;
    var s_py = segment.a.y;
    var s_dx = segment.b.x-segment.a.x;
    var s_dy = segment.b.y-segment.a.y;

    // Are they parallel? If so, no intersect
    var r_mag = Math.sqrt(r_dx * r_dx + r_dy * r_dy);
    var s_mag = Math.sqrt(s_dx * s_dx + s_dy * s_dy);

    if(r_dx/r_mag == s_dx/s_mag && r_dy/r_mag == s_dy/s_mag) {
        // Unit vectors are the same.
        return null;
    }

    // SOLVE FOR T1 & T2
    // r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
    // ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
    // ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
    // ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)

    var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
    var T1 = (s_px+s_dx*T2-r_px)/r_dx;

    // Must be within parametic whatevers for RAY/SEGMENT
    if(T1 < 0) return null;
    if(T2 < 0 || T2 > 1) return null;

    // Return the POINT OF INTERSECTION
    return {
        x: r_px + (r_dx * T1),
        y: r_py + (r_dy * T1),
        param: T1
    };
}

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
        this.loadMap();
        //this.schedule(this.update);
    },
    update: function(dt) {
        //this.drawLines(Math.floor(Math.random() * 400) + 1, Math.floor(Math.random() * 400) + 1);
    },
    loadMap: function() {
        this.map = [];
        console.log(map01);
        var data = map01['layers'][0]['data'];
        var height = map01['height'];
        var tileWidth = map01['tilewidth'];
        console.log(data);
        for (var i = 0; i < height; ++i) {
            for (var j = 0; j < height; ++j) {
                //console.log(map01.keyMap[data[i * height + j]]);
                var key = data[i * height + j];
                if (key != 1) continue;
                var sprite = new cc.Sprite(map01.keyMap[key]);
                var x = i * tileWidth, y = j * tileWidth;
                sprite.setPosition(cc.p(x, y));
                sprite.setAnchorPoint(cc.p(0, 0));
                sprite.collideRect = function() {
                    return cc.rect(x, y, tileWidth, tileWidth);
                };
                this.addChild(sprite);
                this.map.push(sprite);
                if (key == 1) {
                    this.loadSegment(x, y, tileWidth);
                }
            }
        }
    },
    loadSegment: function(x, y, width) {
        MW.SEGMENTS.push({a: {x: x, y: y}, b:{x: x, y:y+width}});
        MW.SEGMENTS.push({a: {x: x, y: y}, b:{x: x+width, y:y}});
        MW.SEGMENTS.push({a: {x: x+width, y:y+width}, b:{x: x, y:y+width}});
        MW.SEGMENTS.push({a: {x: x+width, y:y+width}, b:{x: x+width, y:y}});
    },
    loadSegments: function() {
        // Map segments
        /*for (var j = 0; j < map01.length; ++j) {
            var base = map01[j][0];
            var points = map01[j][1];
            for (var i = 0; i < points.length - 1; ++i) {
                var x1, x2, y1, y2;
                x1 = base.x + points[i].x;
                y1 = base.y + points[i].y;
                x2 = base.x + points[i+1].x;
                y2 = base.y + points[i+1].y;
                var point = {a:{x:x1, y:y1}, b:{x:x2, y:y2}};
                MW.SEGMENTS.push(point);
            }
            x1 = base.x + points[points.length-1].x;
            y1 = base.y + points[points.length-1].y;
            x2 = base.x + points[0].x;
            y2 = base.y + points[0].y;
            var point = {a:{x:x1, y:y1}, b:{x:x2, y:y2}};
            MW.SEGMENTS.push(point);
        }*/

        //corner segments
        MW.SEGMENTS.push({a: {x: 0, y: 0}, b:{x: 0, y:MW.MAP.yextreme}});
        MW.SEGMENTS.push({a: {x: 0, y: 0}, b:{x: MW.MAP.xextreme, y:0}});
        MW.SEGMENTS.push({a: {x: MW.MAP.xextreme, y: MW.MAP.yextreme}, b:{x: 0, y:MW.MAP.yextreme}});
        MW.SEGMENTS.push({a: {x: MW.MAP.xextreme, y: MW.MAP.yextreme}, b:{x: MW.MAP.xextreme, y:0}});
    }
});