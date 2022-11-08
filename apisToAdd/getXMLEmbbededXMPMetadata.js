const request = require('request');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const assets = [];
const csvWriter = createCsvWriter({
    path: 'XMPMetadata.csv',
    // header: [
    //     { id: 'AssetId', title: 'AssetId' },
    //     { id: 'assetType', title: 'Object Metadata Asset Type' },
    //     { id: 'metadataCredit', title: 'Object Metadata Credit' },
    //     { id: 'dateCreate', title: 'Object Metadata Date Create' },
    //     { id: 'dateInput', title: 'Object Metadata Date Input' },
    //     { id: 'doNotUseImage', title: 'Object Metadata Do Not Use Image' },
    //     { id: 'expirationDate', title: 'Object Metadata Expiration Date' },
    //     { id: 'imageKind', title: 'Object Metadata Image Kind' },
    //     { id: 'keyword', title: 'Object Metadata Keyword' },
    //     { id: 'library', title: 'Object Metadata Library' },
    //     { id: 'merlin D', title: 'Object Metadata Merlin ID' },
    //     { id: 'modality', title: 'Object Metadata Modality' },
    //     { id: 'object', title: 'Object Metadata Object' }
    // ]
    header: [
        { id: 'Subject', title: 'Subject'}
    ]
});

// fs.createReadStream("davidaXML.csv")
//     .pipe(csv())
//     .on('data', (data) => {
//         assets.push(
//             {
//                 assetId: data.AssetId,
//             }
//         );
//     })
//     .on('end', () => {
//         // console.log(assets)
//         getXMP((res) => {
//             // console.log(res)
//         });
//     });

getXMP()

let metadata = []
const getXMP = async () => {
    for (let count = 0; count < 999; count++) {
        let options = {
            'method': 'GET',
            'url': `https://mv-api-usva2.mediavalet.net/assets/cbb2d601-d6be-45f7-a7b8-67ff2a690355/xmp`,
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA0MUIwMUQ1OTg1ODI4MzcwNTI2Qjk5Rjc2MjgyNkIyNUM3QkE2ODciLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCQnNCMVpoWUtEY0ZKcm1mZGlnbXNseDdwb2MifQ.eyJuYmYiOjE2NjQ0NDk2MTEsImV4cCI6MTY2NTA1NDQxMSwiaXNzIjoiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20iLCJhdWQiOlsiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20vcmVzb3VyY2VzIiwiaHR0cHM6Ly9hcGktdXNpbC5tZWRpYXZhbGV0Lm5ldCJdLCJjbGllbnRfaWQiOiI1MTg1YjFiNS05MzhlLTRjNzktYmNkYi1hYjZiMjVjYjg1ODAiLCJzdWIiOiJkYXZpdGFhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsImF1dGhfdGltZSI6MTY2NDQ0OTYxMSwiaWRwIjoibG9jYWwiLCJhcGlfdXJpIjoiaHR0cHM6Ly9hcGktdXNpbC5tZWRpYXZhbGV0Lm5ldCIsIlBlcm1pc3Npb25zIjoiW3tcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjo5LFwiT2JqZWN0SWRcIjpcIjM1MDFlZWNmLThkMWUtNGRmMS1iYmEwLWZiZjY5YjNhY2E5N1wiLFwiUGVybWlzc2lvbnNcIjozMDI0OTkzMjA5Njk3NjMwOTIzLFwiUGVybWlzc2lvbnMyXCI6MX0se1wiU2VjdXJhYmxlT2JqZWN0VHlwZVwiOjEsXCJPYmplY3RJZFwiOlwiNTEzMjA1OTQtN2NlNy00NDc4LTkzODEtM2IxOGI0ZmFmYWM2XCIsXCJQZXJtaXNzaW9uc1wiOjMwMjQ5OTMyMDk2OTc2MzA5MjMsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCJlN2I4ZmNkOS1jMzUwLTRkNWEtOWZjZi0xM2FkOGI2OWMwYTJcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJSb2xlSWQiOiJcIjZkZmI0NGJmLTRkOTktNDFlYS05ZTE1LTJiZTZhZjVjYzk0NVwiIiwiVXNlck9yZ1VuaXRJZCI6IlwiMzUwMWVlY2YtOGQxZS00ZGYxLWJiYTAtZmJmNjliM2FjYTk3XCIiLCJVc2VyTmFtZSI6ImRhdml0YWFkbWluQG1lZGlhdmFsZXQubmV0IiwiRW1haWwiOiJkYXZpdGFhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlVzZXJJZCI6IlwiNzVjYjVlMzMtMmY3NS00N2I5LWEyNWUtNjUxNjFiYzdlN2ZlXCIiLCJTSWQiOiJcIjZkZmI0NGJmLTRkOTktNDFlYS05ZTE1LTJiZTZhZjVjYzk0NVwiIiwic2NvcGUiOlsiYXBpIl0sImFtciI6WyJwYXNzd29yZCJdfQ.LHtIU2grpEvFrevmxv-zvpOv3jWvIZVoCPzweYg5r_HTtRli5IZr8rKnQYkO05ikg2xgfplNdBipB8lb16BeGPkj_sIEh6sQhCkZueeSt9t7rISjrTLWbsEozpGsIoU0RgmiAAyxEvMsxnEAoS0bQBst0drGFxfMi462TVcr4CsKIBzDkCRDwKXJQ9ackgzqYnvHgxTh_KN4-IRjSYoFxFxWCqL63wDrJ7Lqb8LzfnzhGuYt9oHKrXdvV1vvERRnX_7ldOwq-q6jfAVv4W1zsDmK7zB6CDdR12cdSQ8oFo2DXfqLtSTtjOFSzfobD2VgeaDj8SXRTUtN3pfzyyhkP-u2MGB0V_38UtGWXDdqOMRGeAQMvaj-LCew8nYuVwQza1wsXN-7iAALaTIs7ZmGQ_ZCCEdgzpAN5GLV-zSoUn90HoR_rgPhj4MoJmPTL8erdKecNNTQZK0vjONv-RBD0F-F7_RJMspXkHe-UPSaGyJHLvhZEBuuhA3hqw-q04ICYPc7ulGzeZt0xSLhSkyEeCLaGoZpaRTKNuCZAZpInJGmn5RcTZqOTAm4vl3razgZIwT8ehFgwUMMiIT9tCT9iUHfSQBM1fv8oRx9CfCQru3JqcOrsU6hwY2A1ZUibXy_GFiNpsjeRxjAeOFcsmMA-aqGEnnYzbryhsyC26fBo3w'
            }
        }
        await request(options, function (error, response) {
            if (error) throw new Error(error);
            metadata.push(JSON.parse(response.body).payload)
        });
        console.log(metadata)
    }
    return 0;
}