const request = require('request');
const fs = require('fs');

fs.createReadStream("C:\\Users\\Allen.Li\\Downloads\\ultradent.csv")
    .pipe(csv())
    .on('data', (data) => {
        assets.push(
            {
                assetId: data.AssetId
            }
        );
    })
    .on('end', () => {
        console.log(assets)
        // updateAssetCategories()
    });

for (let count = 0; count < 1; count++) {
    let options = {
        'method': 'GET',
        'url': `https://api.mediavalet.com/assets/${assets[count].assetId}/relatedassets`,
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA0MUIwMUQ1OTg1ODI4MzcwNTI2Qjk5Rjc2MjgyNkIyNUM3QkE2ODciLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCQnNCMVpoWUtEY0ZKcm1mZGlnbXNseDdwb2MifQ.eyJuYmYiOjE2NjczNDAwNjEsImV4cCI6MTY2Nzk0NDg2MSwiaXNzIjoiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20iLCJhdWQiOlsiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20vcmVzb3VyY2VzIiwiaHR0cHM6Ly9hcGktdXNjYS5tZWRpYXZhbGV0Lm5ldCJdLCJjbGllbnRfaWQiOiI1MTg1YjFiNS05MzhlLTRjNzktYmNkYi1hYjZiMjVjYjg1ODAiLCJzdWIiOiJ1bHRyYWRlbnRhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsImF1dGhfdGltZSI6MTY2NzM0MDA2MSwiaWRwIjoibG9jYWwiLCJhcGlfdXJpIjoiaHR0cHM6Ly9hcGktdXNjYS5tZWRpYXZhbGV0Lm5ldCIsIlBlcm1pc3Npb25zIjoiW3tcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjowLFwiT2JqZWN0SWRcIjpcIjQ5NmQxNjgzLTc4OTgtNGY5Ny1hNWM1LWMyODNkMGM1MmM2ZFwiLFwiUGVybWlzc2lvbnNcIjoxMjI0ODM2NTI0NjU1MjQwNjczMSxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjo5LFwiT2JqZWN0SWRcIjpcIjRhNDc3OGUyLTRiMDctNDY0OC1hNDM4LTFhMGMxY2ViYjVlZFwiLFwiUGVybWlzc2lvbnNcIjoxMjI0ODM2NTI0NjU1MjQwNjczMSxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjoxLFwiT2JqZWN0SWRcIjpcIjUwOGYzYWFiLWQyNDItNDRlOS1hOWY5LWM3YmZhZjc3ODIzZlwiLFwiUGVybWlzc2lvbnNcIjoxMjI0ODM2NTI0NjU1MjQwNjczMSxcIlBlcm1pc3Npb25zMlwiOjF9XSIsIlJvbGVJZCI6IlwiZTdiZDgzMDAtYmM3MS00NmYxLThjZTctM2U0NGMwZmQ3YmY1XCIiLCJVc2VyT3JnVW5pdElkIjoiXCI0YTQ3NzhlMi00YjA3LTQ2NDgtYTQzOC0xYTBjMWNlYmI1ZWRcIiIsIlVzZXJOYW1lIjoidWx0cmFkZW50YWRtaW5AbWVkaWF2YWxldC5uZXQiLCJFbWFpbCI6InVsdHJhZGVudGFkbWluQG1lZGlhdmFsZXQubmV0IiwiVXNlcklkIjoiXCI3ZDg4NjBlOC03ZDBkLTRmZjItODI3Zi1iMzk4OWJmYWQyY2RcIiIsIlNJZCI6IlwiZTdiZDgzMDAtYmM3MS00NmYxLThjZTctM2U0NGMwZmQ3YmY1XCIiLCJzY29wZSI6WyJhcGkiXSwiYW1yIjpbInBhc3N3b3JkIl19.pCiFxPAZgHF_UhkiBfx-6cmxAds_FEWYEEZ6UN04RL9-LEoLEL7tufMcPD0odYfJuOQYcTANsJQE0lxPknUuDkDFVJ10qRqdQrABFUtXlkjFEE-EMry_bksGUQkgg8V7M4JjotD0yXzx1_K7-zFrh_ZzxrUOZ-QBGSnuedX-v-HcFlOdyEd0cyQOqw0U3VCioJQIRymgNixnWkSiD9yWWX05vxKAOgkPLXg6fNQyaK9lYd0DJCIvfGJZbHA67caxU1Nfre9DSR06mgYrF1zpWs7_RiQudysQu_yRTe1eQEzRtHOEVpirpQSISUgWFrNlo5wAhve7hF6e-meLHHYECl6xZlfLCHuIGF3o7-PfyBxQOjOsT0EJyWEMZhACZ2hqa8dr1KkeBDIMQv5u264SxAAU2boleLzl-emldNc80eYI3E7gyVh8oz9EhAUDfXw55PNPUzxv1UbDmtKZLFHbn0JOhB2oMqjVUeodaB4yxiX9Vln8vrfac2XOilEtyX_Pt9Rvs-4LEp6SG_piN3VMTRHlDm2Hddstw01ARCm0q_AK-ruVH8goVE3TRJfXpTUAFH3FahKwh3-umI9ofvu96DbdoRGXtmcQnUjO5P97KfSowbktUA7bHe8iqQuevZGRgpytJpCGElecmhZ6UNqC6uChu_C00UzttI_S0zLADJc'
        }
    }

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body)
    });
}
