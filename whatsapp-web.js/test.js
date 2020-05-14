// function imageToBase64(img)
// {
//     var canvas, ctx, dataURL, base64;
//     canvas = document.createElement("canvas");
//     ctx = canvas.getContext("2d");
//     canvas.width = img.width;
//     canvas.height = img.height;
//     ctx.drawImage(img, 0, 0);
//     dataURL = canvas.toDataURL("image/png");
//     base64 = dataURL.replace(/^data:image\/png;base64,/, "");
//     return base64;
// }
// // var fs = require('fs');
// // var PNG = require('png-js');
// // var file = fs.readFileSync('./memes/meme1.png');
// // var png = new PNG(file);
// //var aattachmentData = new Image();   // Create new img element
// var aattachmentData = '/Users/gaurav/Documents/GitHub/whatsapp-web/memes/meme1.png';
// var attachmentData = imageToBase64(aattachmentData);
// console.log(attachmentData);

let meme = new Array();
meme.push("./memes/meme1.jpg");
meme.push("./memes/meme1.png");
console.log(meme[1]);