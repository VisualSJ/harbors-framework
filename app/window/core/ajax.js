'use strict';

const Electron = require('electron');
const Ipc = Electron.ipcMain;

var noReply = function () {

};

Ipc.on('ajax-forwarding', function (event, options, url, data) {
    if (options.reply) {
        event.reply = function (...args) {
            event.sender.send('ajax-forwarding-reply', options.reply, ...args);
        };
    } else {
        event.reply = noReply;
    }
    // todo 转发到插件
});