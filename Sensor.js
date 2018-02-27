const five = require("johnny-five");
const request = require("request");
const board = new five.Board({
    port:

});
var entrar;
var saida;
var final;
var ObstaculoEntrada = false;
var ObstaculoSaida = false;

board.on("ready", function(){
    var SensorEntrada = new five.Proximity({
        controller: "HCSR04",
        pin: ,
        freq: 1000
    })
    var SensorSaida = function(){
        controller: "HCSR04",
        pin: ,
        freq: 1000
    }
})
