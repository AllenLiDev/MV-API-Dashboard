var request = require('request');
const fs = require('fs');

fs.createReadStream("file.csv")
    .pipe(csv())
    .on('data', (data) => {
        assets.push(
            {
                assetId: data.Id,
                categoryIds: data.Categories
            }
        );
    })
    .on('end', () => {
        console.log(assets)
        // updateAssetCategories()
    });

const updateAssetCategories = () => {
    for (asset in assets) {
        var options = {
            'method': 'PUT',
            'url': `https://mv-api-usva.mediavalet.com/assets/${asset.assetId}/categories`,
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCIwY2NlOWNhNC05M2E1LTQ4YTctOWU2YS0yOTAyMmZhMTZjNTFcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCIzOWFhZTVjYy01ZjI4LTQ2YTItYTQwZS1jZDBiZjBiOTQ2NTVcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCJkMzFkMTdjNy0yMTAwLTQwYzktYjY1Ni1kOWM5NGQyZGNhYjRcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCIwY2NlOWNhNC05M2E1LTQ4YTctOWU2YS0yOTAyMmZhMTZjNTFcIiIsIlVzZXJJZCI6IlwiZGU0MGQ1NTctZGFjNC00NmIwLTg1N2YtNmMyNDIxNTFmZjAwXCIiLCJVc2VyTmFtZSI6ImFsbGVubGlhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlJvbGVJZCI6IlwiYjdjODk0YTQtMWI2Yi00MDkzLWE5NjItZTUxN2JhOGEyNTZjXCIiLCJFbWFpbCI6ImFsbGVubGlhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlNJZCI6IlwiYjdjODk0YTQtMWI2Yi00MDkzLWE5NjItZTUxN2JhOGEyNTZjXCIiLCJJcEFkZHJlc3MiOiIyNC44NC4yMC4xNiIsImlzcyI6Imh0dHA6Ly93d3cubWVkaWF2YWxldGlzc3Vlci5jb20iLCJhdWQiOiJodHRwOi8vd3d3Lm1lZGlhdmFsZXRhdWRpZW5jZS5jb20iLCJleHAiOjE2NjI3MzcyOTEsIm5iZiI6MTY2MjEzMjQ5MX0.V0FFHoQqQaq_qE4NBJKUcUIyi_TkjiDHYC8TXEX6g2D9k_1Dl_eZvqhCuPFPemDhB7d4q2FNDmSVmhioTQl9FN5IToqCn89JwCFltre2huS-9Z9rWMfku3exgbpyVC2ssrKpFVN57gWLVuQqaAIXzSOr65SURuVNzcvHgxVobH7ya1XpX3swqJSsXPhK8QW_Lu72yE1wAdmIr6k0okQMDuNC3B6X3Ri55w8idPwdSQk-Fs4M2lq6deFuOpyftnEsfck78MfJ8L6qx4sOGH6JABDXe340gFrSsP9-0f7XD3q6kYZXufELvKXu3P4BHQ9hdH02sMwxRrjRnLSiqvux4w'
            },
            // body: Json.string([id, id])
            'body': JSON.stringify(
                asset.categoryIds
            ),
        };
        // request(options, function (error, response) {
        //     if (error) throw new Error(error);
        //     console.log(response.body);
        // });
    }
}
