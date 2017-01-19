var colors = colors || window.colors;
var hueIP = '192.168.0.2';
var hueUser = 'M4dsHptOWsG4OrAEbVRWWZEYNCP6NhBId93AT5Vy';
var activatedLights = [];

var getHueIP = function() {
    $.get( "https://www.meethue.com/api/nupnp", function( body ) {
        var ip = body[0] ? body[0].internalipaddress : '0.0.0.0';
        hueIP = ip;
        $('#ipText').val(ip);
    });
}

var createHueUser = function() {
    timeLeft = 30;
    $.ajax({
        url: `http://${hueIP}/api/`,
        type: 'POST',
        data: `{
        "devicetype": "colorfyme#web"
        }`
    }).success(function(data) {
        if (data[0].error) {
            console.log(data[0].error.description);
            $('.connecting')
              .transition({
                  animation  : 'fade',
                  duration   : '500ms',
              });
            $('.retry')
                .transition({
                    animation  : 'fade',
                    duration   : '500ms',
                });
        }
        if (data[0].success) {
            window.location.href = "http://localhost:3000/main";
        }
    }).fail(function(data) {
        console.log('failure');
        console.log(data);
    });
}

var checkForLights = function() {
    $.get( `http://${hueIP}/api/${hueUser}/lights/`, function( data ) {
        _.forEach(data, function(light, key) {
            activatedLights.push({
                light: key,
                name: light.name
            })
        });
    });
}

// Make API calls to hue lights to change the colors of each bulb
var changeHueLights = function(light, r, g, b) {
    var xy = colors.rgbToCIE1931(r, g, b);
    $.ajax({
        url: `http://${hueIP}/api/${hueUser}/lights/${light}/state`,
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
