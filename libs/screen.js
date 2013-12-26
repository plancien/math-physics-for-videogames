function Screen (canvas) {
    this.canvas = canvas;
    this.cx     = canvas.getContext('2d');
    this.width  = canvas.width;
    this.height = canvas.height;
    this.centerPix = {
        x: 0.5 * this.width,
        y: 0.5 * this.height
    };
    this.scale  = 1;
    this.center = {x: 0, y: 0};
};


Screen.prototype.clean = function () {
    this.cx.clearRect(0, 0, this.width, this.height);
};


Screen.prototype.coords2pix = function (coords) {
    return {
        x: this.centerPix.x + this.scale * (coords.x - this.center.x),
        y: this.centerPix.y - this.scale * (coords.y - this.center.y)
    };
};


Screen.prototype.pix2coords = function (pix) {
    return {
        x: this.center.x + (pix.x - this.centerPix.x) / this.scale,
        y: this.center.y - (pix.y - this.centerPix.y) / this.scale
    };
};


Screen.prototype.drawCircle = function (origin, radius, params) { 
    params = params || {};
    this.cx.beginPath();
    var originPix = this.coords2pix(origin);
    this.cx.arc(originPix.x, originPix.y, this.scale * radius, 0, Math.PI * 2);
    this.cx.fillStyle = params.color || '#F00';
    this.cx.fill();
    if (params.strokeColor) {
        this.cx.lineWidth   = params.lineWidth || 1;
        this.cx.strokeStyle = params.strokeColor;
        this.cx.stroke();
    }
};


Screen.prototype.drawLine = function (origin, vector, params) {
    params = params || {};
    this.cx.beginPath();
    var originPix = this.coords2pix(origin);
    this.cx.moveTo(originPix.x, originPix.y);
    this.cx.lineTo(originPix.x + this.scale * vector.x, originPix.y - this.scale * vector.y);
    this.cx.lineWidth   = this.scale * (typeof params.lineWidth === 'undefined' ? 2 : params.lineWidth);
    this.cx.strokeStyle = params.color || '#F0F';
    this.cx.stroke();
};


Screen.prototype.drawLines = function (points, params) {
    params = params || {};
    
    this.cx.beginPath();
    
    var originPix = this.coords2pix(points[0]);
    this.cx.moveTo(originPix.x, originPix.y);
    
    for (var i=1; i < points.length; i++) {
        originPix = this.coords2pix(points[i]);
        this.cx.lineTo(originPix.x, originPix.y);
    };
    
    this.cx.strokeStyle = params.color || '#000';
    this.cx.lineWidth   = this.scale * (typeof params.lineWidth === 'undefined' ? 2 : params.lineWidth);
    this.cx.stroke();
};