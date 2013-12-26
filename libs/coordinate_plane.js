
var deg2rad = Math.PI / 180;

function CoordinatePlane (angleOrIVector, origin) {
    this.origin = origin;
    
    if (typeof angleOrIVector === 'number') {
        this.i = new Vector(Math.cos(angleOrIVector * deg2rad), Math.sin(angleOrIVector * deg2rad));
    } else {
        this.i = angleOrIVector.normalize();
    }
    
    this.j = this.i.rotate90();
}