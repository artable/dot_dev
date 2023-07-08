const target = $("#target");

function position(E) {
    console.log(E)
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
    let maxHeight = (parseFloat(target.css("margin-top")) + 
                 parseFloat(target.css("margin-bottom")) +
                 target.height()) * .95;
    let maxWidth = (parseFloat(target.css("margin-left")) + 
                 parseFloat(target.css("margin-right")) +
                 target.width()) * .95;

    let maxScaleX = maxWidth / E.width();
    let maxScaleY = maxHeight / E.height();
    return Math.min(maxScaleX, maxScaleY);
}
function runAnimation(animated) {
    [startX, startY] = position(animated);
    [width, height]  = getDimensions(animated);
    [targetX, targetY] = position(target);
    let scale = computeScale(animated);
    console.log(scale);
    //height and width center the poster as apposed to targeting top left
    let deltaX = targetX - startX - width/2;
    let deltaY = targetY - startY - height/2;
    deltaX /= scale;
    deltaY /= scale;
    animated.addClass("animation");
    setDeltas(animated, deltaX, deltaY, scale);
    animated.css("display", "block");
}
function restore(animated) {
    animated.removeClass("animation");
}