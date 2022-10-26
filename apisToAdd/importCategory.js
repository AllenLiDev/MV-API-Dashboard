const axios = require('axios').default;
const csv = require('csv-parser');
const fs = require('fs');
let assets = []
// Read CSV
fs.createReadStream("C:\\Users\\Allen.Li\\OneDrive - MediaValet\\API\\CategoryIdsNoNull2.csv")
    .pipe(csv())
    .on('data', (data) => {
        assets.push(
            {
                assetId: data.AssetId,
                category: data.CategoryId
            }
        );
    })
    .on('end', () => {
        // console.log(assets)
        importCategory(0)
    });

// Import categories
const importCategory = async (count) => {
    let url = `https://mv-api-usca.mediavalet.com/assets/${assets[count].assetId}/categories`
    const headers = {
        'content-type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA0MUIwMUQ1OTg1ODI4MzcwNTI2Qjk5Rjc2MjgyNkIyNUM3QkE2ODciLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCQnNCMVpoWUtEY0ZKcm1mZGlnbXNseDdwb2MifQ.eyJuYmYiOjE2NjAxNTIwMjIsImV4cCI6MTY2MDc1NjgyMiwiaXNzIjoiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20iLCJhdWQiOlsiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20vcmVzb3VyY2VzIiwiaHR0cHM6Ly9hcGktdXNjYS5tZWRpYXZhbGV0Lm5ldCJdLCJjbGllbnRfaWQiOiI1MTg1YjFiNS05MzhlLTRjNzktYmNkYi1hYjZiMjVjYjg1ODAiLCJzdWIiOiJmdW5pbWF0aW9uYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJhdXRoX3RpbWUiOjE2NjAxNTIwMjEsImlkcCI6ImxvY2FsIiwiYXBpX3VyaSI6Imh0dHBzOi8vYXBpLXVzY2EubWVkaWF2YWxldC5uZXQiLCJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCI1ZTJlNDdiZi1iMjU4LTRhNmUtYTZmNi1iYmRiMThlYTNmOGFcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCI2MTlmMWIyMy0yMGVkLTQzNjAtYmM2MS03ZWU0ODVhZTBlYjVcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCJhZmIxN2I5Ny1lOTEwLTRmMGUtOWU3Ny04MWVmOWUyNzRlOTBcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJSb2xlSWQiOiJcImQ1MWRjYWMxLTE5YWEtNGRiMS05MzY1LTFjYWUyZTY0YzU1NlwiIiwiVXNlck9yZ1VuaXRJZCI6IlwiNjE5ZjFiMjMtMjBlZC00MzYwLWJjNjEtN2VlNDg1YWUwZWI1XCIiLCJVc2VyTmFtZSI6ImZ1bmltYXRpb25hZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIkVtYWlsIjoiZnVuaW1hdGlvbmFkbWluQG1lZGlhdmFsZXQubmV0IiwiVXNlcklkIjoiXCI3YTljOWVmZS1jNTc0LTQwZDItYWFiZS0xOWQ3ZjhlYmM2YmFcIiIsIlNJZCI6IlwiZDUxZGNhYzEtMTlhYS00ZGIxLTkzNjUtMWNhZTJlNjRjNTU2XCIiLCJzY29wZSI6WyJhcGkiXSwiYW1yIjpbInBhc3N3b3JkIl19.cSAzrPHCocjTsWHc2oYn_Ae9-EYlBh6m1o8-XDSYael06SEV_ss_4LwWQEiDLzgCtxBqXb4kW_6hxYkce8rRsGHSCBuwGNRvzdZ8bxX7ogFiRYwhm-p6AmfFgvN00RSxUreHOVK0swR8FZG9jTUOW7InWKsjmQRyZLhw8_1JzloQSjuY2G14N3v0odDIw7iLxFqyCO7jUVdshby6_Gl11UA9nj20NjsOwgNSJvWQjI6i4jRQeQmwqCcmpCYgjhb38G5Cj2EbVLhI-wjWUg65TWc2xMYUneyKP-_4c5l-SmpSeWepyDj5ubO1Mi-xb96cZP0Detgfdx01xwAlszb8t-SwgGUTUXRyXqc38eMbdAbJzEWA6fBkYtbBO5mKuTLtSdLs4hvZwbM0kJcQ3NfXykTptkz5UiZT1FL7FwNalbEp3rYWvDasX5CrIG1pfKpVuPJz0EegP9XhMBklpXies5VaDJS7hucwikMoYBf6aI0GzpGDLNd5ocNqDu0gHommcuK0g14TmzGUyOQFK_i_oIGyJRINGeCeULdUaH7a1SjgR8L9Sr5MHntDSdK77FHFB6c7we5_wZeR5xAkdov_RSYJQygKsvWpJ6_8i5hh9ZlenSIjhM7rI-i3y9BVQy6zGWuvjK2_PAmMIl_q1PXWp2NdsKgwIPAqe1TUBAzJ43E'
    }
    let data = JSON.stringify([assets[count].category])
    try {
        console.log(count)
        const res = await axios.post(url, data, { headers: headers })
    }
    catch (err) {
        console.log(err)
    }
    // recurse
    if (count < (assets.length -1)) {
        importCategory(++count)
    }
}