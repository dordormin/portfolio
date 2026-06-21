# Implementation Plan: WebGL Portfolio Core

**Status**: Draft

## Architecture Overview

The system will use a Vite + Vanilla JavaScript architecture to keep the footprint small and performant. Three.js will be used for the WebGL rendering.

**Key Components**:
- `index.html`: The main entry point.
- `src/main.js`: The application logic and Three.js initialization.
- `src/style.css`: The styling including Glassmorphism utilities.
- `Dockerfile` / `nginx.conf`: For deployment (Already created).

## API Design & Data Models

- **Data Models**: We will hardcode 3 dummy projects in a JavaScript array to populate the DOM dynamically.

## Component Design

### 1. WebGL Canvas (`<canvas id="webgl">`)
- Uses Three.js `WebGLRenderer`.
- Renders a floating 3D Torus or Icosahedron.
- Uses a `mousemove` event listener on the window to subtly rotate the camera or the object based on cursor coordinates.

### 2. Glassmorphism UI (`.glass-card`)
- Uses CSS: `background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1);`.
- Displays project title, description, and link.

## Security Considerations
- N/A (Static frontend only)

## Verification Plan
1. Run `npm run dev` and verify no console errors.
2. Verify 3D object renders.
3. Verify CSS properties match the premium aesthetic.
