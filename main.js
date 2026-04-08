import { DragonEngine } from './Engine/Core/A_Dragons_Engine.js';

const myGame = new DragonEngine('gameCanvas');

// Custom game logic
myGame.update = function(dt) {
    // Logic for your specific dragon game goes here
};

myGame.start();