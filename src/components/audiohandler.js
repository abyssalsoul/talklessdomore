import * as THREE from "three";

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
    
    this.audioPath = require("@/assets/sounds/theme.mp3");
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    this.camera.add(listener);

    // create an Audio source
    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(this.audioPath, function(buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.2);
      sound.play();
    });

    // create an AudioAnalyser, passing in the sound and desired fftSize
    const analyser = new THREE.AudioAnalyser(sound, 32);

    // get the average frequency of the sound
    const data = analyser.getAverageFrequency();
  }
}
