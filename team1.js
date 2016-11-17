
var keypress = require('keypress');
var five = require("johnny-five");
var Joule = require("joule-io");
var board = new five.Board({
  io: new Joule()
});

console.log('running');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
  if (key && key.name == 'w') {
    forward(127);

  }

  else if (key && key.name == 's') {
    reverse(127);

  }

  else if (key && key.name == 'a') {
    spin_left(127);

  }

  else if (key && key.name == 'd') {
    spin_right(127);

  }

  else{
    stop();
  }

});

process.stdin.setRawMode(true);
process.stdin.resume();
//lets try the buzzer upm to drive PWM
board.on("ready", function(){
  var led3 = new five.Led(103);
  led3.blink(500);
  board.digitalWrite(26,0);
  board.analogWrite(28,0);
  board.digitalWrite(30,0);
  board.analogWrite(32,0);
});

function forward(speed)
{

		// set direction to CW and set speed to 50%
//  var led2 = new five.Led(102);
//  led2.blink(100);
  board.digitalWrite(26,1);
  board.analogWrite(28,100);
  board.digitalWrite(30,1);
  board.analogWrite(32,100);	
  console.log("forward");


}

function reverse(speed)
{


// set direction to CW and set speed to 50%
	

//  var led0 = new five.Led(100);
//  led0.blink(100);
  board.digitalWrite(26,0);
  board.analogWrite(28,100);
  board.digitalWrite(30,0);
  board.analogWrite(32,100);

	
}

function spin_left(speed)
{

// set direction to CW and set speed to 50%

//  var led4 = new five.Led(104);
//  led4.blink(100);
  board.digitalWrite(26,0);
  board.analogWrite(28,100);
  board.digitalWrite(30,1);
  board.analogWrite(32,100);

		}

function spin_right(speed)
{
// set direction to CW and set speed to 50%
		console.log("spin right" );
//  var led5 = new five.Led(105);
//  led5.blink(300);
  board.digitalWrite(26,1);
  board.analogWrite(28,200);
  board.digitalWrite(30,0);
  board.analogWrite(32,200);


	
}

function stop()
{
// stop?
		console.log("stop");

//  led0.blink(2000);
//  led3.blink(5000);
  board.digitalWrite(26,0);
  board.analogWrite(28,0);
  board.digitalWrite(30,0);
  board.analogWrite(32,0);


}

function end()
{
	if (motor1)
	{
		console.log("Stopping motors");
		
	}
	exit();
}

// When exiting: clear memory and print exit message
function exit()
{
	
	console.log("Exiting");
	process.exit(0);
}




process.on('SIGINT', function()
{
	exit();
});
