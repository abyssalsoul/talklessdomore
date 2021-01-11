import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { HorizontalBlurShader } from "three/examples/jsm/shaders/HorizontalBlurShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

let composer;
let afterimagePass;

export class PostProcessing {
  constructor(camera, scene, renderer, enabled) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.enabled = enabled;
    this.init();
  }
  init() {
    if (!this.enabled) {
      return;
    }

    // postprocessing
    composer = new EffectComposer(this.renderer);
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    afterimagePass = new AfterimagePass(0.7);

    const width = 2 / (window.innerWidth || 2 / 2);
    const effectHBlur = new ShaderPass(HorizontalBlurShader);
    effectHBlur.uniforms["h"].value = width;

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.0,
      0.0
    );
    this.renderer.toneMappingExposure = Math.pow(1.0, 4.0);
    composer.addPass(new RenderPass(this.scene, this.camera));
    composer.addPass(afterimagePass);
    composer.addPass(effectHBlur);
    composer.addPass(bloomPass);
  }

  onWindowResize() {
    if (!this.enabled) {
      return;
    }
    composer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    if (!this.enabled) {
      return;
    }
    composer.render();
  }
}
