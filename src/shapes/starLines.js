import { fabric } from "fabric";
export function starPolygonPoints(spikeCount, outerRadius, innerRadius) {
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
        if (i > 0) {
            line = makeLine([x2, y2, x, y]);
            lines.push(line);
        }
        angle += sweep;
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
    var lines = starPolygonPoints(15, 150, 130);
    canvas.add(...lines);

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