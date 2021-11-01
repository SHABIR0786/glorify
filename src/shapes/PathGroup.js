import { fabric } from "fabric";
import roundPathCorners from './rounding.js'
export function starPolygonPoints(canvas,spikeCount, outerRadius, innerRadius) {
    var rot = (Math.PI / 2) * 3;
    var cx = outerRadius;
    var cy = outerRadius;
    var sweep = Math.PI / spikeCount;
    var FX= 0;
    var FY = 0;
    var lines = [];
    var line = null;
    var angle = 60;

    for (var i = 0; i < spikeCount; i++) {
        var x = (cx + Math.cos(angle) * outerRadius);
        var y = cy + Math.sin(angle) * outerRadius;
        line = makeLine([x2, y2, x, y]);
        lines.push(line);
        angle += sweep;
        console.log(angle);
        // var path = new fabric.Path(`M ${x} ${y} c 1 0 50 0}`, {fill: '', strokeWidth: 3, stroke: 'red'});
        // canvas.add(path);
        var x2 = cx + Math.cos(angle) * innerRadius;
        var y2 = cy + Math.sin(angle) * innerRadius;
        line = makeLine([x, y, x2, y2]);
        lines.push(line);
        if(i == 0){
            FX = x;
            FY = y;
        }
        if(i == (spikeCount - 1)){
            line = makeLine([x2, y2, FX, FY]);
            lines.push(line);
            }
        angle += sweep;
        // var path2 = new fabric.Path(`M ${x2} ${y2} q 1 0 50 0}`, {fill: '', strokeWidth: 3, stroke: 'red'});
        // canvas.add(path2);
    }
    return lines;
}
function makeLine(coords) {
    return new fabric.Line(coords, {
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        selectable: false,
        evented: false,
    });
}

export default function drawStarPolygon(canvas, fill, strokeWidth, stroke, cornerColor) {
    // make a star

    // var lines = starPolygonPoints(canvas,5, 50, 30);
    // console.log(lines);
    // canvas.add(...lines);
    // var canvas = new fabric.StaticCanvas('c');
    // var path = "M 0 0 L 400 0 L400 200 L 0 200 Z";
    var path = "M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118l11.547-1.2L16.026,0.6L20.388,10.918z";
    var newpath = roundPathCorners(path,30,false);
    console.log(newpath);
    var path = new fabric.Path(path, {
        left: 100,
        top: 100,
        stroke: 'red',
        strokeWidth: 1,
        fill: false
    });
    canvas.add(path);
    // var polygon = new fabric.Polygon(lines, 
    //     {
    //     left: 600,
    //     top: 30,
    //     fill: fill,
    //     strokeWidth: strokeWidth,
    //     stroke: stroke,
    //     strokeLineJoin: 'round',
    //     scaleX: 4,
    //     scaleY: 4,
    //     objectCaching: false,
    //     transparentCorners: false,
    //     cornerColor: cornerColor
    // }
    // { left: 120, top: 120, strokeLineJoin: 'round', strokeWidth: 20, stroke: 'black' }
    // );
    // canvas.viewportTransform = [0.7, 0, 0, 0.7, -50, 50];
    // canvas.add(polygon);
}