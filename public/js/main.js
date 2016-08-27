
var ct = new ColorThief();
var colors = colors || window.colors;

$( document ).ready(function() {
    (function(){
      var widgetIframe = document.getElementById('sc-widget'),
          widget       = SC.Widget(widgetIframe);

      widget.bind(SC.Widget.Events.READY, function() {
        widget.bind(SC.Widget.Events.PLAY, function() {
          // get information about currently playing sound
          widget.getCurrentSound(function(currentSound) {
            console.log('sound ' + currentSound.get('') + 'began to play');
          });
        });
        // get current level of volume
        widget.getVolume(function(volume) {
          console.log('current volume value is ' + volume);
        });
        // set new volume level
        widget.setVolume(50);
        // get the value of the current position
      });

    }());
    imageNum = Math.floor(Math.random() * (22 - 1)) + 1;
    //imageNum = 15;

    var img = document.getElementById('img1');
    img.setAttribute('src', `/imgs/${imageNum}.jpg`);
    img.addEventListener('load', function() {
        // Set variables and get colors from images
        var vibrant = new Vibrant(img, 64, 5);
        var swatches = vibrant.swatches();
        var color = ct.getColor(img);
        var pal = ct.getPalette(img);
        var v = swatches['Vibrant'].getRgb();

        // Change UI colors based on colors found
        $(".v").css("color", swatches['Vibrant'].getHex());
        $('#div1').css("backgroundColor", `rgb(${pal[1][0]}, ${pal[1][1]}, ${pal[1][2]})`);
        $('#div1').css('boxShadow', `0px 0px 50px rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);
        $('#img1').css('boxShadow', `0 0 100px ${swatches['Vibrant'].getHex()}`);
        $('.dom').css("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        $('.0').css("color", `rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);

        // Change Hue lights color
        changeHueLights(1, v[0], v[1], v[2]);
        changeHueLights(2, pal[0][0], pal[0][1], pal[0][2]);
        changeHueLights(3, v[0], v[1], v[2]);
    });

});

var changeHueLights = function(light, r, g, b) {
    var xy = colors.rgbToCIE1931(r, g, b);

    $.ajax({
        url: `http://192.168.0.8/api/tQdJ7GMOv2NTW9eTIzqjL2YbRbTKrrGyG2RY37MD/lights/${light}/state`,
        type: 'PUT',
        data: `{
            "on": true,
            "bri": 254,
            "sat": 254,
            "transitiontime": 30,
            "xy": [${xy}]
        }`
    });
}
