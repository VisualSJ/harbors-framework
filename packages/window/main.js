'use strict';

const Operation = require('./operation');

exports.load = function (pkg) {
    Operation.listenFrom(pkg);
};

exports.unload = function () {

};