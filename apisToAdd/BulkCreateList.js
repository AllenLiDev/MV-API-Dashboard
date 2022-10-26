const request = require('request');

let options = {
    'method': 'POST',
    'url': 'https://mv-api-usca.mediavalet.net/attributes',
    'headers': {
        'content-type': 'application/json',
        'Authorization': ''},
    'body': JSON.stringify({
        "displayAttribute": true,
        "isSystemProperty": false,
        "isUserEditable": true,
        "showLabel": true,
        "mapEmbeddedData": false,
        "isRequired": false,
        "name": "Language",
        "attributeType": "List",
        "optionsList": [{
                "optionValue": "Albanian",
                "isDefault": false,
                "sequence": 1
            }
        ],
        "embeddedDataType": "",
        "embeddedDataValue": "",
        "mappingDirection": "",
        "defaultExpression": ""
    })
};

request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body)
});