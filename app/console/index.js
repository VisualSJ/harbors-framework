'use strict';

exports.log = function (...args) {
    console.log(...args);
};
exports.info = function (...args) {
    console.info(...args);
};
exports.warn = function (...args) {
    console.warn(...args);
};
exports.error = function (...args) {
    console.error(...args);
};

/**
 * 编辑器内部 debugger 使用
 * @param args
 */
exports.debug = function (...args) {
    console.log(...args);
};