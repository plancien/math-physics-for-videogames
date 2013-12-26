function SnowBall (params) {
    params              = params || {};
    this.pos            = params.pos      || new Vector(0, 0);
    this.velocity       = params.velocity || new Vector(0, 0);
    this.radius         = typeof params.radius === 'undefined' ? 1 : params.radius;
    this.mass           = 10; // the mass does not affect movement in any way here (change it to verify). It's here only to clarify physics formulas.
    this.onCollision    = params.onCollision;
}


SnowBall.prototype.move = function (deltaTime) {
    var gravityForce    = new Vector(0, -20 * this.mass);     // here 20 is in an arbitrary unit
    this.acceleration   = gravityForce.multiply(1/this.mass); // law of Newton : acceleration = (sum of all forces) / mass
    
    this.oldVelocity    = this.velocity.clone();
    this.velocity       = this.velocity.plus(this.acceleration.multiply(deltaTime));    // acceleration is the variation of velocity per unit time
    
    this.meanVelocity   = this.oldVelocity.plus(this.velocity).multiply(0.5);           // smoothing of velocity change through the timestep 
    
    this.pos            = this.pos.plus(this.meanVelocity.multiply(deltaTime));         // velocity is the variation of position per unit time
    
    this.checkCollision();    
};


SnowBall.prototype.checkCollision = function () {
    var yMax = game.ground.f(this.pos.x) + this.radius;
    if (this.pos.y < yMax) {
        this.pos.y = yMax;
        this.velocity = new Vector(0, 0);
        if (this.onCollision) {
            this.onCollision.apply(this);
        }
    }
};


SnowBall.prototype.render = function (screen) {
    screen.drawCircle(this.pos, this.radius, {color: '#FFF', strokeColor: '#444'});
};


SnowBall.prototype.throwMiniBall = function () {
    var angle     = Math.random() * 2 * Math.PI;
    var direction = new Vector(Math.cos(angle), Math.sin(angle));
    
    var miniBall  = new SnowBall({
        pos:         this.pos.clone(),
        radius:      0.3,
        velocity:    direction.multiply(5 + Math.random() * 5),
        onCollision: function () {
            // miniball will disappear
            game.removeListener(miniBall.animateEvent);
            game.removeListener(miniBall.renderEvent);
        }
    });
    
    miniBall.animateEvent = game.on('animate', function (deltaTime) {
        miniBall.move(deltaTime);
    });

    miniBall.renderEvent = game.on('render', function () {
        miniBall.render(game.screen);
    });
};


SnowBall.prototype.explode = function () {
    var miniBallsCount = 15;
    for (var i=0; i < miniBallsCount; i++) {
        this.throwMiniBall();
    };
};


