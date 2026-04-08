// The word 'export' makes this class visible to other files
export class Input {
    constructor() {
        console.log("Input system is being born!");
        
        // This is where your Event Listeners will live
        window.addEventListener('keydown', (event) => {
            console.log("You pressed: " + event.code);
        });
    }
}