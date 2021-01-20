import * as THREE from "three";
let sound, audioLoader, analyser;
export class AudioHandler {
  constructor(camera, enabled) {
    this.camera = camera;

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
    sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    audioLoader = new THREE.AudioLoader();
    

    // create an AudioAnalyser, passing in the sound and desired fftSize
    analyser = new THREE.AudioAnalyser(sound, 32);
  }
  play() {
    audioLoader.load(this.audioPath, function(buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.2);
      sound.play();
    });
  }
  getAverageFrequency() {
    return analyser.getAverageFrequency();
  }

  getFrequencyData() {
    return analyser.getFrequencyData();
  }
}
