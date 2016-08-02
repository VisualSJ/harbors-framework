'use strict';

const Path = require('path');
const ChildProcess = require('child_process');

exports.options = function () {

};

exports.run = function () {
    var electronPath = Path.join(__dirname, './node_modules/electron-prebuilt/dist/electron.exe');
    var appPath = Path.join(__dirname, './app');

    var child = ChildProcess.exec(`start ${electronPath} ${appPath}`, function (error, stdout, stderr) {

    });

    // todo
};