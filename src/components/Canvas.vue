
<template>
  <div>
    <canvas id="myCanvas" height="400" width="1000"
      >Your browser does not support canvas.</canvas>
      <br />
    <button @click="Edit()" class="button-3" role="button">Edit</button>
  </div>
</template>
<script>
import {CanvasManager} from '../CanvasManager/CanvasManager'
export default {
  name: "Canvas",
  data() {
    return {
      editFunc: null,
    };
  },
  methods: {
    Edit() {
      CanvasManager.editPolygon();
    },
  },
  mounted() {
      CanvasManager.InitialCanvas();
      CanvasManager.drawStarPolygon();
  },
};
</script>
<style scoped>
#myCanvas {
  border: 1px solid black;
  /* width: 100%; */
  /* display: block; */
}

/* CSS */
.button-3 {
  /* margin-top: 5px; */
  width: 100px;
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.button-3:hover {
  background-color: #2c974b;
}

.button-3:focus {
  box-shadow: rgba(46, 164, 79, 0.4) 0 0 0 3px;
  outline: none;
}

.button-3:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, 0.1);
  color: rgba(255, 255, 255, 0.8);
  cursor: default;
}

.button-3:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
}
</style>