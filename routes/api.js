var express = require('express');
var router = express.Router();
const request = require('request');
var apiKey = process.env.lastfmApiKey;
var nowPlaying = {};

router.get('/getCurrentTrack', function(req, res, next) {
    request.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Harrmalik&api_key=${apiKey}&format=json&limit=1`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        nowPlaying = makeTrack(body);

        if (nowPlaying.image) {
            res.send(nowPlaying);
        } else {
            request.get(`http://localhost:3001/${nowPlaying.name}/${nowPlaying.artist}`, function(error, response, body) {
                if (body) {
                    nowPlaying.image = body;
                    res.send(nowPlaying);
                } else {
                    res.send(nowPlaying);
                }
            });
        }
    } else {
            res.send('error' + response);
    }

    });
});

router.get('/check', function(req, res, next) {
    request.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Harrmalik&api_key=${apiKey}&format=json&limit=1`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            track = makeTrack(body);
            console.log('now playing: ' + nowPlaying.name);
            console.log('track: ' + track.name);

            if (nowPlaying.name && nowPlaying.name !== track.name) {
                console.log('change detected');
                nowPlaying = track;
                track.new = true;

                if (track.image) {
                    res.send(track);
                } else {
                    request.get(`http://localhost:3001/${track.name}/${track.artist}`, function(error, response, body) {
                        if (body) {
                            track.image = body;
                        }
                        res.send(track);
                    });
                }
            } else {
                res.send('no new changes');
            }
      } else {
              console.log('res');
      }
    });
});

var makeTrack = function(data) {
    data = JSON.parse(data);
    data = data.recenttracks.track[0];
    var image = data.image[Object.keys(data.image)[3]]
    track = {
        artist: data.artist[Object.keys(data.artist)[0]],
        name: data.name.replace(/\?/g, ''),
        album: data.album[Object.keys(data.album)[0]],
        url: data.url,
        image: image[Object.keys(image)[0]]
    };

    return track;
}

module.exports = router;
