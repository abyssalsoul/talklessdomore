<template>
  <canvas id="c"></canvas>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import fragmentShader from "../shaders/logic.glsl";
import vertexShader from "../shaders/vertex1.vert";
let scene;
let camera;
let renderer;
let plane;
let controls;

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
        -100, // left
        100, // right
        100, // top
        -100, // bottom
        -100, // near,
        100 // far
      );
      scene = new THREE.Scene();
      plane = new THREE.PlaneBufferGeometry(200, 200);

      /*  const uniforms = {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector3() },
        };
        console.log(fragmentShader);
        const material = new THREE.ShaderMaterial({
          fragmentShader,
          uniforms,
        }); */

      /* const uniforms = {
        iGlobalTime: {
          type: "f",
          value: 1.0,
        },
        iResolution: {
          type: "v2",
          value: new THREE.Vector2(),
        },
      };
      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      }); */

      const uniforms = {
        iTime: {
          type: "f",
          value: 1.0,
        },
         iMouse: {
          type: "f",
          value: 1.0,
        },
        iResolution: {
          type: "v2",
          value: new THREE.Vector2(),
        },
      };
      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fragmentShader,
      });

      scene.add(new THREE.Mesh(plane, material));

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.autoRotate = true;

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
        controls.update();
        requestAnimationFrame(render);
      }

      requestAnimationFrame(render);
    },
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
