function compress(src,width,height,callback)
{
var canvas = document.createElement("canvas");
canvas.width=width;
canvas.height=height;
var ctx = canvas.getContext("2d");
var img = new Image;
img.src=src;
img.crossorigin = 'anonymous';

img.onload = function () {

    // set size proportional to image
    /*canvas.height = canvas.width * (img.height / img.width);

    // step 1 - resize to 50%
    var oc = document.createElement('canvas'),
        octx = oc.getContext('2d');

    oc.width = img.width * 0.5;
    oc.height = img.height * 0.5;
    octx.drawImage(img, 0, 0, oc.width, oc.height);

    // step 2
    octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

    // step 3, resize to final size
    ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
    0, 0, canvas.width, canvas.height);*/
   ctx.drawImage(img, 0, 0, width, height);
    callback(canvas.toDataURL("image/png",0.7));
};

}
