'use strict';

const Path = require('path');
const ChildProcess = require('child_process');

var app = Path.join(__dirname, '../');
ChildProcess.spawn('./node_modules/electron-prebuilt/dist/electron.exe', ['./'], {
    cwd: app,
    stdio: 'inherit'
});