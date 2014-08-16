kimsufi-watcher
===============

Watches kimsufi server avaliability and notifies you by email (using mandrill) whenever a specified server becomes available.

Uses ES6 generators so node v0.11 is required.

### Instructions

Copy `config.default.js` to `config.js` and fill in your desired values.

The -harmony switch is required to run the program.

`node -harmony app.js`

### Config

    mandrillApiKey: API_KEY from mandrill
    email: {
        to: [{ //Array of email addresses to send messages to of the format:
	        'email': 'john@doe.com',
	        'name': 'John Doe',
	        'type': 'to'
        }],
        from: "yourself@domain.com"
        subject: "Email subject"
    },
    'watchList': ['142sk1', '142sk2'] //Array of server ID's to watch
    'watchInterval': 120 //n seconds between refreshes