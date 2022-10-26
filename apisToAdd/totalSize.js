const request = require('request');
const totalAssets = 604187 - 522459;
let totalSize = 0;
// ONLY WORKS UP TO 100k for some reason
const assetSearch = (count) => {
    console.log("process assets " + count + ". Current size: " + totalSize)
    let options = {
        'method': 'POST',
        'url': 'https://mv-api-usva.mediavalet.net/assets/search',
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCIyNzhiMTM3My03N2JjLTQ5ZjgtODA4MC04ZmI1OGVjMjkzY2FcIixcIlBlcm1pc3Npb25zXCI6MzAyNDg1MjQ3MjIwOTI3NjYxOSxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjo5LFwiT2JqZWN0SWRcIjpcIjNlMzZlY2E5LTc3YzItNGQ5Ni1hMzIyLWFmYjlkMmZiNWNmNlwiLFwiUGVybWlzc2lvbnNcIjozMDI0ODUyNDcyMjA5Mjc2NjE5LFwiUGVybWlzc2lvbnMyXCI6MX0se1wiU2VjdXJhYmxlT2JqZWN0VHlwZVwiOjEsXCJPYmplY3RJZFwiOlwiOWQ5YTNkYzUtMThkYi00OWFjLTgyMzktMWFhNjVlYjA0NDJkXCIsXCJQZXJtaXNzaW9uc1wiOjMwMjQ4NTI0NzIyMDkyNzY2MTksXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCIzZTM2ZWNhOS03N2MyLTRkOTYtYTMyMi1hZmI5ZDJmYjVjZjZcIiIsIlVzZXJJZCI6IlwiYThmNjNhM2UtZmM5ZC00YTU3LWE0MjItNGY3YjJhYTMwN2JkXCIiLCJVc2VyTmFtZSI6ImJyYW5kdXNhYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJSb2xlSWQiOiJcImQxZWIzNTZkLTI1MDktNGE5Zi1iNDdiLTllZWFiZTVmYmFlMlwiIiwiRW1haWwiOiJzdXBwb3J0QG1lZGlhdmFsZXQubmV0IiwiU0lkIjoiXCJkMWViMzU2ZC0yNTA5LTRhOWYtYjQ3Yi05ZWVhYmU1ZmJhZTJcIiIsIklwQWRkcmVzcyI6IjI0Ljg0LjIwLjE2IiwiaXNzIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0aXNzdWVyLmNvbSIsImF1ZCI6Imh0dHA6Ly93d3cubWVkaWF2YWxldGF1ZGllbmNlLmNvbSIsImV4cCI6MTY0NTU2Nzk4NywibmJmIjoxNjQ0OTYzMTg3fQ.a3YKFZaCmMjEk_icwtEBhVHHRlRhkLojboIpyx3JKZpN9iOBFGlQwlYkXpB7HIEu48PS4bvSRVAgOgOA8TDkc7BNFUi_HMjr_B9QRpKOTiiI7fB9L1k_49Q51LeuQrclZn5TEDGSjM_AcaKnTfkBnVRh2_kRa40STy14TWr318RuDhWrazHHi7zYwpgLestbc-NaC76GhSfvUwjTdIxb8SnJKwtCU3-SolAl8dkfL68yG5VDETgHAi-uO0xkDcu5ImRnhWgX_RzBqgBIJ8MRGmupMUfNIvfa1EeP5LytaFwydR2DYsynjv7shce5Hrw-6Fbn6wMVUemI3p-4JFfpQA'
        },
        'form': {
            "search": "",
            "count": 1000,
            "offset": 0,
            "sort": "record.createdAt D",
            "containerfilter": "(CategoryIds/ANY(c: c EQ '9d9a3dc5-18db-49ac-8239-1aa65eb0442d') OR CategoryAncestorIds/ANY(c: c EQ '9d9a3dc5-18db-49ac-8239-1aa65eb0442d'))"
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        assets = (JSON.parse(response.body).payload.assets);
        for (let asset of assets) {
            totalSize += (asset.file.sizeInBytes);
        }
        count += 1000;
        if(count < totalAssets) {
            assetSearch(count);
        }
    });
}

assetSearch(0);