// Dev Console - Press Ctrl+Shift+D to toggle
export class DevConsole {
    constructor() {
        this.isOpen = false;
        this.logs = [];
        this.maxLogs = 100;
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = Date.now();
        
        console.log('DevConsole initialized!');
        
        // Override console.log to capture logs
        const originalLog = console.log;
        console.log = (...args) => {
            this.addLog(args.join(' '));
            originalLog.apply(console, args);
        };

        // Listen for backtick (`) to toggle console
        window.addEventListener('keydown', (e) => {
            console.log('Key pressed:', e.code, e.key);
            if (e.code === 'Backquote' || e.key === '`') {
                e.preventDefault();
                this.toggle();
                console.log('Console toggled! IsOpen:', this.isOpen);
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    addLog(message) {
        const timestamp = new Date().toLocaleTimeString();
        this.logs.push(`[${timestamp}] ${message}`);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
    }

    updateFPS() {
        this.frameCount++;
        const now = Date.now();
        if (now - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;
        }
    }

    render(context) {
        // Always show a small indicator if console exists
        context.fillStyle = this.isOpen ? 'rgba(0, 255, 0, 0.3)' : 'rgba(100, 100, 100, 0.1)';
        context.fillRect(0, 0, 150, 20);
        context.fillStyle = '#00FF00';
        context.font = '11px monospace';
        context.fillText(this.isOpen ? 'Console: OPEN' : 'Console: CLOSED (Press `)', 5, 15);

        if (!this.isOpen) return;

        const padding = 10;
        const lineHeight = 16;
        const width = 400;
        const height = 300;

        // Semi-transparent background
        context.fillStyle = 'rgba(0, 0, 0, 0.9)';
        context.fillRect(0, 30, width, height);

        // Border
        context.strokeStyle = '#00FF00';
        context.lineWidth = 2;
        context.strokeRect(0, 30, width, height);

        // Title
        context.fillStyle = '#00FF00';
        context.font = 'bold 14px monospace';
        context.fillText('Dev Console (` to toggle)', padding, padding + 45);

        // FPS
        context.fillStyle = '#00FF00';
        context.font = '12px monospace';
        context.fillText(`FPS: ${this.fps}`, padding, padding + 65);

        // Logs
        context.fillStyle = '#00CC00';
        context.font = '11px monospace';
        let y = padding + 85;
        const visibleLogs = this.logs.slice(-15); // Show last 15 logs
        for (let log of visibleLogs) {
            if (y > 30 + height - padding) break;
            context.fillText(log, padding, y);
            y += lineHeight;
        }

        // Scroll indicator
        if (this.logs.length > visibleLogs.length) {
            context.fillStyle = '#FFFF00';
            context.font = '10px monospace';
            context.fillText(`... +${this.logs.length - visibleLogs.length} more`, padding, y);
        }
    }
}
