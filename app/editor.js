'use strict';

const Events = require('events');

const Electron = require('electron');
const App = Electron.app;

var eventManager = new Events.EventEmitter();

exports.on = function (...args) {
    eventManager.on(...args);
};

exports.once = function (...args) {
    eventManager.once(...args);
};

exports.emit = function (...args) {
    eventManager.emit(...args);
};

App.on('ready', function (...args) {
    exports.emit('electron-ready', ...args);
});

var packageManager = require('./package');
var pkgMessage = require('./package/message');
exports.send = function (url, ...args) {
    var split = url.split('://');
    var protocol = split[0];
    var msg = split[1];

    if (protocol === 'all') {
        return packageManager.forEach(function (pkg) {
            pkgMessage.emit(pkg.name + '://' + msg, ...args);
        });
    }

    pkgMessage.emit(url, ...args);
};