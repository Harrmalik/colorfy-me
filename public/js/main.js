var img = document.createElement('img');
img.setAttribute('src', '/imgs/title.png');
img.addEventListener('load', function() {
    var vibrant = new Vibrant(img);
    var swatches = vibrant.swatches();
    //for (var swatch in swatches) {
        // if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
        //     console.log(swatch, swatches[swatch].getHex());
        // }

    $(".v").css("color", swatches['Vibrant'].getHex());
    $(".lv").css("color", swatches['LightVibrant'].getHex());
    $(".m").css("color", swatches['Muted'].getHex());
    $(".lm").css("color", swatches['DarkMuted'].getHex());
    //}
});


$(document).ready(function () {
    var ct = new ColorThief();
    console.log(ct.getColor(img));
    color = ct.getColor(img, 8)
    console.log(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    document.body.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    var pal = ct.getPalette(img, 8);
    console.log(pal);
    console.log(pal[0]);
    console.log(pal[0][0]);
    $('.1').css("color", `rgb(${pal[0][2]}, ${pal[0][0]}, ${pal[0][1]})`);
    $('.2').css("color", `rgb(${pal[2][2]}, ${pal[0][0]}, ${pal[2][1]})`);
    $('.3').css("color", `rgb(${pal[3][0]}, ${pal[0][1]}, ${pal[3][2]})`);
})
