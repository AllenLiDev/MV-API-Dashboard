const request = require('request');
const results = []

const assetSearch = () => {
    let options = {
        'method': 'POST',
        'url': 'https://mv-api-usca.mediavalet.net/assets/search',
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCI2NzkzMTNlYS0zMTJhLTQ3Y2EtYTI1Yi0wODRmODU1ZDljMWFcIixcIlBlcm1pc3Npb25zXCI6MzAyNDk5MzIwOTY5NzYzMDkyMyxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjo5LFwiT2JqZWN0SWRcIjpcIjc3YWFiYTgxLWUwNDgtNGY4OC1iYTM2LWMzYzNiMWU5YzY2M1wiLFwiUGVybWlzc2lvbnNcIjozMDI0OTkzMjA5Njk3NjMwOTIzLFwiUGVybWlzc2lvbnMyXCI6MX0se1wiU2VjdXJhYmxlT2JqZWN0VHlwZVwiOjAsXCJPYmplY3RJZFwiOlwiN2RjZTBiMGMtMWJiYi00OGNkLThiZjEtY2I5OTQ3NDFkMmQ2XCIsXCJQZXJtaXNzaW9uc1wiOjMwMjQ5OTMyMDk2OTc2MzA5MjMsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCI3N2FhYmE4MS1lMDQ4LTRmODgtYmEzNi1jM2MzYjFlOWM2NjNcIiIsIlVzZXJJZCI6IlwiNTFmNWY1NGMtYzM4Mi00MmZhLWIzMjctNTczMjk5NjU1OGZiXCIiLCJVc2VyTmFtZSI6ImNvcnNhaXJjb21wb25lbnRzaW5jLmFkbWluQG1lZGlhdmFsZXQubmV0IiwiUm9sZUlkIjoiXCJhMjM4ZTg4OS0yZjgyLTRmZWYtOGIzMi1jOTg2ZmZmMTg5MjdcIiIsIkVtYWlsIjoiY29yc2FpcmNvbXBvbmVudHNpbmMuYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJTSWQiOiJcImEyMzhlODg5LTJmODItNGZlZi04YjMyLWM5ODZmZmYxODkyN1wiIiwiSXBBZGRyZXNzIjoiMjQuODQuMjAuMTYiLCJpc3MiOiJodHRwOi8vd3d3Lm1lZGlhdmFsZXRpc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0YXVkaWVuY2UuY29tIiwiZXhwIjoxNjQ2MTYzMzYzLCJuYmYiOjE2NDU1NTg1NjN9.VRejK39waHW_k0mRtQfsZFTtT1Dw7behLDfI4r3KHhoZGYGnp6QvHTyoxT-diG4EsLeo7ZzMc8mIW0bOJMioXbpfahkRqFcLuAhpXr2wGHsNconDyigX4QwubBM_T3TZCEU7G32AEj9MrQvrul3VYWeUjvT9qBuzkiVjZQDeoGCDdkDM2Xq2DXB8pRiZ7Ah-Dq9bP12m2tTZcfH0WDF7VXIbI8E-pARhTNfwKTX-4b2XEcmZ4xglWh-QbB1N6ZUan6QEE9YzonRPIvIFXeuS1RGZ5Z2eymOeJCSIzI0ZCKwDZCFCl7f3q9m8LrEje0pcmjV7o_XO5LZPuqghibDleg'},
        'form': {
            "search": "",
            "count": 1000,
            "offset": 0,
            "filters": "(Status EQ 0)",
            "sort": "record.createdAt D",
            "searchFields": "keywords,title,fileName,categoryNames,categoryAncestorNames,attributes,description,comments,cognitiveTextInImage,cognitiveTags,videoIntelligence",
            "containerfilter": "(CategoryIds/ANY(c: c EQ '67901999-c016-46de-a3e5-59216ff17394') OR CategoryAncestorIds/ANY(c: c EQ '67901999-c016-46de-a3e5-59216ff17394'))"
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        assets = (JSON.parse(response.body).payload.assets);
        for(let asset of assets) {
            console.log(Object.keys(asset))
        }
    });
}

assetSearch();