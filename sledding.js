function Sledding (params) {
    params          = params || {};
    var x           = params.x || 0;
    this.pos        = new Vector(x, game.ground.f(x));
    this.velocity   = params.velocity || new Vector(1, 0);
    this.mass       = 50;   // the mass does not affect movement in any way here (change it to verify). It's here only to clarify physics formulas.
    this.friction   = 130;  // arbitrary number : the friction law here is not based on a true physic law.
    
    this.totalEnergy = this.potentialEnergy() + this.kineticEnergy();   // Energy conservation law
    
    var sledding = this;
    
    game.on('animate', function (deltaTime) {
        sledding.move(deltaTime);
    });
    
    game.on('render', function () {
        sledding.render(game.screen);
    });
}


Sledding.prototype.potentialEnergy = function () {
    return this.mass * 20 * this.pos.y;   // Potential Energy = mass * gravity * height
};


Sledding.prototype.kineticEnergy = function () {
    return 0.5 * this.mass * Math.pow(this.velocity.length(), 2);  // Kinetic Energy = 1/2  mass * v^2
};


Sledding.prototype.move = function (deltaTime) {
    var kineticEnergy = this.totalEnergy - this.potentialEnergy();
    if (kineticEnergy < 0) {
        return;
    }
    
    var speed = Math.sqrt(2 * kineticEnergy / this.mass);        // directly deduced from the formula : Kinetic Energy = 1/2  mass * v^2
    
    this.localVectors   = game.ground.getLocalVectors(this.pos.x);
    this.velocity       = this.localVectors.i.multiply(speed);   // we constrain the sledding to follow the curve
    
    this.totalEnergy   -= this.friction * speed * deltaTime;     // fake friction formula, but gives reallistic results : sledding loses energy proportionnal to the distance
    
    this.pos.x         += this.velocity.x * deltaTime;
    this.pos.y          = game.ground.f(this.pos.x);             // we constrain the sledding to follow the curve
};


Sledding.prototype.render = function (screen) {
    var length = 2;
    var height = 1;
    var rearBottom   = this.pos.minus(this.localVectors.i.multiply(0.5 * length));
    var rearTop      = rearBottom.plus(this.localVectors.j.multiply(height));
    var frontBottom  = rearBottom.plus(this.localVectors.i.multiply(length));
    var frontTop     = rearTop.plus(this.localVectors.i.multiply(1.3*length));
    screen.drawLines([rearBottom, frontBottom, frontTop, rearTop, rearBottom], {color: '#F00', lineWidth: 0.4});
};