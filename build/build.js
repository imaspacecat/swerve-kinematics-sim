var jX, jY;
var sliderE;
var sliderVal;
var actualJX, actualJY;
function setup() {
    createCanvas(750, 750);
    stroke(0);
    fill(0);
    jX = width / 2;
    jY = height / 2;
    sliderE = createSlider(-180, 180, 0);
    sliderE.position(width / 8, height * 2 / 3 + 20);
    sliderE.style('width', '80px');
    sliderE.size(200);
    textSize(20);
}
function draw() {
    background(220);
    joystick();
    slider();
    swerve();
}
function swerve() {
    pod(width * 3 / 4 - 50, height / 4, podPositions["backLeft"]);
    pod(width * 3 / 4 + 50, height / 4, podPositions["backRight"]);
    pod(width * 3 / 4 - 50, height / 4 - 100, podPositions["frontLeft"]);
    pod(width * 3 / 4 + 50, height / 4 - 100, podPositions["frontRight"]);
}
function arrow(x1, y1, x2, y2, color) {
    strokeWeight(4);
    stroke(color);
    line(x1, y1, x2, y2);
    var offset = 6;
    var angle = atan2(y1 - y2, x1 - x2);
    push();
    translate(x2, y2);
    rotate(angle - HALF_PI);
    fill(color);
    triangle(-offset * 0.5, offset, offset * 0.5, offset, 0, -offset / 2);
    pop();
    fill(0);
    stroke(0);
    strokeWeight(1);
}
var podPositions = {
    "frontRight": [1, 1],
    "frontLeft": [1, -1],
    "backRight": [-1, 1],
    "backLeft": [-1, -1]
};
function pod(x, y, position) {
    var podW = 10;
    var podH = 20;
    stroke(color(255, 0, 0));
    strokeWeight(2);
    rect(x, y, podW, podH);
    stroke(0);
    strokeWeight(1);
    var centerX = x + podW / 2;
    var centerY = y + podH / 2;
    var translationalX = 40 * actualJX;
    var translationalY = -40 * actualJY;
    arrow(centerX, centerY, centerX + translationalX, centerY + translationalY, color(0, 255, 0));
    var rotationalX = sliderVal / 180 * 40 * position[0];
    var rotationalY = sliderVal / 180 * 40 * position[1];
    if (rotationalX != 0 && rotationalY != 0) {
        arrow(centerX, centerY, centerX + rotationalX, centerY + rotationalY, color(0, 0, 255));
    }
    var vSumX = translationalX + rotationalX;
    var vSumY = translationalY + rotationalY;
    arrow(centerX, centerY, centerX + vSumX, centerY + vSumY, color(148, 0, 211));
    textSize(14);
    text("||vSum||: " + sqrt(sq(vSumX) + sq(vSumY)).toFixed(1), centerX - 20, centerY + 30);
    textSize(20);
}
function slider() {
    sliderVal = sliderE.value();
    text(sliderVal + " degrees", width / 8, height * 2 / 3 + 20);
}
function joystick() {
    line(0, height / 4, width / 2, height / 4);
    line(width / 4, 0, width / 4, height / 2);
    if (mouseIsPressed == true &&
        mouseX <= width / 2 && mouseY <= height / 2 &&
        mouseX >= 0 && mouseY >= 0) {
        jX = mouseX;
        jY = mouseY;
    }
    ellipse(jX, jY, 20, 20);
    actualJX = 2 * (jX / (width / 2) - 0.5);
    actualJY = -2 * (jY / (height / 2) - 0.5);
    text("Joystick x: " + actualJX.toFixed(3) +
        "\nJoystick y: " + actualJY.toFixed(3) +
        "\nJoystick θ: " + (atan2(actualJY, actualJX) * 180 / PI).toFixed(3) + "°" +
        "\nrelative ||joystick||: " + (sqrt(sq(actualJX) + sq(actualJY)) / sqrt(2) * 100)
        .toFixed(3) + "%", 10, height / 2 + 20);
}
//# sourceMappingURL=build.js.map