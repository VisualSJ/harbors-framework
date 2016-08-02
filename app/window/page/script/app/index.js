'use strict';

const Electron = require('electron');

exports.log = function (...args) {
    console.log(...args);
};
exports.info = function (...args) {
    console.info(...args);
};
exports.warn = function (...args) {
    console.warn(...args);
};
exports.error = function (...args) {
    console.error(...args);
};

exports.Layout = require('./layout');
exports.Ajax = require('./ajax');

exports.remote = Electron.remote.getGlobal('Editor');