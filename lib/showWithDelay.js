/**
 * Licensed under MIT License
 * Copyright (c) 2017 Bernhard Grünewaldt
 */

//
// SHOW ALL SVG-Elements with 'frame-n' ID like 'frame-01, frame-02 ... frame-99'
// WITH A DELAY OF 2 SECONDS
//
const getElementsStartsWithId = function(id) {
    var children = document.getElementsByTagName('*');
    var elements = [], child;
    for (var i = 0, length = children.length; i < length; i++) {
        child = children[i];
        if (child.id.substr(0, id.length) == id)
            elements.push(child);
    }
    return elements;
};
const getFrameIdByNumber = function(number) {
    if (number < 10) {
        return 'frame-0' + number;
    }
    return 'frame-' + number;
};
const frames = getElementsStartsWithId('frame-');
var amountFrames = 0;
if (frames !== undefined && frames !== null && frames.length > 0) {
    amountFrames = frames.length;
}
for (var i=1;i<amountFrames+1;i++) {
    const frame = document.getElementById(getFrameIdByNumber(i));
    frame.style["animation-delay"] = (2*i) + 's';
    frame.style["opacity"] = 0;
    frame.setAttribute('class', 'showFrameAnimation');
}

