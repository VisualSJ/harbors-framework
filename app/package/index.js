'use strict';

const Item = require('./item');

const Console = require('../console');

var instanceId = 0;

var packages = {};
var name2id = {};
var path2id = {};

exports.getPackage = function (name) {
    var id = name2id[name];
    return packages[id];
};

exports.forEach = function (callback) {
    var keys = Object.keys(packages);
    keys.forEach(function (id) {
        callback(packages[id]);
    });
};

exports.load = function (path) {
    var pkg = new Item(path);
    packages[instanceId] = pkg;
    name2id[pkg.name] = instanceId;
    path2id[pkg.path] = instanceId;
    Console.debug(`Plug-in loaded - ${pkg.name}`);

    try {
        pkg.startup();
    } catch (error) {
        Console.error(error);
    }

    instanceId++;
};

exports.unload = function () {

};

exports.clear = function () {

};