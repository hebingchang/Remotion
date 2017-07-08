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
var ruff_status = "";
var status_code = 0;

function setStatus(st, code) {
	ruff_status = st;
	status_code = code;
}

function getStatus() {
	return [status_code, ruff_status];
}

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
				  setStatus("success", 1);
				  break;
				case "c0_01":
				  showText("Temperature +");
				  setStatus("success", 1);
				  break;
				case "c0_02":
				  showText("Temperature -");
				  setStatus("success", 1);
				  break;
				default:
				  setStatus("Command not found.", 0);
				  break;
			}

        },
        getReply: function () {
           return JSON.stringify({"success": getStatus()[0], "message": getStatus()[1]});
        }
    });
});

$.end(function () {
    
});
