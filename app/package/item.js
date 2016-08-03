'use strict';

const Path = require('path');
const Fs = require('fs');

const Console = require('../console');
const Message = require('./message');

const PATH = Symbol('path');
const CONFIG = Symbol('config');
const MODULE = Symbol('module');

class Package {
    constructor (path) {
        this[PATH] = path;
        this[CONFIG] = getConfig(path);
    }

    get path () {
        return this[PATH];
    }

    get name () {
        return this[CONFIG].name;
    }

    get version () {
        return this[CONFIG].version;
    }

    // 启动关闭流程
    startup () {
        var path = Path.join(this[PATH], this[CONFIG].main);
        try {
            this[MODULE] = require(path);
            this[MODULE].load(this);
        } catch (error) {
            Console.error(`Failed to load the plug-in - main.js (${path})`);
        }
    }
    shutdown () {

    }
    restart () {

    }

    // 控制台信息
    log (msg, ...args) {
        Console.log(`[${this[CONFIG].name}] ${msg}`, ...args);
    }
    info () {}
    warn () {}
    error () {}

    // 监听消息
    listen (msg, ...args) {
        msg = msg.replace(/^\//, '');
        var name = this[CONFIG].name;
        Message.on(name + '://' + msg, ...args);
    }
}

var getConfig = function (path) {

    var info = {
        'name': 'unknown',
        'version': '0.0.1',
        'main': 'main.js'
    };

    var jsonPath = Path.join(path, './package.json');
    var exists = Fs.existsSync(jsonPath);
    if (!exists) {
        Console.warn(`Failed to load the plug-in (${path})`);
        return info;
    }

    var buffer = Fs.readFileSync(jsonPath);
    var string = buffer + '';
    var json = JSON.parse(string);

    info.name = json.name;
    info.version = json.version;
    info.main = json.main;

    return info;
};

module.exports = Package;