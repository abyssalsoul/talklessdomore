import * as THREE from "three";
let parameters;

export class Particles {
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.materials = [];
    this.init();
  }
  createParticle() {
    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    var context = canvas.getContext("2d");
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var innerRadius = 10,
      outerRadius = 50,
      radius = 60;

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

    //context.arc(x, y, radius, 0, 2 * Math.PI);
    // Add 2 color stops

    

    var numberOfSides = 10,
      size = 20,
      Xcenter = x,
      Ycenter = y;

    context.beginPath();
    context.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

    for (var i = 1; i <= numberOfSides; i += 1) {
      context.lineTo(
        Xcenter + size * Math.cos((i * 2 * Math.PI) / numberOfSides),
        Ycenter + size * Math.sin((i * 2 * Math.PI) / numberOfSides)
      );
    }
    context.fillStyle = gradient;
    context.fill(); 
    return canvas;
  }
  init() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    var particle = this.createParticle();

    const sprite = new THREE.CanvasTexture(particle);
    const particleCube = 10000;
    for (let i = 0; i < 10000; i++) {
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
      [new THREE.Color(0x3293ed), sprite, 100], // BLEU
      [new THREE.Color(0xff0000), sprite, 200], // BLEU
      [new THREE.Color(0x00ff00), sprite, 300], // BLEU
    ];

    for (let i = 0; i < parameters.length; i++) {
      const color = parameters[i][0];
      const sprite = parameters[i][1];
      const size = parameters[i][2];

      this.materials[i] = new THREE.PointsMaterial({
        size: size,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        color: color,
      });

      const particles = new THREE.Points(geometry, this.materials[i]);
      geometry.center();
      this.scene.add(particles);
    }
  }
  render() {
    const time = Date.now() * 0.00005;

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

      const l = ((100 * (hsl.l + time)) % 100) / 100;
      //this.materials[i].color.setHSL(hsl.h, hsl.s, l);
    }
  }
}
