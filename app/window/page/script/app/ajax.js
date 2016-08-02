'use strict';

const Electron = require('electron');
const Ipc = Electron.ipcRenderer;

var manager = {};
var instanceId = 1;
Ipc.on('ajax-forwarding-reply', function (event, id, ...args) {
    var callback = manager[id];
    if (!callback) {
        return;
    }
    callback(null, ...args);
});

exports.get = function (url, data, callback) {
    var options = {
        reply: false
    };
    if (callback) {
        manager[instanceId] = callback;
        options.reply = instanceId;
    }
    Ipc.send('ajax-forwarding', options, url, data);
    instanceId++;
};