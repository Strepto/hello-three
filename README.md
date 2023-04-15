# Hello Three

This is a quick tutorial to get started with the combination of npm, THREEjs and TypeScript.

The goal is to setup a simple workflow for a quick feedback loop for 3D web projects. We will try to setup a game loop, and add some logic to it.

It uses a basic "Starter HTML and CSS" setup, which can be improved.

The goals are:

* Easy to get started
* Fast to compile
* Fast to resume even if you have not worked on it for a while
* Using threeJS typesafe
* Using THREEjs extensions such as GLTF loader for more model support
* Maybe some WebXR?


## The guide!

### Step 0: Prerequisites

You need to have installed the latest version of:

* `nodejs`
* `npm`

I had versions `node:18.x` and `npm:9.x`, but this is kinda basic.

### Step 1: What is node?

If you have never used node before there is a major thing to understand about it which took me a while to understand.

`node` is a non-browser runtime for JavaScript

What this means for us is that node is actually just used for "helper" functionality in this threejs setup. We could host a webserver with `dotnet`, write the javascript as native js and not need node at all. But the node ecosystem has thousands of "dev-tools" which are very helpful for webdev.

### Step 2: What is npm?

`npm` == `node package manager` and is a simple tool to manage packages. An important note is that everything developed with npm is its own package!

Every project you find which has a `project.json` file is a `npm` based project*.

\* (Or derivatives such as yarn or pnpm)

### Create our project

We use the `npm create` tool with the `vite` package to setup a new project.

This will create a new folder, with the given name.

```sh
npm create vite@latest
```

First supply a name: For instance three-playground

then pick `"vanilla"`

and pick `"typescript"`

this should tell you to cd into the folder and run two commands to get started. Lets keep to just cd into the folder.

### Step 3: Install our dependencies

We have two kinds of dependencies:

#### First: The runtime dependencies

We need threejs!

```pwsh
npm install three
npm install @types/three

# Alternatively just run `npm install three @types/three` to install both in one command.
```

If `@types/three` does not match the `three` version consider downgrading three by installing the same version as the types.

> Info: The @types version is just info for typescript describing which types the threejs code has. As threejs is written in native javascript it has no types, and its quite amazing how such a big project manages maintenance...
> The @types is a community project for many similar untyped npm packages without native types.

You will now have a package-lock.json, this can be used when installing to get the exact same packages each time. You can run `npm clean-install` to use the lockfile (which is what you would do on Github Actions or similar continuos-integration setup)

### Step 4: Start the project and view it in the browser

run `npm run dev` to start the developer server.

Try changing any of the files, such as the `src\main.ts` see how it compiles and changes the website immediately.

```text
Example: change
<h1>Vite + TypeScript</h1>

to:
<h1>Vite + TypeScript + Three</h1>
```

Cool 😎

### Step 5: We're webdev now!

Ok, so we have a running something.

What we need now is to add some three's

To do this we need to:

A: Add a "Canvas"
B: Initialize ThreeJS

In the main.ts file add:

```html
    <canvas width="500" height="500" id="three-canvas"></canvas>

here:

    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <canvas width="500" height="500" id="three-canvas"></canvas>
  </div>
```

Now create a new file in the src folder:

```src/threeapp.ts```

Add this to the file:

```ts
// Import statements import from a "module name" or another file. Its kinda magic, but you get used to it.
import * as THREE from "three";

// Export is kinda like public, function is a function. This function takes in a canvas of type HTMLCanvasElement (this is typescript!)
export function startThree(canvas: HTMLCanvasElement) {
    // Create a WebGL renderer and connect it to the canvas
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });

    // Set the background color to black (try changing this to blue or any other html color!)
    renderer.setClearColor("black");

    // Everything in THREE (as in other 3D apps) have a "Scene". This is where every 3D object gets it coordinates relative to.
    const scene = new THREE.Scene();
    // Create a basic "Camera" to render from
    const camera = new THREE.PerspectiveCamera(
        75,
        canvas.width / canvas.height
    );

    // Create a box! We need some 3D Stuff to look at!
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // Create a material, and color it.
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // Combining a geometry and a material to a "Mesh" (A better name would maybe be a "Model?" but not my code)
    const cube = new THREE.Mesh(geometry, material);
    // Adds the cube to the scene! Remark: The cube has the default position of 0,0,0. We'll change this later.
    scene.add(cube);

    // The camera in threejs looks down hte -Z axis. So we move it "backwards" by increasing the Z value. (This way we can see our cube!)
    camera.position.z = 5;

    // The animate function is like the unity "Update loop"
    // Note: this is an internal function so we have access to the scene and renderer. Could be structured differently (for instance with a class)
    function update() {
        // This waits X ms (one frame) before triggering itself again
        requestAnimationFrame(update);

        // Finally we draw the scene!
        renderer.render(scene, camera);
    }

    // Start the animation loop!
    update();
}
```

You should now be able to save, and check the website for a nice green box on a black background!

🌌

### Step 6: Moving your cube

We have an animation loop but nothing is happening.

We can rotate the cube to make it spin!

Try adding this to the update:

```ts
//// This waits X ms (one frame) before triggering itself again
//requestAnimationFrame(update);

cube.rotateX(0.01);
cube.rotateY(0.02);

//// Finally we draw the scene!
//renderer.render(scene, camera);
```

Save and see the cube rotate in your browser!

### Step 7: Exercise

Try making the cube "ping-pong" from left to right and back.

```ts
// Tips

// Get the current cube position with
cube.position.x

// You can change the position with

cube.position.x += 0.01

// You can save a "State" such as "is moving left or right"
// by adding a
let isMovingRight = true
// Outside of the update function.
// example:
let isMovingRight = true;
function update(){
    // Snip
```

### Step 7: Possible solution

This is one solution to a moving cube, quick and dirty.

```ts
let cubeIsMovingRight = true;

function update() {
    requestAnimationFrame(update);

    cube.rotateX(0.01);
    cube.rotateY(0.02);

    if (cube.position.x > 1) {
        cubeIsMovingRight = false;
    }

    if (cube.position.x < -1) {
        cubeIsMovingRight = true;
    }

    // This uses a ternary operator (the ?): works like a compact if/else
    cube.position.x += cubeIsMovingRight ? 0.01 : -0.01;

    renderer.render(scene, camera);
}
```

### Step 8: Lights, and Action!

The cube we have is a bit flat now. Lets try to add a light to the scene, and a better material.

To add a light insert this in the init code. (Not in the update loop)

```ts
// This is a directional light (like the sun)
const directionalLight = new THREE.DirectionalLight("white", 2);
directionalLight.position.y = 10;
directionalLight.position.x = 1;
directionalLight.position.z = 3;

scene.add(directionalLight);
```

Also edit the cubes material from `MeshBasic` to `MeshStandard`:

```ts
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
```

You should now have a lit box! Cool! Try moving the light around to see if the box changes lighting
