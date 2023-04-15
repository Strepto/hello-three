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

Try changing any of the files, such as the `\index.html` or any of the typescript files to see how it compiles and changes the website immediately.
