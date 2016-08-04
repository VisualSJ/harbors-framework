'use strict';

exports.load = function (pkg) {
    Editor.Panel.register(pkg, './index.html');
};

exports.unload = function () {
    Editor.Panel.unregister(pkg);
};