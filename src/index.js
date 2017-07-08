'use strict';

//$.ready(function (error) {
//    if (error) {
//        console.log(error);
//        return;
//    }

//   $('#led-r').turnOn();
//});

//$.end(function () {
//    $('#led-r').turnOff();
//});


var netControl = require('./netControl');
var relayOpen = false;
var errorMsg = "";


function controlRelay(open){
    if (open) {
        $('#led-b').turnOn(function () { 
            console.log('turn on');
        });
    } else {
        $('#led-b').turnOff(function () {
            console.log('turn off');
        });
    }
    relayOpen = open;
}

function showText(txt) {
	$('#lcd1602').clear();
	$('#lcd1602').print(txt);
}

$.ready(function (error) {
    if (error) {
    console.log(error);
        return;
    }
    netControl.listenCMD({
        exeCmd:function (cmd) {
            switch(cmd)
			{
				case "c0_00":
				  showText("Power ON/OFF");
				  break;
				case "c0_01":
				  showText("Temperature +");
				  break;
				case "c0_02":
				  showText("Temperature -");
				  break;
				default:
				  break;
			}

        },
        getReply: function () {
          
        }
    });
});

$.end(function () {
    
});
