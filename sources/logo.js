window.onload = function() {
    var canvas = document.getElementById('hash-bbg-logo');
    canvas.width = 500;
    canvas.height = 280;
    var ctx = canvas.getContext('2d');
    var imageNames = ['hash', 'letters'];
    var images = {};
    var loaded = 0;
    var phase = 0;
    var lastDraw = null;
    var reqAnimFrame = window.requestAnimationFrame       || 
                       window.webkitRequestAnimationFrame || 
                       window.mozRequestAnimationFrame    || 
                       window.oRequestAnimationFrame      || 
                       window.msRequestAnimationFrame;

    for(var i = 0 ; i < imageNames.length ; i++) {
        images[imageNames[i]] = new Image;
        images[imageNames[i]].onload = function() {
            loaded += 1;
            if(loaded === imageNames.length) {
                reqAnimFrame(drawLoop);
            }
        };
        images[imageNames[i]].src = 'images/' + imageNames[i] + '.png';
    }


    function update() {
        phase += 0.05;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var amp = 10;
        var offset1 = amp * Math.sin(phase);
        var offset2 = amp * Math.sin(phase + 1);
        var offset3 = amp * Math.sin(phase + 2);

        ctx.drawImage(images.hash, 0, 0);
        
        ctx.drawImage(images.letters, 0, 0, 60, 108,
         180, 70 + offset1, 60, 108);
        ctx.drawImage(images.letters, 77, 0, 60, 108,
         250, 70 + offset2 , 60, 108);
        ctx.drawImage(images.letters, 154, 0, 60, 144,
         317, 70 + offset3, 60, 144);
    }

    function drawLoop(time) {
        if(lastDraw === null) {
            lastDraw = time;
        }
        if(time - lastDraw > 1000 / 60) {
            lastDraw = time;
            update();
            draw();
        }
        reqAnimFrame(drawLoop);
    }
};

