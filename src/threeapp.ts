// Import statements import from a "module name" or another file. Its kinda magic, but you get used to it.
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

// Export is kinda like public, function is a function. This function takes in a canvas of type HTMLCanvasElement (this is typescript!)
export function startThree(canvas: HTMLCanvasElement) {
    // Create a WebGL renderer and connect it to the canvas
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });

    // Set the background color to black (try changing this to blue or any other html color!)
    renderer.setClearColor("blue");

    // Everything in THREE (as in other 3D apps) have a "Scene". This is where every 3D object gets it coordinates relative to.
    const scene = new THREE.Scene();
    // Create a basic "Camera" to render from
    const camera = new THREE.PerspectiveCamera(
        75,
        canvas.width / canvas.height
    );

    const directionalLight = new THREE.DirectionalLight("white", 2);
    directionalLight.position.y = 10;
    directionalLight.position.x = 1;
    directionalLight.position.z = 3;

    scene.add(directionalLight);

    renderer.xr.enabled = true;
    document.body.appendChild(ARButton.createButton(renderer));

    // Create a box! We need some 3D Stuff to look at!
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // Create a material, and color it.
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    // Combining a geometry and a material to a "Mesh" (A better name would maybe be a "Model?" but not my code)
    const cube = new THREE.Mesh(geometry, material);
    // Adds the cube to the scene! Remark: The cube has the default position of 0,0,0. We'll change this later.
    scene.add(cube);

    // The camera in threejs looks down hte -Z axis. So we move it "backwards" by increasing the Z value. (This way we can see our cube!)
    camera.position.z = 5;

    let cubeIsMovingRight = true;

    let prevUpdateTimestampMs: number = 0;
    // The animate function is like the unity "Update loop"
    // Note: this is an internal function so we have access to the scene and renderer. Could be structured differently (for instance with a class)
    function update(timestampMs: number) {
        const deltaTimeSeconds = (timestampMs - prevUpdateTimestampMs) * 0.001; // <= calculate the time since the last frame. This can make animations play at same speed independent of framerate
        prevUpdateTimestampMs = timestampMs;

        const didResizeRenderer = resizeRendererToDisplaySize(renderer);
        if (didResizeRenderer) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cube.rotateX(0.01);
        cube.rotateY(0.02);

        if (cube.position.x > 1) {
            cubeIsMovingRight = false;
        }

        if (cube.position.x < -1) {
            cubeIsMovingRight = true;
        }

        cube.position.x += cubeIsMovingRight ? 0.04 : -0.01;

        // Finally we draw the scene!
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(update);
}

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}
