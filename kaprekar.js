function Kaprekar_depth(n, visits){
  /* calculate iterations it takes to reach Kaprekar constant 6174 */
  var depth = 0;
  while(n != 6174 && n != 0){
    depth += 1;
    n = kaprekar_step(n);
    // count how many times a number is visited
    visits[n] += 1;
  }
  return depth
}

function kaprekar_step(n){
  /* rearrange number in ascending and descending and return diff
   * e.g. 2518 => 8521 - 1258 = 7263
   */
  // get first 4 digits of number
  ns = n.toString().substring(0,4);
  // make it 4 digit string if less
  ns = ("000"+ns).slice(-4)
  // conver to array
  ar = ns.split('')
  // sort and get asc number
  asc = parseInt(ar.sort().join(''))
  dsc = parseInt(ar.sort().reverse().join(''))
  return dsc - asc
}

function init(){
    var canvas1 = document.getElementById('canvas1');
    var ctx1 = canvas1.getContext('2d');
    var img1 = ctx1.createImageData(100, 100);

    var canvasr21 = document.getElementById('canvas2');
    var ctx2 = canvas2.getContext('2d');
    var img2 = ctx2.createImageData(100, 100);

    var colors1 = [
      [0, 0, 0, 255], //0 = 6174
      [0, 0, 0, 255], //1 = 1111 etc
      [0, 255, 0, 255], //2
      [0, 0, 255, 255], //3
      [255, 0, 255, 255], //4
      [255, 255, 0, 255], //5
      [0, 255, 255, 255], //6
      [255, 255, 255, 255] //7
    ]
    // counter for each number, to see how many number go thru that
    var visits = {}
    for(var i=0; i < 10000; i++){
      visits[i] = 0;
    }
    for(var i=0; i < 10000; i++){
      var depth = Kaprekar_depth(i, visits);
      for(var j=0;j<4;j++){
        img1.data[4*i+j] = colors1[depth][j]
      }
    }
    ctx1.putImageData(img1, 0, 0);
    // draw itself scaled
    ctx1.drawImage( canvas1, 0, 0, 2*canvas1.width, 2*canvas1.height );


    var bar_x = 430;
    var bar_w = 4;
    var bar_gap = 9;
    for(var i=0; i < 10000; i++){
      if(visits[i] == 0) continue
      console.log(i, visits[i])
      ctx2.beginPath();
      var r = Math.log(visits[i]);
      ctx2.ellipse(10+4*(i/100), 10+4*(i%100), r, r, 0, 0, 2*Math.PI);
      ctx2.fill();

      // draw bar
      ctx2.beginPath();
      var h = visits[i]/25;
      ctx2.rect(bar_x, 400-h, bar_w, h);
      ctx2.fill();
      ctx2.save();
      ctx2.font = '12px arial';
      ctx2.translate(bar_x, 405);
      ctx2.rotate(Math.PI / 3);
      ctx2.fillText(i.toString(), 0, 0);
      ctx2.restore();
      bar_x += bar_w + bar_gap;
    }
    ctx2.rect(1,1,419,419);
    ctx2.stroke();
}

