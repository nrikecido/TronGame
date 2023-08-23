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
            width: 20,
            height: 20,
            color: {r: 227, g: 118, b: 30}
        };
        
        this.player2 = {
            x: 80,
            y: 80,
            width: 20,
            height: 20,
            color: {r: 36, g: 7, b: 183}
        };

        this.config = {
            speed: 10,
            death: false,
        }
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
    }

    move_player1(){
        const position = this.player1;

    }
}

class KeyBoard{
    constructor(game){
        this.game = tron;

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
            console.log('estoy presionando flecha arriba');
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
            console.log('estoy soltando flecha arriba');
        } else if (event.key === 'ArrowDown') {
            this.keyMapPlayer1['ArrowDown'] = false;
        } else if (event.key === 'ArrowLeft') {
            this.keyMapPlayer1['ArrowLeft'] = false;
        } else if (event.key === 'ArrowRight') {
            this.keyMapPlayer1['ArrowRight'] = false;
        }

        // Jugador 2
        if (event.key === 'W') {
            this.keyMapPlayer2['W'] = false;
            console.log('soy el w del jugador dos');
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
    tron.load_track_player();
    teclado = new KeyBoard();
};