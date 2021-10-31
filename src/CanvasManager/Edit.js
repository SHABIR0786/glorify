import { fabric } from "fabric";
import { starPolygonPoints } from '../shapes/StartPolygon'
var globalcanvas = null;
export default function Edit(canvas) {
    globalcanvas = canvas;
    // clone what are you copying since you
    // may want copy and paste on different moment.
    var poly = canvas.getObjects()[0];
    canvas.setActiveObject(poly);
    poly.edit = !poly.edit;
    if (poly.edit) {
        var lastControl = poly.points.length - 1;
        poly.cornerStyle = 'circle';
        poly.cornerColor = 'rgba(0,0,255,0.5)';
        poly.controls = poly.points.reduce(function (acc, point, index) {
            if (index > 2 && index < 5) {
                acc['p' + index] = new fabric.Control({
                    positionHandler: polygonPositionHandler,
                    actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                    actionName: 'modifyPolygon',
                    pointIndex: index
                });
            }
            return acc;
        }, {});
    } else {
        poly.cornerColor = 'blue';
        poly.cornerStyle = 'rect';
        poly.controls = fabric.Object.prototype.controls;
    }
    poly.hasBorders = !poly.edit;
    canvas.renderAll();
}
// define a function that can keep the polygon in the same position when we change its
// width/height/top/left.
function anchorWrapper(anchorIndex, fn) {
    // console.log(anchorIndex,fn);
    return function (eventData, transform, x, y) {
        var fabricObject = transform.target,
            absolutePoint = fabric.util.transformPoint({
                x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
                y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
            }, fabricObject.calcTransformMatrix()),
            actionPerformed = fn(eventData, transform, x, y),
            newDim = fabricObject._setPositionDimensions({}),
            polygonBaseSize = fabricObject._getNonTransformedDimensions(),
            newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
            newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        return actionPerformed;
    }
}
var lastValueX = 30; 
var lastValueY = 5;
// define a function that will define what the control does
// this function will be called on every mouse move after a control has been
// clicked and is being dragged.
// The function receive as argument the mouse event, the current trasnform object
// and the current position in canvas coordinate
// transform.target is a reference to the current object being transformed,
function actionHandler(eventData, transform, x, y) {
    var polygon = transform.target,
        currentControl = polygon.controls[polygon.__corner],
        mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
        polygonBaseSize = polygon._getNonTransformedDimensions(),
        size = polygon._getTransformedDimensions(0, 0),
        finalPointPosition = {
            x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
            y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
        };
    var points = null;
    if (currentControl.pointIndex == 3) {
        var innerPosition = mouseLocalPosition.x / 2.4;
        if (Math.abs(innerPosition) > 5 && Math.abs(innerPosition) < 40) {
            lastValueX = Math.abs(innerPosition);
            points = starPolygonPoints(lastValueY, 50,lastValueX);
        }
    } else if (currentControl.pointIndex != 3) {

        if (Math.abs(mouseLocalPosition.y / 10) > 3 && Math.abs(mouseLocalPosition.y / 10) < 30) {
            lastValueY = Math.trunc(Math.abs(mouseLocalPosition.y / 10));
            points = starPolygonPoints(lastValueY, 50, lastValueX);
        }
    }
    if (points) {
        polygon.set({
            points: points
        });
        polygon.setCoords();
        globalcanvas.renderAll();
        globalcanvas.requestRenderAll();
    }
    return true;
}

// define a function that can locate the controls.
// this function will be used both for drawing and for interaction.
function polygonPositionHandler(dim, finalMatrix, fabricObject) {
    var x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x),
        y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
    return fabric.util.transformPoint(
        { x: x, y: y },
        fabric.util.multiplyTransformMatrices(
            fabricObject.canvas.viewportTransform,
            fabricObject.calcTransformMatrix()
        )
    );
}
