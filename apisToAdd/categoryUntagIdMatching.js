const request = require('request');
const csv = require('csv-parser');
const fs = require('fs');
const ids = [];

// LIMIT 1000

const removeCategory = (assetId, categoryId) => {
    var options = {
        'method': 'DELETE',
        'url': 'https://mv-api-usca.mediavalet.com/assets/' + assetId + '/categories/' + categoryId,
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCJjNjk4YmE1YS1lMGY0LTQyMjUtOWI3ZS0xNzk5NjE1ZGJlZWFcIixcIlBlcm1pc3Npb25zXCI6MzAyNDk5MzIwOTY5NzYzMDkyMyxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjowLFwiT2JqZWN0SWRcIjpcImQ4NTdmNTgyLTczNjUtNDA3NC1iZDQ4LTg4MTVkZTRlZjc0ZlwiLFwiUGVybWlzc2lvbnNcIjozMDI0OTkzMjA5Njk3NjMwOTIzLFwiUGVybWlzc2lvbnMyXCI6MX0se1wiU2VjdXJhYmxlT2JqZWN0VHlwZVwiOjEsXCJPYmplY3RJZFwiOlwiZTY5NzI0YTUtNGQ1Ny00MTRmLWJkYTctYTM0MTI3ZTU5NWYwXCIsXCJQZXJtaXNzaW9uc1wiOjMwMjQ5OTMyMDk2OTc2MzA5MjMsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCJjNjk4YmE1YS1lMGY0LTQyMjUtOWI3ZS0xNzk5NjE1ZGJlZWFcIiIsIlVzZXJJZCI6IlwiMDUwMTllYTgtYTE1Ny00ZjkxLTlhNDUtZDNlN2ExZmY0ZGRmXCIiLCJVc2VyTmFtZSI6ImFjY2VsZXJhdGVsZWFybmluZ2FkbWluQG1lZGlhdmFsZXQubmV0IiwiUm9sZUlkIjoiXCJiMGIwNWFmNS0yNTcyLTRhNjItYTMyNS04YTc2MzgyZGJhYWJcIiIsIkVtYWlsIjoiYWNjZWxlcmF0ZWxlYXJuaW5nYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJTSWQiOiJcImIwYjA1YWY1LTI1NzItNGE2Mi1hMzI1LThhNzYzODJkYmFhYlwiIiwiSXBBZGRyZXNzIjoiMjQuODQuMjAuMTYiLCJpc3MiOiJodHRwOi8vd3d3Lm1lZGlhdmFsZXRpc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0YXVkaWVuY2UuY29tIiwiZXhwIjoxNjQ0Mjg2MDE3LCJuYmYiOjE2NDM2ODEyMTd9.B87fGMlx2bMTKgD56heFnZIWVBBuAlmql3UX2dst0nNL7FMgy76ewtueRX-hkYK1t_f1Conh0K2c5bwfNyDCa3oUrvsryCJunbp0iGmAwMCQmjkCWKoy3YtmSVvFvmqOdMyTkTg8n3JL1HIT1SQR69I2Pg0dUYi_1A7n6I0LwYP2icm1tJoH4bqTqPHqUXwRbUWAxm3GRPtAy-Zbc2Yi_-0KD8wlWAlEeYM7-UIlar07cqqT8-ga2ipsZ8Pa6R6_mLZwde5hhSbUYX8M2xj04uxoA2feuQr_NKLTuQr_sYx798aJmSdbDaFL3dt85j5YSFtQdbJcxe9zDwRHtIvHwQ'
        }
    };
    console.log("remove", assetId, categoryId);
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

fs.createReadStream('wrongExpired.csv')
    .pipe(csv())
    .on('data', (data) => {
        ids.push(data.Id);
    })
    .on('end', () => {
        foobar(0);
    });

