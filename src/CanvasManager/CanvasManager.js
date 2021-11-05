import Vue from "vue";
import { fabric } from "fabric";
import drawStarPolygon from "../shapes/StartPolygon"

import Edit from "./Edit";
export const CanvasManager = new Vue({
    name: "CanvasManager",
    data() {
        return {
            canvas: null
        };
    },
    methods: {
        InitialCanvas: function () {
            this.canvas = new fabric.Canvas("myCanvas");
        },
        drawStarPolygon: function () {
            drawStarPolygon(this.canvas, '#dcdcdc', 1, '#19B5FE', '#22A7F0');
        },
        editPolygon: function () {
            Edit(this.canvas);
        }
    }
});