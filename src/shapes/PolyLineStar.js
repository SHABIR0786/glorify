import { fabric } from "fabric";
export function starPolygonPoints(spikeCount, outerRadius, innerRadius) {
    var rot = (Math.PI / 2) * 3;
    var cx = outerRadius;
    var cy = outerRadius;
    var sweep = Math.PI / spikeCount;
    var points = [];
    var angle = 60;

    for (var i = 0; i < spikeCount; i++) {
        var x = (cx + Math.cos(angle) * outerRadius);
        var y = cy + Math.sin(angle) * outerRadius;
        points.push({ x: x, y: y });
        angle += sweep;
        x = cx + Math.cos(angle) * innerRadius;
        y = cy + Math.sin(angle) * innerRadius;
        points.push({ x: x, y: y});
        angle += sweep;
    }
    return points;
}
export default function drawStarPolygon(canvas, fill, strokeWidth, stroke, cornerColor) {
    // make a star
    var points = starPolygonPoints(5, 30, 50);
    var polygon = new fabric.Polyline(points, 
        {
        left: 600,
        top: 30,
        fill: fill,
        strokeWidth: strokeWidth,
        stroke: stroke,
        strokeLineJoin: 'round',
        scaleX: 4,
        scaleY: 4,
        objectCaching: false,
        transparentCorners: false,
        cornerColor: cornerColor
    }
    // { left: 120, top: 120, strokeLineJoin: 'round', strokeWidth: 20, stroke: 'black' }
    );
    canvas.viewportTransform = [0.7, 0, 0, 0.7, -50, 50];
    canvas.add(polygon);
}