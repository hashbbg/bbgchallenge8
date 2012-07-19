window.onload = function() {
    if (!Function.prototype.bind) {
      Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
          // closest thing possible to the ECMAScript 5 internal IsCallable function
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                try {
              return fToBind.apply(this instanceof fNOP
                                     ? this
                                     : oThis,
                                   aArgs.concat(Array.prototype.slice.call(arguments)));
                } catch(e) {
                    //catching what javascriptcore considers an illegal use of instanceof
                    return fToBind.apply(oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                }
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
      };
    }    
    
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
                       window.msRequestAnimationFrame || 
                        function( callback ){
                            window.setTimeout(callback, 1000 / 60);
                        };

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

