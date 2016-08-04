'use strict';

var Fs = require('fs');
var Path = require('path');
var Editor = require('./app');

Editor.once('ready', function () {
    Editor.Console.debug('Editor ready');
    var file = Path.join(__dirname, './default/layout.json');
    var buffer = Fs.readFileSync(file);
    var string = buffer + '';
    var json = JSON.parse(string);

    Editor.send('window://layout/init', json);
});