const five = require("johnny-five");
const board = new five.Board({
    port: "COM4"

});

var entrar = 0;
var saida = 0;
var ObstaculoEntrada = false;
var ObstaculoSaida = false;
var final;

board.on("ready", function () {
    var SensorEntrada = new five.Proximity({
        controller: "HCSR04",
        pin: 7,
        freq: 1000
    })
    var SensorSaida = new five.Proximity({
        controller: "HCSR04",
        pin: 6,
        freq: 1000
    })


    SensorEntrada.on("data", function () {

        var ObstaculoEntrando = this.cm < 15;

        if (ObstaculoEntrada && !ObstaculoEntrando) {
            entrar++;
        }

        ObstaculoEntrada = ObstaculoEntrando;

        console.log("Número de pessoas que entraram :");
        console.log(entrar);
    })

    SensorSaida.on("data", function () {

        var ObstaculoSaindo = this.cm < 15;

        if (ObstaculoSaida && !ObstaculoSaindo) {
            saida++;
        }

        ObstaculoSaida = ObstaculoSaindo;
        console.log("Número de pessoas que sairam: ");
        console.log(saida);

        final = (entrar - saida);
        if (final <= 0) {
            saida = 0;
            entrar = 0;
        }
        
        
        console.log("Número de pessoas que estão no busão: ");
        console.log(final);

    })
})