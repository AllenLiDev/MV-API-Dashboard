const request = require('request');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'groupsIronMountain.csv',
    header: [
        {id: 'roleName', title: 'roleName'},
        {id: 'permissions', title: 'permissions'},
        {id: 'roleDescription', title: 'description'},
    ]
});
let options = {
    'method': 'GET',
    'url': 'https://mv-api-usca.mediavalet.net/groups',
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA0MUIwMUQ1OTg1ODI4MzcwNTI2Qjk5Rjc2MjgyNkIyNUM3QkE2ODciLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCQnNCMVpoWUtEY0ZKcm1mZGlnbXNseDdwb2MifQ.eyJuYmYiOjE2NjYxMzMwNTUsImV4cCI6MTY2NjczNzg1NSwiaXNzIjoiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20iLCJhdWQiOlsiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20vcmVzb3VyY2VzIiwiaHR0cHM6Ly9hcGktdXNjYS5tZWRpYXZhbGV0Lm5ldCJdLCJjbGllbnRfaWQiOiI1MTg1YjFiNS05MzhlLTRjNzktYmNkYi1hYjZiMjVjYjg1ODAiLCJzdWIiOiJudW5hYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJhdXRoX3RpbWUiOjE2NjYxMzMwNTUsImlkcCI6ImxvY2FsIiwiYXBpX3VyaSI6Imh0dHBzOi8vYXBpLXVzY2EubWVkaWF2YWxldC5uZXQiLCJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCIwNDE3ZTFlNS00NjE1LTQ1NGEtYWY5OS01YzkwYjgxZGY5NGNcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCJkMDE5OTI1NS04MTUyLTQxYjctOTU2MS1kZTBmZjg2ZTczZWVcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCJmZGE5YWRjYy0zNDgzLTRkMzItYWE0Yy02MmJlZWRlZjgzNzNcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJSb2xlSWQiOiJcImIzYmYzMzI2LTVhNmEtNGI2OC1iNTNhLWQwMGM3N2I4OGZmNlwiIiwiVXNlck9yZ1VuaXRJZCI6IlwiZmRhOWFkY2MtMzQ4My00ZDMyLWFhNGMtNjJiZWVkZWY4MzczXCIiLCJVc2VyTmFtZSI6Im51bmFhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIkVtYWlsIjoibnVuYWFkbWluQG1lZGlhdmFsZXQubmV0IiwiVXNlcklkIjoiXCJmYWNlODExNC01YTdmLTRjZTMtYjE4NS04MTIyNmVhYTQ0MTNcIiIsIlNJZCI6IlwiYjNiZjMzMjYtNWE2YS00YjY4LWI1M2EtZDAwYzc3Yjg4ZmY2XCIiLCJzY29wZSI6WyJhcGkiXSwiYW1yIjpbInBhc3N3b3JkIl19.VVndmV7DTGP_EExd_3FScsg08JYKJ6iEOESvbShZ3dRZ8Lh-7Fqk6q8qDqAlzv9LOAZNOBtXSeJ45A_aOY1m1Anby7f8U8KnPrCdvOHZ_7jlxFmhQcVGLATHUbsHyVdSKDjSMnZM9bF_Wu8YgubV5zhTofKqQ6aCra8xKjouGRKUJEAxVcFuoldY0wabu6NX7rS5hQVz2QY3gAJuonL-Wv1TcUjJvA9nqk9TeJhlGYwgINaDEaiOKBpNhFOpMNZnGmMDOwej_NzAVviiFHqBkjWVSiOLtFSf5mkS5K-hzVvYy9ot6cdb18DmeqxE7zFFk_1yexDHiC_vBLhdxkVU_1Uvn7EyIr10KF084UQgd-kfMfp0GG_PMrQDn5ltKmFi7A9iaeeIOAKETW2fCFo2A5TSci3UqoryPQuI_XrqSaFiCsgkgAniFqvbvCFdxsKI6KkueHZHWZRj3_VRYlfpLg6J-YuBb14afKOOgorJbDJYIWBIcv7KjIKb2SO3iFQfq1CQWpzgthuPBDd0YLPKtwfGRCrNLqMi0HvggaCIMiL5m6SH8t5T1SBaN54NcU4aviyRbnmMAaOH3IzhGUEMieSfEVwRLhEJW4XT8v5WfbinFHD6epYq8Om9TKiK9eOMQlkoRVXODNo0NoQlzqbpLvGX9iY4jOS3JWYNyZEIrX8'
    }
}

let groups;
request(options, function (error, response) {
    if (error) throw new Error(error);
    groups = (JSON.parse(response.body).payload);
    csvWriter
    .writeRecords(groups)
    .then(() => console.log('The CSV file was written successfully'))
});
