function MathFunction (f) {
    this.f = f;
}


MathFunction.prototype.render = function (screen) {
    var points = [];
    for (var i=0; i < screen.width; i++) {
        var coords = screen.pix2coords({x: i, y: 0});
        points.push({x: coords.x, y: this.f(coords.x)});
    };
    screen.drawLines(points, {lineWidth: 0.2});
};


MathFunction.prototype.getLocalVectors = function (x) {
    var epsilon = 0.0001;
    return new CoordinatePlane(new Vector(epsilon, this.f(x + epsilon) - this.f(x)));
};

