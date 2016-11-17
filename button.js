var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion()); //write the mraa version to the console

var myDigitalPin = new m.Gpio(23); //setup digital read on onboard pin 4 (27) this is pin 5 

myDigitalPin.dir(m.DIR_IN); //set the gpio direction to input
periodicActivity(); //call the periodicActivity function

function periodicActivity() //
{
  var myDigitalValue =  myDigitalPin.read(); //read the digital value of the pin
  console.log('Gpio is ' + myDigitalValue); //write the read value out to the console
  setTimeout(periodicActivity,200); //call the indicated function after 1 second (1000 milliseconds)
}
