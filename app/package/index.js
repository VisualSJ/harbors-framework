'use strict';

const Item = require('./item');

const Console = require('../console');

var  searchPath = [];

var instanceId = 0;

var packages = {};
var name2id = {};
var path2id = {};

exports.addSearchPath = function (path) {
    var array = searchPath;
    if (array.indexOf(path) === -1){
        array.push(path);
    }
};

exports.removeSearchPath = function (path) {
    var array = searchPath;
    var index = array.indexOf(path);
    if (index !== -1) {
        array.splice(index, 1);
    }
};

exports.clearSearchPath = function () {
    searchPath.length = 0;
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