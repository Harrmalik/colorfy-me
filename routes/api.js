let express = require('express');
let router = express.Router();
const request = require('request');
let apiKey = process.env.lastfmApiKey;
let nowPlaying = 'song';
let fmUser = 'harrmalik';
let slsGetAlbumUrl = 'https://bgmv70svsg.execute-api.us-east-1.amazonaws.com/prod/album-covers-dev-getAlbum';

router.get('/user/:userID', (req, res, next) => {
    res.json({
        userID: 1,
        isActive: true,
        lastFM: 'harrmalik',
        hueUser: 'M4dsHptOWsG4OrAEbVRWWZEYNCP6NhBId93AT5Vy',
        hueIP: '192.168.0.3',
        created: '2017-01-01 00:00:00',
        loginMethods: [{
            provider: 'local',
            id: 'harrmalik@gmail.com',
            created: '2017-01-01 00:00:00'
        }],
        settings: {
            hueActive: true,
            lastFM: true,
            notifications: true,
        },
        hueLights: [{
            id: 1,
            name: 'Living Room 1',
            activated: true,
            bri: 254,
            sat: 254,
            trans: 30
        },
        {
            id: 2,
            name: 'Living Room 2',
            activated: true,
            bri: 254,
            sat: 254,
            trans: 30
        },
        {
            id: 3,
            name: 'Malik Room 1',
            activated:false,
            bri: 254,
            sat: 254,
            trans: 30
        }]
    });
});

router.get('/getCurrentTrack', (req, res, next) => {
    if (!fmUser) {
        res.redirect('partials/setup', { title: 'Colorfy Me', layout: 'app-layout' });
    } else {
        request.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${fmUser}&api_key=${apiKey}&format=json&limit=1`, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            nowPlaying = makeTrack(body);
            // console.log(`${slsGetAlbumUrl}?track=${nowPlaying.name}&artist=${nowPlaying.artist}`);

            if (nowPlaying.image) {
                res.send(nowPlaying);
            } else {
                request.get(`${slsGetAlbumUrl}?track=${nowPlaying.name}&artist=${nowPlaying.artist}`, function(error, response, body) {
                    if (body) {
                        body = JSON.parse(body);
                        if (body.image) {
                            nowPlaying.image = body.image;
                            nowPlaying.album = body.album;
                        }
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
    }
});

router.get('/check', (req, res, next) => {
    if (!fmUser) {
        res.render('partials/setup', { title: 'Colorfy Me', layout: 'app-layout' });
    } else {
        request.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${fmUser}&api_key=${apiKey}&format=json&limit=1`, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                track = makeTrack(body);
                // console.log(track);
                // console.log('now playing: ' + nowPlaying.name);
                // console.log('track: ' + track.name);

                if (nowPlaying.name && nowPlaying.name !== track.name && track.nowPlaying == 'true') {
                    // console.log('change detected');
                    nowPlaying = track;
                    track.new = true;

                    if (track.image) {
                        res.send(track);
                    } else {
                        request.get(`${slsGetAlbumUrl}?track=${nowPlaying.name}&artist=${nowPlaying.artist}`, function(error, response, body) {
                            if (body) {
                                body = JSON.parse(body);
                                if (body.image) {
                                    track.image = body.image;
                                    track.album = body.album;
                                }
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
    }
});

router.post('/setFMUser/:user', (req,res,next) => {
    fmUser = req.params.user;
})

let makeTrack = function(data) {
    data = JSON.parse(data);
    if (data.recenttracks) {
        data = data.recenttracks.track[0];
        let image = data.image[Object.keys(data.image)[3]]
        track = {
            artist: data.artist[Object.keys(data.artist)[0]],
            name: data.name.replace(/\?/g, ''),
            album: data.album[Object.keys(data.album)[0]],
            url: data.url,
            image: image[Object.keys(image)[0]],
            nowPlaying: data["@attr"] ? data["@attr"].nowplaying : 'false'
        };

        return track;
    }

    return {
        name: ''
    };
}

module.exports = router;
