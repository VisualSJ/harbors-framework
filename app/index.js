'use strict';

const Fs = require('fs');
const Path = require('path');

console.log('==== Initialization editor ====');

global.Editor = require('./editor');
Editor.Console = require('./console');

Editor.Window = require('./window');
Editor.Notification = null;
Editor.Package = require('./package');
Editor.Panel = require('./panel');

/**
 * 启动后，首先执行的初始化操作
 */
Editor.once('electron-ready', function () {
    Editor.Window.startup(function () {
        // window 初始化成功后，开始加载插件
        var pkgPath = Path.join(__dirname, '../packages');
        var list = Fs.readdirSync(pkgPath);
        list.forEach(function (pkg) {
            var path = Path.join(pkgPath, pkg);
            Editor.Package.load(path);
        });

        // 内部插件加载完成
        // 发送 ready 事件
        Editor.emit('ready');
    });
});

module.exports = Editor;