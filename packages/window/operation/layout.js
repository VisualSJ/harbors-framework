'use strict';

const MainWindow = Editor.Window.getMainWindow();

// 记录 layout
var layout = null;

MainWindow.webContents.on('did-finish-load', function () {
    if (!layout) return;
    MainWindow.webContents.send('layout/refresh', layout);
});

exports.listenFrom = function (pkg) {
    pkg.listen('layout/init', function (json) {
        layout = json;
        MainWindow.webContents.send('layout/refresh', json);
    });
};