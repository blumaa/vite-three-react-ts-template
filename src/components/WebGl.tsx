import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const width = window.innerWidth;
const height = window.innerHeight;

const WebGl = () => {
  useEffect(() => {
    // create a renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("threeCanvas") as HTMLCanvasElement,
      antialias: true,
    });
    // web gl background color
    renderer.setClearColor("hsl(0,0%,95%)", 1);
    document.body.appendChild(renderer.domElement);

    // set a camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
    camera.position.set(4, 2, 2);
    camera.lookAt(new THREE.Vector3());

    // setup camera controller
    const controls = new OrbitControls(camera, renderer.domElement);

    // setup a scene
    const scene = new THREE.Scene();

    // Re-use the same Geometry across all our cubes
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Basic "unlit" material with no depth
    const material = new THREE.MeshBasicMaterial({
      color: "red",
    });

    // scene.add(new THREE.AmbientLight("#59314f"));

    // Create the mesh
    const mesh = new THREE.Mesh(geometry, material);

    // Smaller cube
    mesh.scale.setScalar(0.5);

    // Then add the group to the scene
    scene.add(mesh);

    // const light = new THREE.PointLight("#45caf7", 1, 15.5);
    // light.position.set(2, 2, -4).multiplyScalar(1.5);
    // scene.add(light);
    //
    const animate = () => {
      renderer.setPixelRatio(1);
      renderer.setSize(width, height);
      camera.aspect = width / height;

      // Update camera properties
      camera.updateProjectionMatrix();

      mesh.rotation.y += 1 * 0.01;

      renderer.render(scene, camera);

      window.requestAnimationFrame(animate);
      controls.update();
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
