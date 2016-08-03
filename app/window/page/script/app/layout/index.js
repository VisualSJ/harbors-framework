'use strict';

const Parser = require('./parser');

var Container = document.getElementById('container');

exports.save = function () {

};

exports.restore = function () {

};

exports.refresh = function (json) {
    json = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, './layout.json')) + '');

    var dock = Parser.parse(json);
    dock.mount(Container);
    console.log(dock);
};