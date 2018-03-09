const five = require("johnny-five");
const board = new five.Board({
    port: "COM4"

});

var entrar = 0;
var saida = 0;
var ObstaculoEntrada = false;
var ObstaculoSaida = false;
var final;
const configuracao = require("./modulo-api");
const id = configuracao.id;
const api = configuracao.api;
const UpdateSensor = apt + "/api/Sensor/" + id;

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
        const DadosEntrada = {
            valor: entrar
        };
    });

    SensorSaida.on("data", function () {

        var ObstaculoSaindo = this.cm < 15;

        if (ObstaculoSaida && !ObstaculoSaindo) {
            saida++;
        }

        ObstaculoSaida = ObstaculoSaindo;
        console.log("Número de pessoas que sairam: ");
        console.log(saida);
        const DadosSaida = {
            valor: saida
        };

        final = (entrar - saida);
        if (final <= 0) {
            saida = 0;
            entrar = 0;
        }
        console.log("Número de pessoas que estão no busão: ");
        console.log(final);
        const dados = {
            valor: final

        };

        request.put(UpdateSensor, {
            json: true,
            body: {
                "entradas": DadosEntrada,
                "saidas": DadosSaida,
                "total": dados
            }
        }, function (erros, res, body) {
            if (error) {
                consolo.error(error);
                return;
            }
        });

    });

    setInterval(function () {
        request.put(UpdateSensor, {
            json: true,
            body: {
                "entradas": DadosEntrada,
                "saidas": DadosSaida,
                "total": dados
            }
        }, function (erros, res, body) {
            if (error) {
                consolo.error(error);
                return;
            }
        });
    }, 5000);

});