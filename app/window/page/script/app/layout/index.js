'use strict';

const Parser = require('./parser');

var Container = document.getElementById('container');

exports.save = function () {

};

exports.restore = function () {

};

exports.refresh = function (json) {
    var dock = Parser.parse(json);
    dock.mount(Container);
};


const Electron = require('electron');
const Ipc = Electron.ipcRenderer;

Ipc.on('refresh-layout', function (event, json) {
    exports.refresh(json);
});