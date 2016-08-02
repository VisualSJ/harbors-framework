'use strict';

const Fs = require('fs');
const Path = require('path');

global.Editor = require('./editor');
Editor.Console = require('./console');

Editor.Window = require('./window');
Editor.Notification = null;
Editor.Package = require('./package');

/**
 * 启动后，首先执行的初始化操作
 */
Editor.once('ready', function () {
    Editor.Window.startup(function () {
        Editor.emit('window-ready');
    });
});

/**
 * windows 初始化成功后，加载默认的插件
 */
Editor.once('window-ready', function () {
    var pkgPath = Path.join(__dirname, '../packages');
    var list = Fs.readdirSync(pkgPath);
    list.forEach(function (pkg) {
        var path = Path.join(pkgPath, pkg);
        Editor.Package.load(path);
    });
});