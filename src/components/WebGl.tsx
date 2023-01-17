import React, { useEffect } from "react";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const WebGl = () => {
  useEffect(() => {
    // create a renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("threeCanvas") as HTMLCanvasElement,
      antialias: true,
    });
    // web gl background color
    // renderer.setClearColor("hsl(0,0%,95%)", 1);
    // document.body.appendChild(renderer.domElement);

    // set a camera
    const camera = new THREE.OrthographicCamera();
    // camera.position.set(4, 2, 2);
    // camera.lookAt(new THREE.Vector3());

    // setup camera controller
    // const controls = new OrbitControls(camera, renderer.domElement);

    // setup a scene
    const scene = new THREE.Scene();

    // Re-use the same Geometry across all our cubes
    const box = new THREE.BoxGeometry(1, 1, 1);

    function rando(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < 50; i++) {
      const mesh = new THREE.Mesh(
        box,
        new THREE.MeshStandardMaterial({
          color: getRandomColor(),
        })
      );
      mesh.position.set(rando(-1, 1), rando(-1, 1), rando(-1, 1));
      mesh.scale.set(rando(-1, 1), rando(-1, 1), rando(-1, 1));
      mesh.scale.multiplyScalar(0.5);
      scene.add(mesh);
    }

    scene.add(new THREE.AmbientLight("hsl(0, 0%, 20%)"));

    const light = new THREE.DirectionalLight("white", 1);
    light.position.set(0, 4, 4);
    scene.add(light);
    //
    const animate = () => {
      renderer.setPixelRatio(1);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 2.0;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());
      // Update camera properties
      camera.updateProjectionMatrix();

      scene.rotation.z += Math.sin(Math.PI / 180);
      // scene.rotation.y += Math.sin(Math.PI * 0.003);
      // scene.rotation.x += Math.sin(Math.PI * 0.001);
      renderer.render(scene, camera);

      window.requestAnimationFrame(animate);
      // controls.update();
    };

    animate();
  }, []);

  return (
    <div>
      <canvas id="threeCanvas" />
    </div>
  );
};

export default WebGl;
