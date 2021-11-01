import { fabric } from "fabric";
export function starPolygonPoints(canvas, spikeCount, outerRadius, innerRadius) {
    canvas = document.querySelectorAll('canvas')[0];
    var ctx = canvas.getContext('2d');
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
        var x2 = cx + Math.cos(angle) * innerRadius;
        var y2 = cy + Math.sin(angle) * innerRadius;
        points.push({ x: x2, y: y2 });
        angle += sweep;
        console.log(ctx);
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.moveTo(200, 20);
        ctx.arcTo(200, 130, 50, 20, 40);
        ctx.stroke();
    }

    return points;
}

export default function drawStarPolygon(canvas, fill, strokeWidth, stroke, cornerColor) {
    // make a star
    var points = starPolygonPoints(canvas, 5, 30, 20);
    var polygon = new fabric.Polygon(points,
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
    );
    canvas.viewportTransform = [0.7, 0, 0, 0.7, -50, 50];
    canvas.add(polygon);
}