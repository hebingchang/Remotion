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

function Air_conditioner(){
	var air = new Object;
	air.power = 0;
	air.temperature = 16;
	air.mode = 0;
	air.getStatus = function() {
		return {"power": air.power, "temperature": air.temperature, "mode": air.mode};
	};
	air.setStatus = function(power, temp, mode) {
		air.power = power;
		air.temperature = temp;
		air.mode = mode;
	}
	return air;
}

var air = Air_conditioner();

function setStatus(st, code) {
	ruff_status = st;
	status_code = code;
}

function showStatus() {
	var power = ["Power OFF", "Power ON"];
	var mode = ["Cold", "Heat", "Dehumidify"];
	var sta = air.getStatus();
	console.log(sta);
	showText(power[sta["power"]], mode[sta["mode"]] + " " + air.temperature + "C");
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

function showText(txt1, txt2) {
	$('#lcd1602').clear();
	$('#lcd1602').print(txt1);
	$('#lcd1602').setCursor(0, 1);
	$('#lcd1602').print(txt2);
}

$.ready(function (error) {
    if (error) {
    console.log(error);
        return;
    }
    
	// 监听
	netControl.listenCMD({
        exeCmd:function (cmd, power, temperature, mode) {
			if (power === "0" || power === "1") {
				air.setStatus(power, temperature, mode);
			} else {
				console.log(cmd);
				switch(cmd)
				{
					case "c0_00":
					  if (air.power === "1") {
						  air.power = "0";
					  } else {
						  air.power = "1";
					  }
					  break;
					case "c0_01":
					  if (parseInt(air.temperature) < 30) {
						air.temperature = parseInt(air.temperature)+1;
					  }
					  break;
					case "c0_02":
					  if (parseInt(air.temperature) > 16) {
					    air.temperature = parseInt(air.temperature)-1;
					  }
					  break;
					default:
					  setStatus("Command not found.", 0);
					  break;
				}
			}
			
			showStatus();
        },
        getReply: function () {
           return JSON.stringify({"success": getStatus()[0], "message": getStatus()[1]});
        }
    });
});

$.end(function () {
    
});
