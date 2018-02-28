const five = require("johnny-five");
const request = require("request");
const board = new five.Board({
    port: ""

});

var entrar;
var saida;
var final;
var ObstaculoEntrada = false;
var ObstaculoSaida = false;

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

        var ObstaculoEntrado = this.cm < 15;
        if (ObstaculoEntrada && !ObstaculoEntrando) {
            entrar++;
        }

        ObstaculoEntrada = TemObstaculo;
    })

    SensorSaida.on("data", function () {

        var ObstaculoSaindo = this.cm < 15;
        if (ObstaculoSaida && !ObstaculoSaindo) {
            saida++;
        }

        ObstaculoSaindo = ObstaculoSaida;

        final = (entrar - saida);
        if (final <= 0) {
            saida = 0;
            entrar = 0;
        }
        console.log("Número de pessoas que entraram :");
        console.log(entrar);
        console.log("Número de pessoas que sairam: ");
        console.log(saida);
        console.log("Número de pessoas que estão no busão");
        console.log(final);

    })
})