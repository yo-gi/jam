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
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        // Load necessary constants
        this.winSize = cc.director.getWinSize();

        this.loadSegments();
        this.drawPolygons();
        this.schedule(this.update);
    },
    update: function(dt) {
        //this.drawLines(Math.floor(Math.random() * 400) + 1, Math.floor(Math.random() * 400) + 1);
    },
    loadSegments: function() {
        this.segments = [
            {a:{x:0,y:0}, b:{x:640,y:0}},
            {a:{x:640,y:0}, b:{x:640,y:360}},
            {a:{x:640,y:360}, b:{x:0,y:360}},
            {a:{x:0,y:360}, b:{x:0,y:0}},
            // Polygon #1
            {a:{x:100,y:150}, b:{x:120,y:50}},
            {a:{x:120,y:50}, b:{x:200,y:80}},
            {a:{x:200,y:80}, b:{x:140,y:210}},
            {a:{x:140,y:210}, b:{x:100,y:150}},
            // Polygon #2
            {a:{x:100,y:200}, b:{x:120,y:250}},
            {a:{x:120,y:250}, b:{x:60,y:300}},
            {a:{x:60,y:300}, b:{x:100,y:200}},
            // Polygon #3
            {a:{x:200,y:260}, b:{x:220,y:150}},
            {a:{x:220,y:150}, b:{x:300,y:200}},
            {a:{x:300,y:200}, b:{x:350,y:320}},
            {a:{x:350,y:320}, b:{x:200,y:260}},
            // Polygon #4
            {a:{x:340,y:60}, b:{x:360,y:40}},
            {a:{x:360,y:40}, b:{x:370,y:70}},
            {a:{x:370,y:70}, b:{x:340,y:60}},
            // Polygon #5
            {a:{x:450,y:190}, b:{x:560,y:170}},
            {a:{x:560,y:170}, b:{x:540,y:270}},
            {a:{x:540,y:270}, b:{x:430,y:290}},
            {a:{x:430,y:290}, b:{x:450,y:190}},
            // Polygon #6
            {a:{x:400,y:95}, b:{x:580,y:50}},
            {a:{x:580,y:50}, b:{x:480,y:150}},
            {a:{x:480,y:150}, b:{x:400,y:95}}
        ]
    },
    drawPolygons: function() {
        var winSize = this.winSize;
        var draw = cc.DrawNode.create();
        this.addChild( draw, 1 );

        draw.drawRect(
            cc.p(2, 2),
            cc.p(winSize.width-2, winSize.height-2),
            cc.color(0, 0, 0, 255),
            1,
            cc.color(120, 120, 120, 255)
        );

        for (var i = 0; i < this.segments.length; ++i) {
            var segment = this.segments[i];
            //cc.log(segment.a.x + ", " + segment.a.y);

            draw.drawSegment(
                cc.p(segment.a.x, segment.a.y),
                cc.p(segment.b.x, segment.b.y),
                1,
                cc.color(255, 255, 255, 255)
            );
        }
    }
});