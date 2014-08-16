/** Notifier.js
 *  Author: Nathan Johnson
 *  License: MIT
 */

var mandrill = require('mandrill-api/mandrill');

var Notifier = function(api) {
    this.client = new mandrill.Mandrill(api);
};

/* jshint camelcase: false */
Notifier.prototype.send = function(input, email) {
    var message = {
        text: input,
        subject: email.subject,
        from_email: email.from,
        to: email.to
    };

    this.client.messages.send({
        "message": message
    }, function() { //Success function

    }, function(e) { //Error function
        console.log('Error!', e);
    });

    return true;
};

module.exports = function(api) {
    return new Notifier(api);
};