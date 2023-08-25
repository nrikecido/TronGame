// ...

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

        // Agrega un evento onload para esperar a que la imagen se cargue antes de iniciar el juego
        this.backgroundImage.onload = () => {
            this.startGameLoop(); // Comienza la animación después de cargar la imagen de fondo
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
        //this.move_player1();
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
        // Dibuja al jugador 1
        this.context.fillStyle = `rgb(${this.player1.color.r}, ${this.player1.color.g}, ${this.player1.color.b})`;
        this.context.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height);

        // Dibuja al jugador 2
        this.context.fillStyle = `rgb(${this.player2.color.r}, ${this.player2.color.g}, ${this.player2.color.b})`;
        this.context.fillRect(this.player2.x, this.player2.y, this.player2.width, this.player2.height);
        
    }

    move_player1() {
        const position = this.player1;
        
        // Lógica para mover al jugador 1
        if (teclado.keyMapPlayer2[87] && position.direction !== "down") { // Tecla 'W' (jugador 2)
            position.direction = "up";
        } else if (teclado.keyMapPlayer2[83] && position.direction !== "up") { // Tecla 'S' (jugador 2)
            position.direction = "down";
        } else if (teclado.keyMapPlayer2[65] && position.direction !== "right") { // Tecla 'A' (jugador 2)
            position.direction = "left";
        } else if (teclado.keyMapPlayer2[68] && position.direction !== "left") { // Tecla 'D' (jugador 2)
            position.direction = "right";
        }
    
        // Mover el jugador en la dirección actual
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
        
        // Lógica para mover al jugador 2
        if (teclado.keyMapPlayer1[38] && position.direction !== "down") { // Tecla 'ArrowUp' (jugador 1)
            position.direction = "up";
        } else if (teclado.keyMapPlayer1[40] && position.direction !== "up") { // Tecla 'ArrowDown' (jugador 1)
            position.direction = "down";
        } else if (teclado.keyMapPlayer1[37] && position.direction !== "right") { // Tecla 'ArrowLeft' (jugador 1)
            position.direction = "left";
        } else if (teclado.keyMapPlayer1[39] && position.direction !== "left") { // Tecla 'ArrowRight' (jugador 1)
            position.direction = "right";
        }
    
        // Mover el jugador en la dirección actual
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
    
        // Obtén los colores de los jugadores en sus posiciones actuales
        const player1Color = this.getPlayerColor(player1X, player1Y);
        const player2Color = this.getPlayerColor(player2X, player2Y);
    
        // Comprueba si los jugadores han colisionado con los bordes del canvas
        if (
            player1X <= 0 || // Colisión con el borde izquierdo
            player1X >= this.canvas.width || // Colisión con el borde derecho
            player1Y <= 0 || // Colisión con el borde superior
            player1Y >= this.canvas.height // Colisión con el borde inferior
        ) {
            console.log('colision'); // Marca al jugador 1 como muerto
        }
    
        if (
            player2X <= 0 || // Colisión con el borde izquierdo
            player2X >= this.canvas.width || // Colisión con el borde derecho
            player2Y <= 0 || // Colisión con el borde superior
            player2Y >= this.canvas.height // Colisión con el borde inferior
        ) {
            console.log('colision');    // Marca al jugador 2 como muerto
        }
    
        // Comprueba si los jugadores han colisionado con los colores de los rastros
        if (!this.isBlackColor(player1Color) || !this.isBlackColor(player2Color)) {
            console.log('colisión detectada'); // Marca al jugador 1 o jugador 2 como muerto
        }
    }

    getPlayerColor(x, y) {
        // Obtén el color en las coordenadas (x, y) utilizando getImageData
        const imageData = this.context.getImageData(x, y, 1, 1);
        const pixelData = imageData.data;

        // El color se encuentra en los componentes rojo (R), verde (G) y azul (B) del píxel
        const color = {
            r: pixelData[0],
            g: pixelData[1],
            b: pixelData[2]
        };
        console.log(pixelData[0], pixelData[1], pixelData[2]);
        return color;
    }

    isBlackColor(color) {
        // Comprueba si un color es negro (R, G y B son 0)
        return color.r === 0 && color.g === 0 && color.b === 0;
    }
}

class KeyBoard{
    constructor(game){
        this.game = tron;

        // Declaramos los mandos de los jugadores
        this.keyMapPlayer1 = {};
        this.keyMapPlayer2 = {};

        // Asigna los eventos de teclado
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
        document.addEventListener('keyup', (event) => this.handleKeyUp(event));
    }

    handleKeyDown(event) {
        // Jugador 1
        if (event.keyCode === 38 && !this.keyMapPlayer1[40]) { 
            this.keyMapPlayer1[38] = true;
        } else if (event.keyCode === 40 && !this.keyMapPlayer1[38]) {
            this.keyMapPlayer1[40] = true;
        } else if (event.keyCode === 37 && !this.keyMapPlayer1[39]) { 
            this.keyMapPlayer1[37] = true;
        } else if (event.keyCode === 39 && !this.keyMapPlayer1[37]) {
            this.keyMapPlayer1[39] = true;
        }

        // Jugador 2
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
        // Jugador 1
        if (event.keyCode === 38) {
            this.keyMapPlayer1[38] = false;
        } else if (event.keyCode === 40) {
            this.keyMapPlayer1[40] = false;
        } else if (event.keyCode === 37) {
            this.keyMapPlayer1[37] = false;
        } else if (event.keyCode === 39) {
            this.keyMapPlayer1[39] = false;
        }

        // Jugador 2
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
    // Obtén una referencia al botón
    const startButton = document.getElementById("startButton");

    // Registra un evento de clic para el botón "Empezar juego"
    startButton.addEventListener("click", function() {
        // Crea una instancia del juego
        tron = new TronGame();
        teclado = new KeyBoard();

        startButton.style.display = "none"; // Oculta el botón después de iniciar el juego
    });
});
