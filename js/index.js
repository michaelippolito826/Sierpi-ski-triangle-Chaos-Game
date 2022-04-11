'use strict';



const init = () => {

  const html = document.getElementsByTagName('html').item(0),
    canvas = document.getElementsByTagName('canvas').item(0),
    context = canvas.getContext('2d');

  const resize = () => {
    canvas.width = w = window.innerWidth;
    canvas.height = h = window.innerHeight;
  };

  const loop = (t) => {
    let slider = document.getElementById("slider_id");
    let depth = slider.value;

    slider.oninput = () => {
      depth = this.value;  
    }
    let prev = [w * 0.5, h * 0.45];
    let x1 = w * 0.5;
    let x2 = w * 0.20;
    let x3 = w * 0.80;
    let y1 = h * 0.05;
    let y2 = h * 0.95;
    let y3 = y2 * 0.5; 

    context.fillRect(x1, y1, 2, 2);
    context.fillRect(x2, y2, 2, 2);
    context.fillRect(x3, y2, 2, 2);
    context.fillRect(x1, y3, 2, 2);
    
    function test(prev, depth) {
      if (depth == 0) {
        return;
      }
      let randomInt = Math.floor(Math.random() * 3);
      let points = [[x1, y1], [x2, y2], [x3, y2]];
    
      let newPoint = [(points[randomInt][0] + prev[0]) / 2, (points[randomInt][1] + prev[1]) / 2];
      context.fillRect(newPoint[0], newPoint[1], 2, 2);
      prev = [newPoint[0], newPoint[1]];
      depth--;
      test(prev, depth);
    }
    
    window.requestAnimationFrame(loop);
    test(prev, depth);
  };

  let w,  h, last,
    i = 0,
    start = 0;

  window.removeEventListener('load', init);
  window.addEventListener('resize', resize);
  resize();
  html.classList.remove('no-js');
  html.classList.add('js');
  window.requestAnimationFrame(loop);
};

window.addEventListener('load', init);
