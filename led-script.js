var m = require('mraa');
console.log(m.getVersion())
 
var led =new  m.Gpio(101)
led.dir(m.DIR_OUT)
led.write(1)
