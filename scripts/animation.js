const target = $("#target");
const scale = 2;

function position(E) {
    console.log(E)
    let start_pos = E.offset();
    return [start_pos.left, start_pos.top];
}
function getDimensions(E) {
    return [E.width(), E.height()];
}
function setDeltas(E, x, y) {
    E.css('--deltaX', `${x}px`);
    E.css('--deltaY', `${y}px`);
}
function runAnimation(animated) {
    [startX, startY] = position(animated);
    [width, height]  = getDimensions(animated);
    [targetX, targetY] = position(target);
    //height and width center the poster as apposed to targeting top left
    let deltaX = targetX - startX - width/2;
    let deltaY = targetY - startY - height/2;
    deltaX /= scale;
    deltaY /= scale;
    animated.addClass("animation");
    setDeltas(animated, deltaX, deltaY);
    animated.css("display", "block");
}
function restore(animated) {
    animated.removeClass("animation");
}