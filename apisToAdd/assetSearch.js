const request = require('request');

const assetSearch = () => {
    let options = {
        'method': 'POST',
        'url': 'https://mv-api-usva.mediavalet.net/assets/search',
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCIyZDQ2N2JiYy1iMDU4LTQ5ODItYTExNC0wYzk1M2E5ODk5MmZcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCI1ZDBiZjY3Ni01Y2Q0LTQ1MTgtYWMwNy1lYzRlYTFjMjAzZTJcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCI5YzI4NGQ2Zi0zNTVkLTQ3ZGEtOWUwOC00N2VmYjdjY2NiZTdcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCI1ZDBiZjY3Ni01Y2Q0LTQ1MTgtYWMwNy1lYzRlYTFjMjAzZTJcIiIsIlVzZXJJZCI6IlwiYjg1Nzg0OWYtNTRjNC00ZDgxLTgwZDktNTc3Nzk0MjQxNGEzXCIiLCJVc2VyTmFtZSI6ImNhbWJyaWRnZW5ldHdvcmthZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlJvbGVJZCI6IlwiYzZhOTJhZjMtMjZlYi00MjMwLThjMTQtYWIyNTFjZTA0Y2RiXCIiLCJFbWFpbCI6ImNhbWJyaWRnZW5ldHdvcmthZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlNJZCI6IlwiYzZhOTJhZjMtMjZlYi00MjMwLThjMTQtYWIyNTFjZTA0Y2RiXCIiLCJJcEFkZHJlc3MiOiIyMDkuNTMuMTguMjM0IiwiaXNzIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0aXNzdWVyLmNvbSIsImF1ZCI6Imh0dHA6Ly93d3cubWVkaWF2YWxldGF1ZGllbmNlLmNvbSIsImV4cCI6MTY1NTIxODc5NiwibmJmIjoxNjU0NjEzOTk2fQ.Ihh248_tYWyXeeIUCbVfiJOc1EQGnvODalLueopZR1LnKwfNnlXe0HBpFXxFyQZdBozguH2NUj_F8Fp0WfPHTYgfR89ZHBTQLbQ5LEqoBwoIlwPLXRF4ouI4csY3meY-Erq7oHvDBYBvwZsHfjt3Ul17h8ZZKg8q3y8yfRq4VknZqFLxAlAyb-as_lzqvQVlI565wffdeHknyRD3njy8ObNfOPCanXRyI4dmVJCNYV5Hx5jzX6JI3KmhJUWN2VW9oGmkwoELr7iRuyGHSRk0vkXAcV8Y492G38_hkiy5yNJ_UFriyO4OtJ2cd_-CSSO7sy0O8u1xbuO3rrYJDqSVYA'},
        'form': {
            "search": "",
            "count": 1000,
            "offset": 0,
            "filters": "(Status EQ 10)",
            "sort": "record.createdAt D"
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        assets = (JSON.parse(response.body).payload.assets);
        console.log(assets)
        // for(let asset of assets) {
        //     reject(asset["id"]);
        // }
    });
}

// const reject = (id) => {
//     console.log(id)
//     let options = {
//         'method': 'PATCH',
//         'url': 'https://mv-api-usva.mediavalet.net/assets/' + id,
//         'headers': {
//             'content-type': 'application/json',
//             'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCIwY2NlOWNhNC05M2E1LTQ4YTctOWU2YS0yOTAyMmZhMTZjNTFcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCIzOWFhZTVjYy01ZjI4LTQ2YTItYTQwZS1jZDBiZjBiOTQ2NTVcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCJkMzFkMTdjNy0yMTAwLTQwYzktYjY1Ni1kOWM5NGQyZGNhYjRcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCIwY2NlOWNhNC05M2E1LTQ4YTctOWU2YS0yOTAyMmZhMTZjNTFcIiIsIlVzZXJJZCI6IlwiZGU0MGQ1NTctZGFjNC00NmIwLTg1N2YtNmMyNDIxNTFmZjAwXCIiLCJVc2VyTmFtZSI6ImFsbGVubGlhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlJvbGVJZCI6IlwiYjdjODk0YTQtMWI2Yi00MDkzLWE5NjItZTUxN2JhOGEyNTZjXCIiLCJFbWFpbCI6ImFsbGVubGlhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlNJZCI6IlwiYjdjODk0YTQtMWI2Yi00MDkzLWE5NjItZTUxN2JhOGEyNTZjXCIiLCJJcEFkZHJlc3MiOiIyMDcuODEuMjUxLjciLCJpc3MiOiJodHRwOi8vd3d3Lm1lZGlhdmFsZXRpc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0YXVkaWVuY2UuY29tIiwiZXhwIjoxNjU1MjMzOTg1LCJuYmYiOjE2NTQ2MjkxODV9.bRoh78gtA9mpDrnBnVDGueLsEM8sQyEgBgGxbx8jOpIDqVEs98eyHK77Xo6HsMbNI1jq4VRnPS0iLpWfzPifxJ7Z0WrEwjOX07EyCMEkzTahR4COt5YXRFkH9R98lQQDEmP3382u2tDu25fsLW2wtg8S_gd7v4fJDynyaXYxCVcDZBu3FQGPKvsYSRO_VwipAhtA8C8khgOs8ZkDIOQMTI5zPcFgVTR0OwlagWHSbJExXsTOF-WFOU3ffZvPhYYEDaD9fOuzFQUeEp4T4ecLvLSmMKuiRAk5AWNAIENAXpzSARxrPqwU6HVM7KB1392j3bEH1AG2tQ32-SypqKT1yg'
//         },
//         'body': JSON.stringify([{"op":"replace","path":"/status","value":0}])
//     };
//     request(options, function (error, response) {
//         console.log(JSON.parse(response.body))
//         if (error) throw new Error(error);
//     });
// }

assetSearch();
// reject('7a506e27-ae80-4b73-a80e-18c82b8d911e')