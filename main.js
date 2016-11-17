var keypress = require('keypress');
var five = require("johnny-five");
var Joule = require("joule-io");
var mraa = require('mraa');
var board = new five.Board({
  io: new Joule()
});

var ads1115 = new mraa.I2c(0);

ads1115.address(0x48)

var timesPressed = 0
var floor = 0
var white = 0

var findWhiteLine = 0

// ----------------------
// --- main function ----

setInterval(function(){

	var inputValue = getLightIntensity()
	console.log('Input value is ' + inputValue);

	// First press we setup the floor value
	if (timesPressed == 0) {
		if (isButtonPressed(inputValue)) {
			timesPressed = 1
			floor = inputValue
		}
	} 

	// Second press we setup the white value
	if (timesPressed == 1) {
		if (isButtonPressed(inputValue)) {
			timesPressed = 2
			white = inputValue
		}
	}

	// If floor or white was not setup, returns and ask for press button
	if (floor == 0 || white == 0) {
		console.log('Floor or white not setup. Press button!')
		return
	}

	// ---- move things just after calibration ----
	var t = Math.abs(inputValue - floor)
	var t2 = Math.abs(inputValue - white)

	if (t > t2) {
		forward(127)

	} else {
		if (findWhiteLine == 0) {
			spin_left(127)	
			findWhiteLine = 1
		}

		if (findWhiteLine == 1) {
			spin_right(127)	
			findWhiteLine = 0
		}
	}

}, 200);


// ----------------------
// ---- help functions -----

function isButtonPressed(inputValue) {
	return inputValue > 20000 && inputValue < 30000
}

function getLightIntensity() {
	ads1115.writeWordReg(1, 0x83C1);

    var raw = ads1115.readWordReg(0);
    var inputValue = ((raw&0xff00)>>8)+((raw&0x00ff)<<8);

    return inputValue
}

function forward(speed) {
	board.digitalWrite(26,1);
	board.analogWrite(28,100);
	board.digitalWrite(30,1);
	board.analogWrite(32,100);	
	console.log("forward");
}

function reverse(speed) {
	board.digitalWrite(26,0);
	board.analogWrite(28,100);
	board.digitalWrite(30,0);
	board.analogWrite(32,100);
}

function spin_left(speed) {
	board.digitalWrite(26,0);
	board.analogWrite(28,100);
	board.digitalWrite(30,1);
	board.analogWrite(32,100);
}

function spin_right(speed) {
	console.log("spin right" );
	board.digitalWrite(26,1);
	board.analogWrite(28,200);
	board.digitalWrite(30,0);
	board.analogWrite(32,200);
}

function stop() {
	console.log("stop");
	board.digitalWrite(26,0);
	board.analogWrite(28,0);
	board.digitalWrite(30,0);
	board.analogWrite(32,0);
}