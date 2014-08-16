/** app.js
 *  Author: Nathan Johnson
 *  License: MIT
 *
 *  ES6 Harmony
 */

var _ = require('lodash');

var config = require('./config'),
    Server = require('./lib/Server'),
    Notifier = require('./lib/Notifier')(config.mandrillApiKey),
    OVHMap = require('./ovh');

var startTime = Date.now(),
    i = 0;

var intervalHandler = setInterval(function loop() {
    Server.loadServerList(config.watchList, function(err, matches) {
        if (err) throw err;

        if (++i % 10 === 0)
            console.log('Watching for: ', (Date.now() - startTime) / 1000, 'seconds');

        matches.forEach(function(r) {
            var cServer = _.merge(r, OVHMap[r.id]);
            var message = 'Kimsufi Alert! \n\n Server: ' + cServer.name + ' (€' + cServer.price + ') is available! \n\n Zones: ' + cServer.zones.toString();
            if (Notifier.send(message, config.email)) {
                console.log('SUCCESS', cServer);
                clearInterval(intervalHandler);
                console.log('Shutting down.');
            }
        });
    });
}, config.watchInterval * 1000);