import * as THREE from "three";

let composer;
let afterimagePass;

export class AudioHandler {
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
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    this.camera.add(listener);

    // create an Audio source
    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("../assets/sounds/theme.mp3", function(buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    });

    // create an AudioAnalyser, passing in the sound and desired fftSize
    const analyser = new THREE.AudioAnalyser(sound, 32);

    // get the average frequency of the sound
    const data = analyser.getAverageFrequency();
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
