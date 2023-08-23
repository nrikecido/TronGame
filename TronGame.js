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
}

window.onload = () => {
    tron = new TronGame();
    tron.load_track_player();
};