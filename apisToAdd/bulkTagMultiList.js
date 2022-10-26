const request = require('request');
const csv = require('csv-parser');
const fs = require('fs');
const assets = [];

fs.createReadStream("C:\\Users\\Allen.Li\\OneDrive - MediaValet\\psExports\\ultradent\\MissingProduct.csv")
    .pipe(csv())
    .on('data', (data) => {
        assets.push(
            {
                assetId: data.Id,
                value: data.Product
            }
        );
    })
    .on('end', () => {
        formatValues()
        console.log(assets)
        tagMultiList(assets)
    });

const formatValues = () => {
    for(asset of assets) {
        asset.value = asset.value.split(", ")
    }
}

const tagMultiList = (list) => {
    list.forEach(list => {
        let options = {
            'method': 'PATCH',
            'url': 'https://mv-api-usca.mediavalet.net/assets/' + list.assetId,
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA0MUIwMUQ1OTg1ODI4MzcwNTI2Qjk5Rjc2MjgyNkIyNUM3QkE2ODciLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCQnNCMVpoWUtEY0ZKcm1mZGlnbXNseDdwb2MifQ.eyJuYmYiOjE2NTgzMzg1NzUsImV4cCI6MTY1ODk0MzM3NSwiaXNzIjoiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20iLCJhdWQiOlsiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20vcmVzb3VyY2VzIiwiaHR0cHM6Ly9hcGktdXNjYS5tZWRpYXZhbGV0Lm5ldCJdLCJjbGllbnRfaWQiOiI1MTg1YjFiNS05MzhlLTRjNzktYmNkYi1hYjZiMjVjYjg1ODAiLCJzdWIiOiJ1bHRyYWRlbnRhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsImF1dGhfdGltZSI6MTY1ODMzODU3NCwiaWRwIjoibG9jYWwiLCJhcGlfdXJpIjoiaHR0cHM6Ly9hcGktdXNjYS5tZWRpYXZhbGV0Lm5ldCIsIlBlcm1pc3Npb25zIjoiW3tcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjowLFwiT2JqZWN0SWRcIjpcIjQ5NmQxNjgzLTc4OTgtNGY5Ny1hNWM1LWMyODNkMGM1MmM2ZFwiLFwiUGVybWlzc2lvbnNcIjoxMjI0ODM2NTI0NjU1MjQwNjczMSxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjo5LFwiT2JqZWN0SWRcIjpcIjRhNDc3OGUyLTRiMDctNDY0OC1hNDM4LTFhMGMxY2ViYjVlZFwiLFwiUGVybWlzc2lvbnNcIjoxMjI0ODM2NTI0NjU1MjQwNjczMSxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjoxLFwiT2JqZWN0SWRcIjpcIjUwOGYzYWFiLWQyNDItNDRlOS1hOWY5LWM3YmZhZjc3ODIzZlwiLFwiUGVybWlzc2lvbnNcIjoxMjI0ODM2NTI0NjU1MjQwNjczMSxcIlBlcm1pc3Npb25zMlwiOjF9XSIsIlJvbGVJZCI6IlwiZTdiZDgzMDAtYmM3MS00NmYxLThjZTctM2U0NGMwZmQ3YmY1XCIiLCJVc2VyT3JnVW5pdElkIjoiXCI0YTQ3NzhlMi00YjA3LTQ2NDgtYTQzOC0xYTBjMWNlYmI1ZWRcIiIsIlVzZXJOYW1lIjoidWx0cmFkZW50YWRtaW5AbWVkaWF2YWxldC5uZXQiLCJFbWFpbCI6InVsdHJhZGVudGFkbWluQG1lZGlhdmFsZXQubmV0IiwiVXNlcklkIjoiXCI3ZDg4NjBlOC03ZDBkLTRmZjItODI3Zi1iMzk4OWJmYWQyY2RcIiIsIlNJZCI6IlwiZTdiZDgzMDAtYmM3MS00NmYxLThjZTctM2U0NGMwZmQ3YmY1XCIiLCJzY29wZSI6WyJhcGkiXSwiYW1yIjpbInBhc3N3b3JkIl19.G2iSEWxFGkS8zKgziZR4x0A_WhYestLSbxtfStMQr8GX76B2uJBSXyAJnUCstQ0xF4bfQAXYJJIeCmNUHF6ZMiswh3tUgk7mWzA6k3c3q2HvK9bfjiqnVCVCR5CVA9LVC5DMDHWvm062dWDkT1xORlwRFKbU-tIB16BBkyF_TewzpM3xFtd2AOxyFHvLiQrUo7HtMays7toKb6QBxFYwGZmL2OBHwrIHXjhK4oGM_B0agVlOzXba-4oVMLyqbtPNyKYJRNNi6RhdAORNkgB46NTZoq4NHRig9QOl_8rMMHbNgABPuSdgEnpW0SXRtdZjc7_uzo5lfCAjkPJa3AdGrw4hqT0CajFcgqCErlkIOaHCkA1aPbnNNVYsw7k0ct433DN1yy_TBVbxBmEvZg7r4ax6Y-l3fSOhxBIfj86jiIKCTyhTjzNGpbuYsS-UILdEnvSYMuQk51vAGrmqXfUj1jTV6dfGWb8iuuSUWUhWWIHbJjNaNEqqRUbERa_Q0AXfxOBy6KKh5sY7Cyza1YHW2Pjy6UDigQQszmZ2PgDT5R9jC1x7Xw-3bCI0sh2T_RbW1e3UseO0RWs9YX_6qBlrKbkF6DLNr7-SToCFs-nQgK0LpjZ-7-maaAMGqbO6BP6e-BkDCumiBWPEcWIcWrPZTSfbu80gn_fDuIKuxaYVl-Q'
            },
            'body': JSON.stringify([
                {
                    "op": "Add",
                    "path": "/attributes/7384a0fc-c47e-4551-a53f-60e6e80d4c24",
                    "value": list.value
                }
            ])
        };

        request(options, function (error, response) {
           if (error) throw new Error(error);
        });

   });
}