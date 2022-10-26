const request = require('request');

let options = {
    'method': 'POST',
    'url': 'https://identity-va.mediavalet.net/token',
    'headers': {
        'content-type': 'application/json'
    },
    'body': "grant_type=password&username=allenliadmin%40mediavalet.net&password=8Z9M7bR!&client_id=0cce9ca4-93a5-48a7-9e6a-29022fa16c51"
};

request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body)
});