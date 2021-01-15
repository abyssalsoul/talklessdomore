<template>
  <div id="container"></div>
  </template>

<script>
import * as THREE from "three";
import { OceanBed } from "./js/OceanBed.js";
import { PostProcessing } from "./js/PostProcessing.js";
import { Particles } from "./js/Particles.js";
import {AudioHandler} from "./js/AudioHandler.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
let container, stats;
let camera, controls, scene, renderer, postProcessing, particles;

export default {
  name: "Three3D",
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      container = document.getElementById("container");
      const clock = new THREE.Clock();

      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );

      scene = new THREE.Scene();
      const color = new THREE.Color(0x000007);
      
      scene.background = color;
     scene.fog = new THREE.FogExp2(color, 0.0035);

      var ground = new OceanBed(camera, scene);
      var audio = new AudioHandler(camera, scene, renderer, true);
 
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      particles = new Particles(camera, scene);
      postProcessing = new PostProcessing(camera, scene, renderer, true);
      //
      container.appendChild(renderer.domElement);

      controls = new FirstPersonControls(camera, renderer.domElement);
      // controls.movementSpeed = 50;
      // controls.lookSpeed = 0.05;
      controls.movementSpeed = 50;
      controls.lookSpeed = 0.05;

      stats = new Stats();
      container.appendChild(stats.dom);
      window.addEventListener("resize", onWindowResize, true);
      animate();

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls.handleResize();
        postProcessing.onWindowResize();
      }
      function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
      }

      function render() {
        controls.update(clock.getDelta());
        particles.render();
        renderer.render(scene, camera);
        
        postProcessing.render();
      }
    },
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
