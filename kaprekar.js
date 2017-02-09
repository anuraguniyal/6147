function Kaprekar_depth(n){
  /* calculate iterations it takes to reach Kaprekar constant 6174 */
  var depth = 0;
  while(n != 6174 && n != 0){
    depth += 1;
    n = kaprekar_step(n);
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
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var img = ctx.createImageData(100, 100);

    var colors = [
      [0, 0, 0, 255], //0 = 6174
      [0, 0, 0, 255], //1 = 1111 etc
      [0, 255, 0, 255], //2
      [0, 0, 255, 255], //3
      [255, 0, 255, 255], //4
      [255, 255, 0, 255], //5
      [0, 255, 255, 255], //6
      [255, 255, 255, 255] //7
    ]
    for(var i=0; i < 10000; i++){
      var depth = Kaprekar_depth(i);
      for(var j=0;j<4;j++){
        img.data[4*i+j] = colors[depth][j]
      }
    }
    ctx.putImageData(img, 0, 0);
    // draw itself scaled
    ctx.drawImage( canvas, 0, 0, 2*canvas.width, 2*canvas.height );
}
