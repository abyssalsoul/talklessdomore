import * as THREE from "three";
let parameters, texture;

export class Particles {
  constructor(camera, scene, audio) {
    this.camera = camera;
    this.scene = scene;
    this.audio = audio;
    this.materials = [];
    this.init();
  }
  createParticle(canvas, audiodata) {
    canvas.width = 200;
    canvas.height = 200;
    var context = canvas.getContext("2d");
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var innerRadius = 10,
      outerRadius = 40,
      size = 80 ;
   

    var gradient = context.createRadialGradient(
      x,
      y,
      innerRadius,
      x,
      y,
      outerRadius
    );
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    var numberOfSides = 20,
      Xcenter = x,
      Ycenter = y;

    context.beginPath();
    context.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

    for (var i = 1; i <= numberOfSides; i += 1) {
      context.lineTo(
        Xcenter +
          size * Math.cos((i * 2 * Math.PI) / numberOfSides) +
          Math.random() * 20,
        Ycenter +
          size * Math.sin((i * 2 * Math.PI) / numberOfSides) +
          Math.random() * 20
      );
    }
    context.fillStyle = gradient;
    context.fill();
    return canvas;
  }
  init() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    this.canvas = document.createElement("canvas");
    texture = new THREE.CanvasTexture(this.createParticle(this.canvas, null));
    const particleCube = 10000;
    for (let i = 0; i < 1000; i++) {
      const x =
        this.camera.position.x + (Math.random() * particleCube + particleCube);
      const y =
        this.camera.position.y + (Math.random() * particleCube + particleCube);
      const z =
        this.camera.position.z + (Math.random() * particleCube + particleCube);

      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    parameters = [
      [new THREE.Color(0x3293ed), texture, 300], // BLEU
      [new THREE.Color(0xff0000), texture, 200], // BLEU
      [new THREE.Color(0x00FF00), texture, 400], // BLEU
    ];

    for (let i = 0; i < parameters.length; i++) {
      const color = parameters[i][0];
      const texture = parameters[i][1];
      const size = parameters[i][2];

      this.materials[i] = new THREE.PointsMaterial({
        size: size,
        map: texture,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        color: color,
      });

      const particles = new THREE.Points(geometry, this.materials[i]);
      particles.name = "particle_" + i;
      geometry.center();
      this.scene.add(particles);
    }
  }
  render() {
    const time = Date.now() * 0.00005;
    var audioData = this.audio.getAverageFrequency();
    this.createParticle(this.canvas, audioData);
    texture.needsUpdate = true;

    for (let i = 0; i < this.scene.children.length; i++) {
      const object = this.scene.children[i];

      if (object instanceof THREE.Points) {
        object.rotation.x = time * (i + 1);
        object.rotation.z = time * (i + 1);
      }
    }

    for (let i = 0; i < this.materials.length; i++) {
      const color = parameters[i][0];
      var hsl = new Object();
      color.getHSL(hsl);

      const l = audioData / 100 - 0.3;
      this.materials[i].color.setHSL(hsl.h, hsl.s, l);
    }
  }
}
