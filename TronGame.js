class TronGame{

    constructor(){
        // Declaramos el canvas y el contexto 2D
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext('2d');

        this.canvas.width = 800;
        this.canvas.height = 500;

        this.player1 = new Image();
        this.player2 = new Image();

        this.player1 = {
            x: 20,
            y: 20,
            width: 10,
            height: 10,
            color: {r: 227, g: 118, b: 30}
        };
        
        this.player2 = {
            x: 80,
            y: 80,
            width: 10,
            height: 10,
            color: {r: 36, g: 7, b: 183}
        };

        this.config = {
            speed: 2,
            death: false,
        }

        // Declaramos el array de rastros de ambos jugadores
        this.player1Trail = [];
        this.player2Trail = [];

        // Inicializamos el bucle del juego
        this.startGameLoop();
    }

    startGameLoop() {
        const gameLoop = () => {
        
            this.move_player1();
            this.move_player2();
            // Dibuja el juego en el canvas
            this.load_track_player();

            // Vuelve a llamar a gameLoop para el siguiente cuadro
            requestAnimationFrame(gameLoop);
        };
        // Inicia el bucle de juego llamando a gameLoop por primera vez
        requestAnimationFrame(gameLoop);
    }

    load_track_player(){
        // DIbujamos el escenario en el canvas
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Establece el color de relleno en formato RGB para el cuadrado naranja
        this.context.fillStyle = `rgb(${this.player1.color.r}, ${this.player1.color.g}, ${this.player1.color.b})`;
        this.context.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height);

        // Establece el color de relleno en formato RGB para el cuadrado azul
        this.context.fillStyle = `rgb(${this.player2.color.r}, ${this.player2.color.g}, ${this.player2.color.b})`;
        this.context.fillRect(this.player2.x, this.player2.y, this.player2.width, this.player2.height);
    
        // Dibujamos el halo
        this.context.fillStyle = `rgb(${this.player1.color.r}, ${this.player1.color.g}, ${this.player1.color.b})`;
        this.player1Trail.forEach((position) => {
            this.context.fillRect(position.x, position.y, this.player1.width, this.player1.height);
        });

        this.context.fillStyle = `rgb(${this.player2.color.r}, ${this.player2.color.g}, ${this.player2.color.b})`;
        this.player2Trail.forEach((position) => {
            this.context.fillRect(position.x, position.y, this.player2.width, this.player2.height);
        });

        this.detectCollision();
    }

    move_player1() {
        const position = this.player1;

        // Lógica para mover al jugador 1
        if (teclado.keyMapPlayer1['38']) {
            position.y -= this.config.speed;
        } else if (teclado.keyMapPlayer1['40']) {
            position.y += this.config.speed;
        }
    
        if (teclado.keyMapPlayer1['37']) {
            position.x -= this.config.speed;
        } else if (teclado.keyMapPlayer1['39']) {
            position.x += this.config.speed;
        }
    
        // Lógica para que el jugador no se salga del canvas
        if (position.x < 0) {
            position.x = 0; // Límite izquierdo
        } else if (position.x + position.width > this.canvas.width) {
            position.x = this.canvas.width - position.width; // Límite derecho
        }
    
        if (position.y < 0) {
            position.y = 0;
        } else if (position.y + position.height > this.canvas.height) {
            position.y = this.canvas.height - position.height;
        }

        this.player1Trail.push({x: position.x, y: position.y })
    }

    move_player2() {
        const position = this.player2;
    
        if (teclado.keyMapPlayer2['87']) {
            position.y -= this.config.speed;
        } else if (teclado.keyMapPlayer2['83']) {
            position.y += this.config.speed;
        }
    
        if (teclado.keyMapPlayer2['65']) {
            position.x -= this.config.speed;
        } else if (teclado.keyMapPlayer2['68']) {
            position.x += this.config.speed;
        }
    
        if (position.x < 0) {
            position.x = 0;
        } else if (position.x + position.width > this.canvas.width) {
            position.x = this.canvas.width - position.width;
        }
    
        if (position.y < 0) {
            position.y = 0;
        } else if (position.y + position.height > this.canvas.height) {
            position.y = this.canvas.height - position.height;
        }

        this.player2Trail.push({x: position.x, y: position.y })
    }

    detectCollision() {
        // Ajusta las coordenadas para que estén justo afuera del límite del jugador
        const player1X = this.player1.x + this.player1.width;
        const player1Y = this.player1.y + this.player1.height;
        const player2X = this.player2.x + this.player2.width;
        const player2Y = this.player2.y + this.player2.height;
    
        // Obtén el color del jugador 1 en su posición ajustada
        const player1Color = this.getPlayerColor(player1X, player1Y);
    
        // Obtén el color del jugador 2 en su posición ajustada
        const player2Color = this.getPlayerColor(player2X, player2Y);
    
        // Comprueba si el jugador 1 ha colisionado con el color del jugador 2 o el suyo propio
        if (
            !this.isBlackColor(player1Color) || // Si el color del jugador 1 no es negro
            !this.isBlackColor(player2Color) // Si el color del jugador 2 no es negro
        ) {
            console.log('has chocado');
            //Efectos de la muerte: sacar un mensaje y reiniciar el juego
        }
    }

    getPlayerColor(x, y) {
        // Obtén el color en las coordenadas (x, y) utilizando getImageData
        const imageData = this.context.getImageData(x, y, 1, 1);
        const pixelData = imageData.data;
        
        console.log(pixelData[0]);
        // El color se encuentra en los componentes rojo (R), verde (G) y azul (B) del píxel
        const color = {
            r: pixelData[0],
            g: pixelData[1],
            b: pixelData[2]
        };
    
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
        if (event.keyCode === 38 && !this.keyMapPlayer1[40]) { // Código 38 corresponde a la tecla 'ArrowUp'
            this.keyMapPlayer1[38] = true;
        } else if (event.keyCode === 40 && !this.keyMapPlayer1[38]) { // Código 40 corresponde a la tecla 'ArrowDown'
            this.keyMapPlayer1[40] = true;
        } else if (event.keyCode === 37 && !this.keyMapPlayer1[39]) { // Código 37 corresponde a la tecla 'ArrowLeft'
            this.keyMapPlayer1[37] = true;
        } else if (event.keyCode === 39 && !this.keyMapPlayer1[37]) { // Código 39 corresponde a la tecla 'ArrowRight'
            this.keyMapPlayer1[39] = true;
        }

        // Jugador 2
        if (event.keyCode === 87 && !this.keyMapPlayer2[83]) { // Código 87 corresponde a la tecla 'W'
            this.keyMapPlayer2[87] = true;
        } else if (event.keyCode === 83 && !this.keyMapPlayer2[87]) { // Código 83 corresponde a la tecla 'S'
            this.keyMapPlayer2[83] = true;
        } else if (event.keyCode === 65 && !this.keyMapPlayer2[68]) { // Código 65 corresponde a la tecla 'A'
            this.keyMapPlayer2[65] = true;
        } else if (event.keyCode === 68 && !this.keyMapPlayer2[65]) { // Código 68 corresponde a la tecla 'D'
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

window.onload = () => {
    tron = new TronGame();
    teclado = new KeyBoard();
};

