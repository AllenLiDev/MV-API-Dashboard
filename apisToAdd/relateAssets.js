const request = require('request');

let options = {
    'method': 'POST',
    'url': 'https://mv-api-usva.mediavalet.net/assets/7df1d5ba-dff5-4558-a22f-01d5b7538259/relatedassets',
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCIwY2NlOWNhNC05M2E1LTQ4YTctOWU2YS0yOTAyMmZhMTZjNTFcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCIzOWFhZTVjYy01ZjI4LTQ2YTItYTQwZS1jZDBiZjBiOTQ2NTVcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCJkMzFkMTdjNy0yMTAwLTQwYzktYjY1Ni1kOWM5NGQyZGNhYjRcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCIwY2NlOWNhNC05M2E1LTQ4YTctOWU2YS0yOTAyMmZhMTZjNTFcIiIsIlVzZXJJZCI6IlwiZGU0MGQ1NTctZGFjNC00NmIwLTg1N2YtNmMyNDIxNTFmZjAwXCIiLCJVc2VyTmFtZSI6ImFsbGVubGlhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlJvbGVJZCI6IlwiYjdjODk0YTQtMWI2Yi00MDkzLWE5NjItZTUxN2JhOGEyNTZjXCIiLCJFbWFpbCI6ImFsbGVubGlhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlNJZCI6IlwiYjdjODk0YTQtMWI2Yi00MDkzLWE5NjItZTUxN2JhOGEyNTZjXCIiLCJJcEFkZHJlc3MiOiIyMDkuNTMuMTguMjM0IiwiaXNzIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0aXNzdWVyLmNvbSIsImF1ZCI6Imh0dHA6Ly93d3cubWVkaWF2YWxldGF1ZGllbmNlLmNvbSIsImV4cCI6MTY1MDM4NTg2NCwibmJmIjoxNjQ5NzgxMDY0fQ.FMxw1wP6qu8_qVFDp2ErZDZeKftNOWifC-buu7PABHi5zOlDa_Acr-38YiqX26aw7OHb8rTy6Lua5HRVgz5z2Mc5jaqYwwWKSDs3OfJvmNDd0Q54EjRki2Q7EyhHNqpaFeg0GZPTR5kxufc0dMGp0guQxfya4TRi4vpuQ8Kv3qpxtjdtz5wxC6WuwQJjJZqOVKUZBPaN-BlvzdoD_3rCq79YOq2WdoN9p4HiIf7tl5sgJ-L8VJbA8N6-RjYWCJCYzvG-TZKU3jjVx8lokcJUMyZQYW4T6SwkwxtHc-6RtcjV6fYRwdHXIiKfdJyHBMry7MohocxSkvvunxuWRfCJsA'
    },
    'body': JSON.stringify({
        "derived": [
            "2558741e-57ec-4468-8d7e-aa5f9ddbb005",
            "a8fea193-c840-4b5b-9376-e7643923bde1"
        ]
    })
}

request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body)
});

