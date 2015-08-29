var colorSpectrum = function(){
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = 60;
  canvas.id = 'c1-spectrum';
  canvas.classList.add('c1-hidden');

  document.body.appendChild(canvas);

  var colorsInScroll = 30;
  var toSkip = Math.round(colors.length/colorsInScroll);
  var localColors = [];
  if (toSkip > 0) {
    for (var i=0, l=colors.length; i<l; i+=toSkip) {
      localColors.push(colors[i]);
    }
  } else {
    localColors = colors;
  }

  var pos = 0;
  var affectedColors = 20;
  var colorsNumber = localColors.length;
  var colorSize = (canvas.height/localColors.length);
  var activeColorSize = 60;

  var draw = function(activeColor){
    canvas.height = document.documentElement.clientHeight;
    pos = 0;
    localColors.forEach(function(color, index) {
      var posX = 30;
      var tempSize = (canvas.height/localColors.length);
      if (color.color.charAt(0) === '#') {
        ctx.fillStyle = color.color;
        ctx.fillRect(posX, pos, 100, tempSize);
      } else {
        var image = new Image();
        image.src = dir + color.color;
        ctx.rect(posX, pos, 100, tempSize);
        ctx.fillStyle = ctx.createPattern(image, "no-repeat");
        ctx.fill();
      }


      pos += tempSize;
    });
  };


  canvas.addEventListener('touchstart', function(e){
    e.preventDefault();
  });

  canvas.addEventListener('touchmove', function(e){
    e.preventDefault();
    canvas.classList.remove('c1-hidden');
    margin = 0;
    var touchPosition = e.touches[0].clientY;
    var inx = Math.round(touchPosition/(canvas.height/localColors.length))-1;
    draw(inx);
    ctx.fillStyle = localColors[inx].color;
    var target = document.getElementById('c1-' + colors[inx*toSkip].name + '1');
    if (target) {
      target.scrollIntoView();
      //window.scrollBy(0, -320);
    }
    ctx.fillRect(0, touchPosition - activeColorSize, activeColorSize, activeColorSize);
  });

  canvas.addEventListener('touchend', function(){
    canvas.classList.add('c1-hidden');
    draw();
  });

  draw();
  window.onresize = draw;
};
