'use strict';

const Path = require('path');

const Electron = require('electron');
const BrowserWindow = Electron.BrowserWindow;

const Console = require('../console');
const Ajax = require('./core/ajax');


var instanceId = 0;
var main = null;
var windows = {};

var openWindow = function (url, options, callback) {

    options = options || {
            width: 800,
            height: 600,
            show: false
            // autoHideMenuBar: true
        };

    var win = new BrowserWindow(options);
    windows[instanceId++] = win;

    url = Path.join(__dirname, url);
    win.loadURL(url);
    win.show();

    win.webContents.on('did-finish-load', () => {
        Console.debug('Editor.Window ready.');
        callback();
        // win.webContents.send('init-layout', layout);
    });
    return win;
};

exports.startup = function (callback) {
    if (main) return Console.error('Editor.Windows has already started.');
    main = openWindow('./page/main.html', null, callback);
};

exports.open = function () {
    if (!main) Console.error('Editor.Window not ready yet.');
    openWindow();
};

exports.clear = function () {
    
};