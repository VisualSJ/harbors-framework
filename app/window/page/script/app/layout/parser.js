'use strict';

class Dock {
    constructor () {
        this.parent = null;
        this.children = [];
        this.element = document.createElement('div');
        this.element.classList.add('dock');
    }

    // row | column
    get direction () {
        this.element.getAttribute('direction')
    }
    set direction (str) {
        this.element.setAttribute('direction', str);
    }
    
    get minHeight () {}
    set minHeight (str) {
        this.element['style']['min-height'] = str;
    }

    get minWidth () {}
    set minWidth (str) {
        this.element['style']['min-width'] = str;
    }

    get resize () {}
    set resize (bool) {}

    get width () {}
    set width (num) {}

    get height () {}
    set height (num) {}

    get flex () {}
    set flex (num) {
        this.element['style']['flex'] = num;
    }

    mount (element) {
        element.appendChild(this.element);
    }

    appendChild (child) {
        this.children.push(child);
        child.parent = this;
        this.element.appendChild(child.element);
    }
}

class Block {
    constructor () {
        this.parent = null;
        this.element = document.createElement('div');
        this.element.classList.add('block');
    }

    get minHeight () {}
    set minHeight (num) {}

    get minWidth () {}
    set minWidth (num) {}

    get resize () {}
    set resize (bool) {}

    get width () {}
    set width (strOrNum) {}

    get height () {}
    set height (strOrNum) {}

    get flex () {}
    set flex (num) {
        this.element['style']['flex'] = num;
    }
}

var parseDock = function (json) {
    var options = json.options;
    var children = json.children;
    var dock = new Dock();
    dock.direction = options.direction;
    dock.minHeight = options.minHeight;
    dock.minWidth = options.minWidth;
    dock.resize = options.resize;
    dock.width = options.width;
    dock.height = options.height;
    dock.flex = options.flex;

    children.forEach(function (childJson) {
        var child;
        if (childJson.type === 'dock') {
            child = parseDock(childJson);
        } else if (childJson.type === 'block') {
            child = parseBlock(childJson);
        }

        if (child)
            dock.appendChild(child);

        var line = document.createElement('div');
        line.classList.add('line');
        dock.element.appendChild(line);
    });

    return dock;
};

var parseBlock = function (json) {
    var options = json.options;
    var block = new Block();
    block.minHeight = options.minHeight;
    block.minWidth = options.minWidth;
    block.width = options.width;
    block.height = options.height;
    block.flex = options.flex;
    return block;
};

exports.parse = function (json) {
    return parseDock(json);
};