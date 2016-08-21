$( document ).ready(function() {
    imageNum = Math.floor(Math.random() * (22 - 1)) + 1;
    //imageNum = 15;
    //document.body.style.backgroundImage = `url('/imgs/${imageNum}.jpg')`;

    var img = document.getElementById('img1');
    img.setAttribute('src', `/imgs/${imageNum}.jpg`);
    //var img = document.getElementById('img2');
    //img.setAttribute('src', `/imgs/${imageNum}.jpg`);
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
        var color = ct.getColor(img)
        var pal = ct.getPalette(img);
        $('#div1').css("backgroundColor", `rgb(${pal[1][0]}, ${pal[1][1]}, ${pal[1][2]})`);
        $('#div1').css('boxShadow', `0px 0px 50px rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);
        $('#img1').css('boxShadow', `0 0 100px ${swatches['Vibrant'].getHex()}`);
        $('.dom').css("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        $('.0').css("color", `rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);
        $('.1').css("color", `rgb(${pal[1][0]}, ${pal[1][1]}, ${pal[1][2]})`);
        $('.2').css("color", `rgb(${pal[2][0]}, ${pal[2][1]}, ${pal[2][2]})`);
        $('.3').css("color", `rgb(${pal[3][0]}, ${pal[3][1]}, ${pal[3][2]})`);
        // $('#div2').css("backgroundColor", `rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);
        // $('#div2').css('boxShadow', `0px 0px 50px rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);
        // $('#img2').css('boxShadow', `0 0 100px ${swatches['Vibrant'].getHex()}`);
        var colors = colors || window.colors;
        var v = swatches['Vibrant'].getRgb();
        console.log(swatches['Vibrant'].getRgb());
        var yx = colors.rgbToCIE1931(v[0], v[1], v[2]);
        //var yx = colors.rgbToCIE1931(pal[1][0], pal[1][1], pal[1][2]);
        var xy = colors.rgbToCIE1931(pal[0][0], pal[0][1], pal[0][2]);
        var data = `{
            "on": true,
            "bri": 254,
            "sat": 254,
            "transitiontime": 30,
            "xy": [${xy}]
        }`;
        var data2 = `{
            "on": true,
            "bri": 254,
            "sat": 254,
            "transitiontime": 30,
            "xy": [${yx}]
        }`;
        console.log(data);
        console.log(data2);
        $.ajax({
            url: 'http://192.168.0.8/api/tQdJ7GMOv2NTW9eTIzqjL2YbRbTKrrGyG2RY37MD/lights/1/state',
            type: 'PUT',
            data: data2,
            success: function(result) {
                console.log(result);
            }
        });
        $.ajax({
            url: 'http://192.168.0.8/api/tQdJ7GMOv2NTW9eTIzqjL2YbRbTKrrGyG2RY37MD/lights/2/state',
            type: 'PUT',
            data: data,
            success: function(result) {
                console.log(result);
            }
        });
        $.ajax({
            url: 'http://192.168.0.8/api/tQdJ7GMOv2NTW9eTIzqjL2YbRbTKrrGyG2RY37MD/lights/3/state',
            type: 'PUT',
            data: data2,
            success: function(result) {
                console.log(result);
            }
        });
    });

});
