var game = createDemo();



game.ground = new MathFunction (function (x) {
    return (10 - x/10) * (Math.cos(x/6) + 1);
});

game.on('render', function () {
   game.ground.render(game.screen);
});




game.sledding = new Sledding({x: 0});


game.cannon = new Cannon({
    pos: new Vector(30, 30)
});

game.on('mousemove', function (mousePos) {
    game.cannon.direction = (new Vector(mousePos.x, mousePos.y)).minus(game.cannon.pos).normalize();
});


$(function () {
    
    $('body').append('<button id="zoom">zoom</button>');
    $('body').append('<button id="unzoom">unzoom</button>');
    $('body').append('<button id="debug">debug</button>');
    $('body').append('<button id="pause">pause</button>');
    
    $('#zoom').click(function () {
        game.screen.scale *= 1.5;
    });
    
    $('#unzoom').click(function () {
        game.screen.scale /= 1.5;
    });
    
    $('#debug').click(function () {
        debug = !debug;
    });
    
    $('#pause').click(function () {
        game.togglePause();
    });
    
    game.screen.center = {
        x: 38,
        y: 15
    };

    game.screen.scale = 10;
    
    
    $('#canvas').click(function () {
        game.cannon.fire();
    });
});



var debug = false;


game.on('render', function () {
    if (debug) {
        if (game.mousePos) {
            var posOnCurve = new Vector(game.mousePos.x, game.ground.f(game.mousePos.x));
            this.screen.drawCircle(posOnCurve, 1);
            var vects = game.ground.getLocalVectors(posOnCurve.x);
            this.screen.drawLine(posOnCurve, vects.i.multiply(5));
            this.screen.drawLine(posOnCurve, vects.j.multiply(5), {color: '#070'});
        }
    }
});



