'use strict';

const Events = require('events');

var eventManager = new Events.EventEmitter();

exports.on = function (...args) {
    eventManager.on(...args);
};

exports.once = function (...args) {
    eventManager.once(...args);
};

exports.emit = function (...args) {
    eventManager.emit(...args);
};