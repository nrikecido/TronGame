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
        if (teclado.keyMapPlayer1['ArrowUp']) {
            position.y -= this.config.speed;
        } else if (teclado.keyMapPlayer1['ArrowDown']) {
            position.y += this.config.speed;
        }
    
        if (teclado.keyMapPlayer1['ArrowLeft']) {
            position.x -= this.config.speed;
        } else if (teclado.keyMapPlayer1['ArrowRight']) {
            position.x += this.config.speed;
        }
    
        // Lógica para que el jugador no se salga del canvas
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

        this.player1Trail.push({x: position.x, y: position.y })
    }

    move_player2() {
        const position = this.player2;
    
        if (teclado.keyMapPlayer2['W']) {
            position.y -= this.config.speed;
        } else if (teclado.keyMapPlayer2['S']) {
            position.y += this.config.speed;
        }
    
        if (teclado.keyMapPlayer2['A']) {
            position.x -= this.config.speed;
        } else if (teclado.keyMapPlayer2['D']) {
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

    detectCollision(){
        // Declaramos variables de las coordenadas de cada uno
        const car1_X = this.player1.x;
        const car1_Y = this.player1.y;
        const car2_X = this.player2.x;
        const car2_Y = this.player1.y;

        // Establecemos las funciones de detección de color
        const imageData = this.context.getImageData(car1_X, car1_Y, 1, 1);
        const imageData2 = this.context.getImageData(car2_X, car2_Y, 1, 1);

        console.log('posición x de 1', car1_X);
        console.log('jugador 1', imageData);
        console.log('jugador 2', imageData2);
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
        if (event.key === 'ArrowUp' && !this.keyMapPlayer1['ArrowDown']) {
            this.keyMapPlayer1['ArrowUp'] = true;
        } else if (event.key === 'ArrowDown' && !this.keyMapPlayer1['ArrowUp']) {
            this.keyMapPlayer1['ArrowDown'] = true;
        } else if (event.key === 'ArrowLeft' && !this.keyMapPlayer1['ArrowRight']) {
            this.keyMapPlayer1['ArrowLeft'] = true;
        } else if (event.key === 'ArrowRight' && !this.keyMapPlayer1['ArrowLeft']) {
            this.keyMapPlayer1['ArrowRight'] = true;
        }

        // Jugador 2
        if (event.key === 'W' && !this.keyMapPlayer2['S']) {
            this.keyMapPlayer2['W'] = true;
            console.log('soy el w del jugador dos');
        } else if (event.key === 'S' && !this.keyMapPlayer2['W']) {
            this.keyMapPlayer2['S'] = true;
        } else if (event.key === 'A' && !this.keyMapPlayer2['D']) {
            this.keyMapPlayer2['A'] = true;
        } else if (event.key === 'D' && !this.keyMapPlayer2['A']) {
            this.keyMapPlayer2['D'] = true;
        }
    }

    handleKeyUp(event) {
        // Jugador 1
        if (event.key === 'ArrowUp') {
            this.keyMapPlayer1['ArrowUp'] = false;
        } else if (event.key === 'ArrowDown') {
            this.keyMapPlayer1['ArrowDown'] = false;
        } else if (event.key === 'ArrowLeft') {
            this.keyMapPlayer1['ArrowLeft'] = false;
        } else if (event.key === 'ArrowRight') {
            this.keyMapPlayer1['ArrowRight'] = false;
        }

        console.log(event);

        // Jugador 2
        if (event.key === 'W') {
            this.keyMapPlayer2['W'] = false;
        } else if (event.key === 'S') {
            this.keyMapPlayer2['S'] = false;
        } else if (event.key === 'A') {
            this.keyMapPlayer2['A'] = false;
        } else if (event.key === 'D') {
            this.keyMapPlayer2['D'] = false;
        }
    }
}

window.onload = () => {
    tron = new TronGame();
    teclado = new KeyBoard();
};