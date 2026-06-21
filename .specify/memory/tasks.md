# Implementation Tasks: WebGL Portfolio Core

## Phase 1: Setup & Foundations
- [ ] T1.1: Initialize `package.json` and install `three`, `vite` if not already present.
- [ ] T1.2: Setup basic `index.html` structure with `<canvas id="webgl">` and a UI overlay div.
- [ ] T1.3: Setup `style.css` with basic resets, Dark Mode background, and absolute positioning for the UI over the canvas.

## Phase 2: WebGL Implementation
- [ ] T2.1: Initialize Three.js scene, camera, and renderer in `main.js`.
- [ ] T2.2: Add a 3D object (e.g., IcosahedronGeometry) with a Wireframe or standard material.
- [ ] T2.3: Add lighting (AmbientLight, PointLight).
- [ ] T2.4: Implement the `requestAnimationFrame` loop to animate the object.
- [ ] T2.5: Add `mousemove` event listener to rotate the object or camera based on cursor position.

## Phase 3: UI & Glassmorphism
- [ ] T3.1: Create HTML structure for the Portfolio Gallery in `index.html` (inside the UI overlay).
- [ ] T3.2: Add CSS classes for `.glass-card` (backdrop-filter, rgba backgrounds).
- [ ] T3.3: Write JS logic to render 3 dummy projects into the `.glass-card` containers.

## Phase 4: Verification
- [ ] T4.1: Build project (`npm run build`) and test locally.
