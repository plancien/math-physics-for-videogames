function Cannon (params) {
    params              = params || {};
    this.pos            = params.pos || new Vector(0, 0);
    this.direction      = params.direction || new Vector(-1, 0);
    this.length         = typeof params.length === 'undefined' ? 3 : params.length;
    this.bulletVelocity = typeof params.bulletVelocity === 'undefined' ? 15 : params.bulletVelocity;
    this.bulletRadius   = typeof params.bulletRadius === 'undefined' ? 0.8 : params.bulletRadius;
    
    var cannon = this;
    game.on('render', function () {
        cannon.render(game.screen);
    });
}


Cannon.prototype.fire = function () {
    
    var startPos = this.pos.plus(this.direction.multiply(this.length + this.bulletRadius));
    var snowBall = new SnowBall({
        pos:         startPos,
        radius:      this.bulletRadius,
        velocity:    this.direction.multiply(this.bulletVelocity),
        onCollision: function () {
            this.explode();
            game.removeListener(snowBall.animateEvent);
            game.removeListener(snowBall.renderEvent);
        }
    });
    
    snowBall.animateEvent = game.on('animate', function (deltaTime) {
        snowBall.move(deltaTime); 
    });
    
    snowBall.renderEvent = game.on('render', function () {
        snowBall.render(game.screen);
    });
};


Cannon.prototype.render = function (screen) {
    screen.drawCircle(this.pos, 1, {color: '#555'});
    screen.drawLine(this.pos, this.direction.multiply(this.length), {color: '#555', lineWidth: 1});
};


