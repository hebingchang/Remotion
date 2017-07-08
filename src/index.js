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
var flag = true;
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

$.ready(function (error) {
    if (error) {
    console.log(error);
        return;
    }
    netControl.listenCMD({
        exeCmd:function (cmd) {
            if (cmd == 'openLED') {
                controlRelay(true)
                flag = true;
            } else if (cmd == 'closeLED') {
                controlRelay(false)
                flag = true;
            } else {
                flag = false;
                errorMsg = "Command not found.";
            }
        },
        getReply: function () {
          if (flag == true) {
            return JSON.stringify({"success": flag, "open": relayOpen});
          } else {
            return JSON.stringify({"success": flag, "msg": errorMsg});
          }
        }
    });
});

$.end(function () {
    $('#led-b').turnOff(function () { 
        console.log('turn off');
    });
});
