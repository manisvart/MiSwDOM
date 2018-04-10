/**
 * Yet another DOM wrapper library
 */

export class Element {
    constructor(type, optionalData, optionalDOM) {
        switch (type) {
            case undefined:
                this._dom = optionalDOM;
                break;
            case "text":
                var data = optionalData === undefined ? "…" : optionalData;
                this._dom = document.createTextNode(data);
                break;
            case "img":
                this._dom = document.createElement(type);
                this._dom.src = optionalData;
                break;
            default:
                this._dom = document.createElement(type);
        }
    }
    dom() {
        return this._dom;
    }
    /*
	 * Attributes
	 */
    attribute(attributes) {
        Object.keys(attributes).forEach(function (key) {
            this._dom[key] = attributes[key];
        }, this);
        return this;
    }
    attributeNS(attributes) {
        Object.keys(attributes).forEach(function (key) {
            this._dom.setAttributeNS(null, key, attributes[key]);
        }, this);
        return this;
    }
    /*
	 * Datasets
	 */
    dataset(data) {
        Object.keys(data).forEach(function (key) {
            this._dom.dataset[key] = data[key];
        }, this);
        return this;
    }
    /*
	 * Classes
	 */
    addClass(classes) {
        classes.split(" ").forEach(function (_class) {
            if (_class.length > 0) {
                this._dom.classList.add(_class);
            }
        }, this);
        return this;
    }
    removeClass(classes) {
        classes.split(" ").forEach(function (_class) {
            if (_class.length > 0) {
                this._dom.classList.remove(_class);
            }
        }, this);
        return this;
    }
    toggleClass(classes) {
        classes.split(" ").forEach(function (_class) {
            if (_class.length > 0) {
                this._dom.classList.toggle(_class);
            }
        }, this);
        return this;
    }
    /*
	 * Styles
	 */
    style(styles) {
        Object.keys(styles).forEach(function (key) {
            this._dom.style[key] = styles[key];
        }, this);
        return this;
    }
    /*
	 * DOM children
	 */
    add(child) {
        this.addChildren([child]);
        return this;
    }
    addChildren(children) {
        children.forEach(function (child) {
            this._dom.appendChild(child.dom());
        }, this);
        return this;
    }
    removeChildren() {
        while (this._dom.firstChild) {
            this._dom.removeChild(this._dom.firstChild);
// this._dom.firstChild.remove();
        }
        return this;
    }
    replaceChildren(children) {
        this
                .removeChildren()
                .addChildren(children);
        return this;
    }
    insertChild(child, element) {
    	this.insertChildren([child], element);
    	return this;
    }
    insertChildren(children, element) {
        children.forEach(function (child) {
        	this._dom.insertBefore(child.dom(), element.dom());
        }, this);
        return this;    	
    }
    readChild(childNo) {
        return this.dom().childNodes[childNo];
    }
    /*
	 * Attach to another element
	 */
    attachTo(element) {
        element.dom().appendChild(this._dom);
        return this;
    }
    /*
	 * Attach to another element, DOM to DOM
	 */
    attachToDOM(dom) {
        dom.appendChild(this._dom);
        return this;
    }
}

export class SVG extends Element {
    svg(width, height) {
        this._dom = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this
                .attributeNS({
// "xmlns": "http://www.w3.org/2000/svg",
// "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    "version": "1.2",
                    "baseProfile": "tiny",
                    "width": width,
                    "height": height
                })
                ;
        return this;
    }
    defs() {
        this._dom = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        return this;
    }
    rect(x = 10, y = 10, height = 100, width = 200, rx = 15, ry = 15) {
        this._dom = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.attributeNS({x: x, y: y, height: height, width: width, rx: rx, ry: ry});
        return this;
    }
    text(x, y, svgtext, textLength, lengthAdjust) {
        this._dom = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.attributeNS({x: x, y: y});

        if (textLength !== undefined)
            this.attributeNS({"textLength": textLength});

        if (lengthAdjust !== undefined)
            this.attributeNS({"lengthAdjust": lengthAdjust});

        this.addChildren([new Element("text", svgtext)]);
        return this;
    }
}
