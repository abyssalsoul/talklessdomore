import * as THREE from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";

let mesh;
export class OceanBed {
  constructor(camera, scene) {
    const worldWidth = 256,
      worldDepth = 256;

    const data = this.generateHeight(worldWidth, worldDepth);
    //const bgColor = new THREE.Color(0x1c3659);
    const bgColor = new THREE.Color(0x3d6cb8);
    camera.position.set(100, 800, -800);
    camera.lookAt(-100, 810, -800);

    const geometry = new THREE.PlaneBufferGeometry(
      7500,
      7500,
      worldWidth - 1,
      worldDepth - 1
    );
    geometry.rotateX(-Math.PI / 2);

    const vertices = geometry.attributes.position.array;

    for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
      vertices[j + 1] = data[i] * 10;
    }

    // this.texture = new THREE.CanvasTexture(
    //   this.generateTexture(data, worldWidth, worldDepth)
    // );

    mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: bgColor,
        map: this.texture,
      })
    );
    scene.add(mesh);
  }

  generateHeight(width, height) {
    let seed = Math.PI / 4;
    window.Math.random = function() {
      const x = Math.sin(seed++) * 1000;
      return x - Math.floor(x);
    };

    const size = width * height,
      data = new Uint8Array(size);
    const perlin = new ImprovedNoise(),
      z = Math.random() * 100;

    let quality = 2;

    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < size; i++) {
        const x = i % width,
          y = ~~(i / width);
        data[i] += Math.abs(
          perlin.noise(x / quality, y / quality, z) * quality * 1.75
        );
      }

      quality *= 5;
    }

    return data;
  }

  generateTexture(data, width, height) {
    let context, image, imageData, shade;

    const vector3 = new THREE.Vector3(0, 0, 0);

    const sun = new THREE.Vector3(1, 1, 1);
    sun.normalize();

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");

    context.fillRect(0, 0, canvas.width, canvas.height);

    image = context.getImageData(0, 0, canvas.width, canvas.height);
    imageData = image.data;

    for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
      vector3.x = data[j - 2] - data[j + 2];
      vector3.y = 2;
      vector3.z = data[j - width * 2] - data[j + width * 2];
      vector3.normalize();

      shade = vector3.dot(sun);

      imageData[i] = shade * 43 * (0.5 + data[j] * 0.007);
      imageData[i + 1] = shade * 83 * (0.5 + data[j] * 0.007);
      imageData[i + 2] = shade * 138 * (0.5 + data[j] * 0.007);
    }

    context.putImageData(image, 0, 0);

    return canvas;
  }
  animate(audio) {
    const time = Date.now() * 0.00000001;
    const average = audio.getAverageFrequency() / 100;
    if (average == 0.0) return;
   
    for (
      let i = 0, j = 0, l = mesh.geometry.attributes.position.array.length;
      i < l;
      i++, j += 3
    ) {
      mesh.geometry.attributes.position.array[j + 1] += (Math.random() - 0.5) * average;
    }
    mesh.geometry.attributes.position.needsUpdate = true;
    /*  var color = new Object();
    mesh.material.color.getHSL(color);
   
    const l = Math.cos(((100 * (color.l + time)) % 100) / 100);
    console.log(l);
    mesh.material.color.setHSL(color.h, color.s, l); */
  }
}
