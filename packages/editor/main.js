'use strict';

exports.load = function (pkg) {
    Editor.Panel.register(pkg, './index.html');
};

exports.unload = function (pkg) {
    Editor.Panel.unregister(pkg);
};