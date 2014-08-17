/** Server.js
 *  Author: Nathan Johnson
 *  License: MIT
 */

var request = require('request'),
    co = require('co'),
    thunkify = require('thunkify'),
    get = thunkify(request.get);

var Server = function(id, zones) {
    this.id = id;
    this.zones = zones;
};

/*jshint esnext:true */
Server.loadServerList = co(function* check(checkList) {
    var result = yield get("https://ws.ovh.com/dedicated/r2/ws.dispatcher/getAvailability2");
    
    var zones = jsonParse(result[0].body).answer.availability;

    var allAvailableServers = zones.map(function(r) {
            var zones = r.zones // Array of availibility zones
                .filter(function(a) {
                    return a.availability !== 'unavailable';
                })
                .map(function(a) {
                    return a.zone;
                });
            return (zones.length > 0) ? new Server(r.reference, zones) : null;
        })
        .filter(function(e) { //Remove null servers
            return e !== null;
        });

    if (checkList) { //List of servers to watch
        return allAvailableServers.filter(function(r) {
            return ~checkList.indexOf(r.id); //True if provided array contains r.id
        });
    }
    return allAvailableServers;
});

function jsonParse(string) {
    try {
        return JSON.parse(string);
    } catch (e) {
        return [];
    }
}

module.exports = Server;