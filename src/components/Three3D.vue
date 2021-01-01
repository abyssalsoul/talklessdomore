<template>
  <canvas id="c"></canvas>
</template>

<script>
 import * as THREE from "three";
 import fragmentShader from "../shaders/logic.glsl";
let scene;
let camera;
let renderer;
let plane;
let sceneObjects = [];

export default {
  name: "Three3d",
  data() {
    return {
      aspect: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
        const canvas = document.querySelector("#c");
        renderer = new THREE.WebGLRenderer({ canvas });
        renderer.autoClearColor = false;

        camera = new THREE.OrthographicCamera(
          -1, // left
          1, // right
          1, // top
          -1, // bottom
          -1, // near,
          1 // far
        );
        scene = new THREE.Scene();
        plane = new THREE.PlaneBufferGeometry(2, 2);
         
        const uniforms = {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector3() },
        };
        console.log(fragmentShader);
        const material = new THREE.ShaderMaterial({
          fragmentShader,
          uniforms,
        });
        scene.add(new THREE.Mesh(plane, material));

        function resizeRendererToDisplaySize(renderer) {
          const canvas = renderer.domElement;
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          const needResize = canvas.width !== width || canvas.height !== height;
          if (needResize) {
            renderer.setSize(width, height, false);
          }
          return needResize;
        }

        function render(time) {
          time *= 0.001; // convert to seconds

          resizeRendererToDisplaySize(renderer);

          const canvas = renderer.domElement;
          uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
          uniforms.iTime.value = time;

          renderer.render(scene, camera);

          requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
      }
  },
};
</script>

<style lang="scss" scoped>
#c {
  width: 100%;
  height: 100%;
  display: block;
}

</style>
