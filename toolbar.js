$(function () {
    
    $('body').append('<button id="zoom">zoom</button>');
    $('body').append('<button id="unzoom">unzoom</button>');
    $('body').append('<button id="debug">debug</button>');
    $('body').append('<button id="pause">pause</button>');
    
    $('#zoom').click(function () {
        game.screen.scale *= 1.5;
        game.emit('zoom changed');
    });
    
    $('#unzoom').click(function () {
        game.screen.scale /= 1.5;
        game.emit('zoom changed');
    });
    
    $('#debug').click(function () {
        debug = !debug;
    });
    
    $('#pause').click(function () {
        game.togglePause();
    });
    
});