class TronGame {
    constructor() {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");

        this.canvas.width = 800;
        this.canvas.height = 500;

        this.backgroundImage = new Image();
        this.backgroundImage.src = 'src/background.jpg';

        this.player1 = {
            x: 40,
            y: 20,
            width: 10,
            height: 10,
            color: { r: 227, g: 118, b: 30 },
            direction: "right",
        };

        this.player2 = {
            x: 750,
            y: 470,
            width: 10,
            height: 10,
            color: { r: 36, g: 7, b: 183 },
            direction: "left",
        };

        this.config = {
            speed: 2,
            death: false,
        };

        this.backgroundImage.onload = () => {
            this.startGameLoop();
        };
    }

    startGameLoop() {
        this.drawBackground();
        const gameLoop = () => {
            this.draw();
            requestAnimationFrame(gameLoop);
        };
        requestAnimationFrame(gameLoop);
    }

    draw() {
        this.drawBackground();
        this.drawPlayers();
        this.move_player2();
        this.detectCollision();
    }

    drawBackground() {
        if (!this.context._backgroundDrawn) {
            this.context.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
            this.context._backgroundDrawn = true;
        }
    }

    drawPlayers() {
        this.context.fillStyle = `rgb(${this.player1.color.r}, ${this.player1.color.g}, ${this.player1.color.b})`;
        this.context.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height);

        this.context.fillStyle = `rgb(${this.player2.color.r}, ${this.player2.color.g}, ${this.player2.color.b})`;
        this.context.fillRect(this.player2.x, this.player2.y, this.player2.width, this.player2.height);
    }

    move_player1() {
        const position = this.player1;
        
        if (teclado.keyMapPlayer2[87] && position.direction !== "down") {
            position.direction = "up";
        } else if (teclado.keyMapPlayer2[83] && position.direction !== "up") {
            position.direction = "down";
        } else if (teclado.keyMapPlayer2[65] && position.direction !== "right") {
            position.direction = "left";
        } else if (teclado.keyMapPlayer2[68] && position.direction !== "left") {
            position.direction = "right";
        }
    
        if (position.direction === "up") {
            position.y -= this.config.speed;
        } else if (position.direction === "down") {
            position.y += this.config.speed;
        } else if (position.direction === "left") {
            position.x -= this.config.speed;
        } else if (position.direction === "right") {
            position.x += this.config.speed;
        }
    }
    
    move_player2() {
        const position = this.player2;
        
        if (teclado.keyMapPlayer1[38] && position.direction !== "down") {
            position.direction = "up";
        } else if (teclado.keyMapPlayer1[40] && position.direction !== "up") {
            position.direction = "down";
        } else if (teclado.keyMapPlayer1[37] && position.direction !== "right") {
            position.direction = "left";
        } else if (teclado.keyMapPlayer1[39] && position.direction !== "left") {
            position.direction = "right";
        }
    
        if (position.direction === "up") {
            position.y -= this.config.speed;
        } else if (position.direction === "down") {
            position.y += this.config.speed;
        } else if (position.direction === "left") {
            position.x -= this.config.speed;
        } else if (position.direction === "right") {
            position.x += this.config.speed;
        }
    }

    detectCollision() {
        const player1X = this.player1.x / 2;
        const player1Y = this.player1.y / 2;
        const player2X = this.player2.x / 2;
        const player2Y = this.player2.y / 2;
    
        const player1Color = this.getPlayerColor(player1X, player1Y);
        const player2Color = this.getPlayerColor(player2X, player2Y);
    
        if (
            player1X <= 0 ||
            player1X >= this.canvas.width ||
            player1Y <= 0 ||
            player1Y >= this.canvas.height
        ) {
            console.log('colision');
        }
    
        if (
            player2X <= 0 ||
            player2X >= this.canvas.width ||
            player2Y <= 0 ||
            player2Y >= this.canvas.height
        ) {
            console.log('colision');
        }
    
        if (!this.isBlackColor(player1Color) || !this.isBlackColor(player2Color)) {
            console.log('colisión detectada');
        }
    }

    getPlayerColor(x, y) {
        const imageData = this.context.getImageData(x, y, 1, 1);
        const pixelData = imageData.data;

        const color = {
            r: pixelData[0],
            g: pixelData[1],
            b: pixelData[2]
        };
        console.log(pixelData[0], pixelData[1], pixelData[2]);
        return color;
    }

    isBlackColor(color) {
        return color.r === 0 && color.g === 0 && color.b === 0;
    }
}

class KeyBoard {
    constructor(game) {
        this.game = tron;

        this.keyMapPlayer1 = {};
        this.keyMapPlayer2 = {};

        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
        document.addEventListener('keyup', (event) => this.handleKeyUp(event));
    }

    handleKeyDown(event) {
        if (event.keyCode === 38 && !this.keyMapPlayer1[40]) { 
            this.keyMapPlayer1[38] = true;
        } else if (event.keyCode === 40 && !this.keyMapPlayer1[38]) {
            this.keyMapPlayer1[40] = true;
        } else if (event.keyCode === 37 && !this.keyMapPlayer1[39]) { 
            this.keyMapPlayer1[37] = true;
        } else if (event.keyCode === 39 && !this.keyMapPlayer1[37]) {
            this.keyMapPlayer1[39] = true;
        }

        if (event.keyCode === 87 && !this.keyMapPlayer2[83]) { 
            this.keyMapPlayer2[87] = true;
        } else if (event.keyCode === 83 && !this.keyMapPlayer2[87]) { 
            this.keyMapPlayer2[83] = true;
        } else if (event.keyCode === 65 && !this.keyMapPlayer2[68]) { 
            this.keyMapPlayer2[65] = true;
        } else if (event.keyCode === 68 && !this.keyMapPlayer2[65]) {
            this.keyMapPlayer2[68] = true;
        }
    }

    handleKeyUp(event) {
        if (event.keyCode === 38) {
            this.keyMapPlayer1[38] = false;
        } else if (event.keyCode === 40) {
            this.keyMapPlayer1[40] = false;
        } else if (event.keyCode === 37) {
            this.keyMapPlayer1[37] = false;
        } else if (event.keyCode === 39) {
            this.keyMapPlayer1[39] = false;
        }

        if (event.keyCode === 87) {
            this.keyMapPlayer2[87] = false;
        } else if (event.keyCode === 83) {
            this.keyMapPlayer2[83] = false;
        } else if (event.keyCode === 65) {
            this.keyMapPlayer2[65] = false;
        } else if (event.keyCode === 68) {
            this.keyMapPlayer2[68] = false;
        }
    }
}

let game;
let teclado;

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");

    startButton.addEventListener("click", function() {
        tron = new TronGame();
        teclado = new KeyBoard();

        startButton.style.display = "none";
    });
});
