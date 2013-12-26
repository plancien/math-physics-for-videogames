function createDemo() {
    
    var demo = {
        steps: 0,
        pause: false
    };
    
    
    addEventCapabilities(demo);


    demo.requestAnimationFrame = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };



    demo.onEachFrame = function(callback) {
        var _callback = function() {
            callback();
            requestAnimationFrame(_callback);
        };
        _callback();
    };


    demo.tick = function () {
        this.emit('animate', game.deltaTime);
        this.screen.clean();
        this.emit('render');
        this.steps += 1;
    };




    demo.initScreen = function () {
        this.canvas = document.getElementById('canvas');
        this.screen = new Screen(this.canvas);
        this.width  = this.screen.width;
        this.height = this.screen.height;
    };






    demo.initTime   = function () {
        this.time = 0.001 * (new Date()).getTime();
    };

    demo.updateTime = function () {
        var newTime     = 0.001 * (new Date()).getTime();
        this.deltaTime  = 0.03;//newTime - this.time;
        this.time       = newTime;
    };


    demo.pause = function () {
        this.paused = true;
    };

    demo.unPause = function () {
        this.paused = false;
        this.initTime();
    };

    demo.togglePause = function () {
        if (this.paused) {
            this.unPause();
        } else {
            this.pause();
        }
    };


    demo.initInputs = function () {

        addEventListener("keydown", function (e) {
            if (e.keyCode === 80) { //P key
                demo.togglePause();
            }

            if (e.keyCode === 39) { //right arrow key
                demo.tick();
            };
        }, false);

        window.onfocus = function () {
            if (demo.restartOnFocus) {
                demo.unPause();
            };
        };

        window.onblur  = function () {
            demo.restartOnFocus = !demo.paused;
            demo.pause();
        };

        $('#canvas').on('mousemove', function (e) {
            demo.mousePos = demo.screen.pix2coords({x: e.offsetX, y: e.offsetY});
            demo.emit('mousemove', demo.mousePos);
        });

        $('#canvas').on('mouseout', function (e) {
            demo.mousePos = false;
        });

    };



    $(function () {

        demo.initScreen();

        demo.initInputs();

        demo.initTime();

        demo.onEachFrame(function () {
            demo.updateTime();
            if (!demo.paused) {
                demo.tick();
            }
        });

    });
    
    
    return demo;

}
