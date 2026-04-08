import { Input } from '../Input/input.js';
import { DevConsole } from '../Debug/DevConsole.js';



export class DragonEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        
        // Set canvas size to match window
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.gl = this.canvas.getContext('webgl2');

        if (!this.gl) {
            console.error("WebGL 2 not supported by your browser.");
            return;
        }

        // Set WebGL viewport to match canvas
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        // Create a 2D overlay canvas for the dev console
        this.overlayCanvas = document.createElement('canvas');
        this.overlayCanvas.width = this.canvas.width;
        this.overlayCanvas.height = this.canvas.height;
        this.overlayCanvas.style.position = 'fixed';
        this.overlayCanvas.style.top = '0';
        this.overlayCanvas.style.left = '0';
        this.overlayCanvas.style.zIndex = '99999';
        this.overlayCanvas.style.pointerEvents = 'none';
        document.body.appendChild(this.overlayCanvas);
        this.overlay2D = this.overlayCanvas.getContext('2d');

        // Initialize input system
        this.input = new Input();

        // Initialize dev console
        this.devConsole = new DevConsole();
        this.devConsole.addLog('Dragon Engine started!');

        // Handle window resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.overlayCanvas.width = window.innerWidth;
            this.overlayCanvas.height = window.innerHeight;
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        });

        // Timing for the 60-tick system
        this.tickRate = 1 / 60; 
        this.accumulator = 0;
        this.lastTime = 0;

        // Engine State
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.loop(t));
    }

    loop(currentTime) {
        if (!this.isRunning) return;

        // Calculate how much time passed in seconds
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Add time to our "bucket"
        this.accumulator += deltaTime;

        // Run the "Ticks" (Fixed Update)
        while (this.accumulator >= this.tickRate) {
            this.update(this.tickRate);
            this.accumulator -= this.tickRate;
        }

        // Render the visuals
        this.render();

        // Update and render dev console
        this.devConsole.updateFPS();
        this.overlay2D.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
        this.devConsole.render(this.overlay2D);

        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        // This is where physics and logic go
        // 'dt' will always be 0.01666... (1/60)
    }

    render() {
        // Clear the screen to "Dragon Purple"
        this.gl.clearColor(0.2, 0.0, 0.3, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}