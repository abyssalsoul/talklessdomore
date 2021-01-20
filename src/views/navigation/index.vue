<template>
  <div id="container"  v-on:click="play"></div>
</template>

<script>
import * as THREE from "three";
import { OceanBed } from "@/components/oceanbed.js";
import { AudioHandler } from "./../../components/audiohandler.js";
import { PostProcessing } from "./../../components/postprocessing.js";
import { Particles } from "./../../components/particles.js";

import Stats from "three/examples/jsm/libs/stats.module.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";

export default {
  name: "navigation",
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.container = document.getElementById("container");
      this.clock = new THREE.Clock();

      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );

      this.scene = new THREE.Scene();
      const color = new THREE.Color(0x000007);

      this.scene.background = color;
      this.scene.fog = new THREE.FogExp2(color, 0.0035);

      this.audio = new AudioHandler(this.camera, true);

      this.ground = new OceanBed(this.camera, this.scene);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.particles = new Particles(this.camera, this.scene, this.audio);
      this.postProcessing = new PostProcessing(this.camera,this. scene,this.renderer, true);
      //
      this.container.appendChild(this.renderer.domElement);

      this.controls = new FirstPersonControls(this.camera, this.renderer.domElement);
      // controls.movementSpeed = 50;
      // controls.lookSpeed = 0.05;
      this.controls.movementSpeed = 50;
      this.controls.lookSpeed = 0.05;

      this.stats = new Stats();
      this.container.appendChild(this.stats.dom);
      window.addEventListener("resize", onWindowResize, true);
      this.animate();

      function onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.controls.handleResize();
        this.postProcessing.onWindowResize();
      }
    },
    play: function (event) {
     if(!this.isplaying)
     {
      this.audio.play();
      this.isplaying = true;
     }
    },
    animate: function () {
      var vm = this.animate;
      
      requestAnimationFrame(vm);
      this.ground.animate(this.audio);
      this.render();
      this.stats.update();
    },
     render:function render() {
        this.controls.update(this.clock.getDelta());
        this.particles.render();
        this.renderer.render(this.scene, this.camera);
        this.postProcessing.render();
      }
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
