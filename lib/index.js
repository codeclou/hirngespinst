/**
 * Licensed under MIT License
 * Copyright (c) 2017 Bernhard Grünewaldt
 */

const getElementsStartsWithId = (id) => {
    var children = document.getElementsByTagName('*');
    var elements = [], child;
    for (var i = 0, length = children.length; i < length; i++) {
        child = children[i];
        if (child.id.substr(0, id.length) == id)
            elements.push(child);
    }
    return elements;
};

const frames = getElementsStartsWithId('frame-');
let amountFrames = 0;
if (frames !== undefined && frames !== null && frames.length > 0) {
    amountFrames = frames.length;
}

console.log(amountFrames);
console.log('init');
