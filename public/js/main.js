var img = document.createElement('img');
img.setAttribute('src', '/imgs/coloring-book.jpeg');
console.log(document.getElementById('chance'));
console.log(img);
img.addEventListener('load', function() {
    var vibrant = new Vibrant(img);
    var swatches = vibrant.swatches();
    //for (var swatch in swatches) {
        // if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
        //     console.log(swatch, swatches[swatch].getHex());
        // }

    document.body.style.backgroundColor = swatches['Vibrant'].getHex();
    document.body.style.color = swatches['LightVibrant'].getHex();
    //}
});
