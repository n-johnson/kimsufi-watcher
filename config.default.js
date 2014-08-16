module.exports = {
    'mandrillApiKey': '123',
    'email': {
        'to': [{
            'email': 'john@doe.com',
            'name': 'John Doe',
            'type': 'to'
        }, {
            'email': '5551234567@vtext.com',
            'type': 'to'
        }],
        'from': 'bob@smith.com',
        'subject': "Kimsufi Alert!"
    },
    'watchList': ['142sk1', '142sk2', '142sk3'], //Array of server IDs to watch
    'watchInterval': 120 //n seconds to refresh
};