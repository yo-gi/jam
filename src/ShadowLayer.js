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

var ShadowLayer = cc.Layer.extend({
    segments: null,
    points:null,
    uniquePoints:null,
    drawer:null,
    winSize: null,
    player: null,
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        // Load necessary constants
        this.winSize = cc.director.getWinSize();
        var winSize = this.winSize;

        // Shadow code
        this.loadSegments();
        this.points = (function(segments){
            var a = [];
            segments.forEach(function(seg){
                a.push(seg.a,seg.b);
            });
            return a;
        })(this.segments);
        this.uniquePoints = (function(points){
            var set = {};
            return points.filter(function(p){
                var key = p.x + "," + p.y;
                if(key in set){
                    return false;
                }else{
                    set[key]=true;
                    return true;
                }
            });
        })(this.points);
        this.drawer = cc.DrawNode.create();
        this.addChild(this.drawer, 1);
        this.schedule(this.update);
    },
    update: function(dt) {
        //cc.log(MW.MOUSE.x + ", " + MW.MOUSE.y);

        this.drawLines();
    },
    loadSegments: function() {
        this.segments = MW.SEGMENTS;
    },
    drawLines: function() {
        var player = {x: MW.PLAYER.x, y:MW.PLAYER.y};
        this.drawer.clear();

        var uniqueAngles = [];
        for (var j=0; j < this.uniquePoints.length; j++){
            var uniquePoint = this.uniquePoints[j];
            var angle = Math.atan2(uniquePoint.y-player.y,uniquePoint.x-player.x);
            uniquePoint.angle = angle;
            uniqueAngles.push(angle-0.00001,angle,angle+0.00001);
        }

        // RAYS IN ALL DIRECTIONS
        var intersects = [];
        for(var j=0;j<uniqueAngles.length;j++){
            var angle = uniqueAngles[j];
            // Calculate dx & dy from angle
            var dx = Math.cos(angle);
            var dy = Math.sin(angle);
            // Ray from center of screen to player
            var ray = {
                a:{x:player.x,y:player.y},
                b:{x:player.x+dx,y:player.y+dy}
            };
            // Find CLOSEST intersection
            var closestIntersect = null;
            for(var i=0;i<this.segments.length;i++){
                var intersect = getIntersection(ray,this.segments[i]);
                if(!intersect) continue;
                if(!closestIntersect || intersect.param<closestIntersect.param){
                    closestIntersect=intersect;
                }
            }
            // Intersect angle
            if(!closestIntersect) continue;
            closestIntersect.angle = angle;
            // Add to list of intersects
            intersects.push(closestIntersect);
        }
        intersects = intersects.sort(function(a,b){
            return a.angle-b.angle;
        });

        var ccIntersects = (function(intersects, draw) {
            var ret_val = [];
            var len = intersects.length;
            for (var i = 0; i < len-1; ++i) {
                draw.drawPoly([
                        cc.p(player.x, player.y),
                        cc.p(intersects[i].x|0, intersects[i].y|0),
                        cc.p(intersects[i+1].x|0, intersects[i+1].y|0)],
                    cc.color(123, 123, 250, 255),
                    1,
                    cc.color(255, 255, 255, 0));
                ret_val.push(cc.p(intersects[i].x|0, intersects[i].y|0));
            }
            draw.drawPoly([
                    cc.p(player.x, player.y),
                    cc.p(intersects[len-1].x|0, intersects[len-1].y|0),
                    cc.p(intersects[0].x|0, intersects[0].y|0)],
                cc.color(123, 123, 250, 255),
                1,
                cc.color(255, 255, 255, 0));
            ret_val.push(cc.p(intersects[i].x|0, intersects[i].y|0));

            return ret_val;
        }) (intersects, this.drawer);
        //console.log(ccIntersects);

    }
});