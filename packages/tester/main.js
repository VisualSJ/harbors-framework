'use strict';

exports.load = function (pkg) {
    pkg.listen('open-panel', function () {
        pkg.log('open-panel');
    });
};

exports.unload = function () {

};