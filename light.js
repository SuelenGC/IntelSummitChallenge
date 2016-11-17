var mraa = require('mraa');
var version = mraa.getVersion();


var ads1115 = new mraa.I2c(0);

ads1115.address(0x49)

setInterval(function(){

    ads1115.writeWordReg(1, 0x83C1);
    var raw1 = ads1115.readWordReg(0);
    var analogValue1 = ((raw1&0xff00)>>8)+((raw1&0x00ff)<<8);

if ( FirstPress == 0 )
{
	if ( analogValue1 < 30000 )
	{
		FirstPress = 1;
		// floor calib
	}
}
else
{
	if ( FirstPress == 1 )
	{
		if ( analogValue1 > 30000 )
		{
			FirstPress = 2;
		}
	}
	else
	{
		if ( analogValue1 < 30000 )
		{
			FirstPress = 3;
// white 
		}
	}
}

    console.log('button 1: ' + analogValue1);

}, 1000);