const foobar = (i) => {
    for (let count = (0 + i); count < (1000 + i); count++) {
        let options = {
            'method': 'GET',
            'url': 'https://mv-api-usca.mediavalet.com/assets/' + ids[count] + '/categories',
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCJjNjk4YmE1YS1lMGY0LTQyMjUtOWI3ZS0xNzk5NjE1ZGJlZWFcIixcIlBlcm1pc3Npb25zXCI6MzAyNDk5MzIwOTY5NzYzMDkyMyxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjowLFwiT2JqZWN0SWRcIjpcImQ4NTdmNTgyLTczNjUtNDA3NC1iZDQ4LTg4MTVkZTRlZjc0ZlwiLFwiUGVybWlzc2lvbnNcIjozMDI0OTkzMjA5Njk3NjMwOTIzLFwiUGVybWlzc2lvbnMyXCI6MX0se1wiU2VjdXJhYmxlT2JqZWN0VHlwZVwiOjEsXCJPYmplY3RJZFwiOlwiZTY5NzI0YTUtNGQ1Ny00MTRmLWJkYTctYTM0MTI3ZTU5NWYwXCIsXCJQZXJtaXNzaW9uc1wiOjMwMjQ5OTMyMDk2OTc2MzA5MjMsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCJjNjk4YmE1YS1lMGY0LTQyMjUtOWI3ZS0xNzk5NjE1ZGJlZWFcIiIsIlVzZXJJZCI6IlwiMDUwMTllYTgtYTE1Ny00ZjkxLTlhNDUtZDNlN2ExZmY0ZGRmXCIiLCJVc2VyTmFtZSI6ImFjY2VsZXJhdGVsZWFybmluZ2FkbWluQG1lZGlhdmFsZXQubmV0IiwiUm9sZUlkIjoiXCJiMGIwNWFmNS0yNTcyLTRhNjItYTMyNS04YTc2MzgyZGJhYWJcIiIsIkVtYWlsIjoiYWNjZWxlcmF0ZWxlYXJuaW5nYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJTSWQiOiJcImIwYjA1YWY1LTI1NzItNGE2Mi1hMzI1LThhNzYzODJkYmFhYlwiIiwiSXBBZGRyZXNzIjoiMjQuODQuMjAuMTYiLCJpc3MiOiJodHRwOi8vd3d3Lm1lZGlhdmFsZXRpc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0YXVkaWVuY2UuY29tIiwiZXhwIjoxNjQ0Mjg2MDE3LCJuYmYiOjE2NDM2ODEyMTd9.B87fGMlx2bMTKgD56heFnZIWVBBuAlmql3UX2dst0nNL7FMgy76ewtueRX-hkYK1t_f1Conh0K2c5bwfNyDCa3oUrvsryCJunbp0iGmAwMCQmjkCWKoy3YtmSVvFvmqOdMyTkTg8n3JL1HIT1SQR69I2Pg0dUYi_1A7n6I0LwYP2icm1tJoH4bqTqPHqUXwRbUWAxm3GRPtAy-Zbc2Yi_-0KD8wlWAlEeYM7-UIlar07cqqT8-ga2ipsZ8Pa6R6_mLZwde5hhSbUYX8M2xj04uxoA2feuQr_NKLTuQr_sYx798aJmSdbDaFL3dt85j5YSFtQdbJcxe9zDwRHtIvHwQ'
            }
        };

        // return new Promise(resolve => {

        request(options, function (error, response) {
            if (error) {
                throw new Error(error);
            }
            let results = JSON.parse(response.body).payload;
            if (results !== undefined) {
                if (results.length > 1) {
                    for (let cate of results) {
                        if (cate.id === 'fe451970-a8b7-4851-97bf-8d89a6912160'){
                            removeCategory(ids[count], 'fe451970-a8b7-4851-97bf-8d89a6912160')
                        }
                    }
                } else {
                    if (results.id === 'fe451970-a8b7-4851-97bf-8d89a6912160') {
                        removeCategory(ids[count], 'fe451970-a8b7-4851-97bf-8d89a6912160')
                    }
                }
            }
        })
    }
    console.log("iteration over")
    i = i + 1000;
    setTimeout(() => {
        console.log("waiting ------- 60 seconds -----------------------------------------------------------------------------------------------------------------------------------------");
        console.log(i + " / total " + ids.length);
        if (i < ids.length) {
            foobar(i);
        }
    }, 60000);
}