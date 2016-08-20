$( document ).ready(function() {
    imageNum = Math.floor(Math.random() * (19 - 1)) + 1;
    //document.body.style.backgroundImage = `url('/imgs/${imageNum}.jpg')`;

    var img = document.getElementById('chance');
    img.setAttribute('src', `/imgs/${imageNum}.jpg`);
    img.addEventListener('load', function() {
        var vibrant = new Vibrant(img, 64, 5);
        var swatches = vibrant.swatches();
        $(".v").css("color", swatches['Vibrant'].getHex());
        if (swatches['LightVibrant']){
                $(".lv").css("color", swatches['LightVibrant'].getHex());
        }
        $(".m").css("color", swatches['Muted'].getHex());
        $(".lm").css("color", swatches['DarkMuted'].getHex());
        //}
        var ct = new ColorThief();
        console.log(ct.getColor(img));
        color = ct.getColor(img)
        console.log(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        var pal = ct.getPalette(img);
        $('body').css("backgroundColor", `rgb(${pal[1][0]}, ${pal[1][1]}, ${pal[1][2]})`);
        $('img').css('boxShadow', `0px 0px 30px rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);
        $('.0').css("color", `rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);
        $('.1').css("color", `rgb(${pal[1][0]}, ${pal[1][1]}, ${pal[1][2]})`);
        $('.2').css("color", `rgb(${pal[2][0]}, ${pal[2][1]}, ${pal[2][2]})`);
        $('.3').css("color", `rgb(${pal[3][0]}, ${pal[3][1]}, ${pal[3][2]})`);
    });
});
