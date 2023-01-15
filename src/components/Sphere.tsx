import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

const width = window.innerWidth;
const height = window.innerHeight;

const Sphere = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    camera.position.z = 96;
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("threeCanvas") as HTMLCanvasElement,
      antialias: true,
    });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xfffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xfffffff, 0.5);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(cube);


    const controls =  new OrbitControls(camera, renderer.domElement)

    const stats =  Stats()
    document.body.appendChild(stats.dom);

    const animate = () => {
      renderer.render(scene, camera);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      stats.update()
      controls.update()
      window.requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div>
      <canvas id="threeCanvas" />
    </div>
  );
};

export default Sphere;

