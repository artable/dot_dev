const target = $("#target");

function position(E) {
    let start_pos = E.offset();
    return [start_pos.left, start_pos.top];
}
function getDimensions(E) {
    return [E.width(), E.height()];
}
function setDeltas(E, x, y, scale) {
    E.css('--deltaX', `${x}px`);
    E.css('--deltaY', `${y}px`);
    E.css('--scale',  `${scale}`);
}

function computeScale(E) {
    // take up max 95% of the container
    let maxHeight = target.parent().height() * .95;
    let maxWidth = target.parent().width() * .95;
    console.log(parseFloat(target.css("margin-left")));
    console.log(`w/h: (${maxWidth}, ${maxHeight})`)
    let maxScaleX = maxWidth / E.width();
    let maxScaleY = maxHeight / E.height();
    console.log(`maxes: (${maxScaleX}, ${maxScaleY})`)
    return Math.min(maxScaleX, maxScaleY);
}
function runAnimation(animated) {
    [startX, startY] = position(animated);
    [width, height]  = getDimensions(animated);
    [targetX, targetY] = position(target);
    let scale = computeScale(animated);
    //height and width center the poster as apposed to targeting top left
    let deltaX = targetX - startX - width/2;
    let deltaY = targetY - startY - height/2;
    deltaX /= scale;
    deltaY /= scale;
    console.log(`(${deltaX}, ${deltaY}, [${scale}])`)
    animated.addClass("animation");
    setDeltas(animated, deltaX, deltaY, scale);
    animated.css("display", "block");
}
function restore(animated) {
    animated.removeClass("animation");
}