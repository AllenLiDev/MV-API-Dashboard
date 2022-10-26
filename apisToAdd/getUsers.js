const request = require('request');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'usersRCXSports.csv',
    header: [
        { id: 'id', title: 'userId'},
        { id: 'userName', title: 'Username' },
        { id: 'defaultGroup', title: 'DefaultGroup' },
        { id: 'firstName', title: 'FirstName' },
        { id: 'lastName', title: 'LastName' },
        { id: 'lastActiveAt', title: 'LastActive' },
        { id: 'lastLoginAt', title: 'LastLogin' },
        { id: 'createdAt', title: 'CreatedAt' },
        { id: "isLockedOut", title: "IsLockedOut" },
        { id: "isSuspended", title: "IsSuspended" },
        { id: "isApproved", title: "IsApproved" },
        { id: "emailAddress", title: "emailAddress" },
        { id: "roleId", title: "roleId" },
        { id: "organizationName", title: "organizationName" },
        { id: "cellularNumber", title: "cellularNumber" },
        { id: "position", title: "position" },
        { id: "title", title: "title" },
        { id: "address", title: "address" },
    ]
});
let options = {
    'method': 'GET',
    'url': 'https://mv-api-usca.mediavalet.net/users',
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCIzNWMxMTBhNC1kMDAxLTQzYmMtOTZkYy00MTA3ZWI0NzM3OTBcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCJiMzY4Y2JkOS05Y2E0LTQxZjktOTAzOS0xNzljM2FiZDQ2ZTRcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCJkZGE2MzkwNy0zMjcyLTQ4NWQtYTVmMC1kMWE4Y2VkYzBhM2JcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCJiMzY4Y2JkOS05Y2E0LTQxZjktOTAzOS0xNzljM2FiZDQ2ZTRcIiIsIlVzZXJJZCI6IlwiNDFjYmE2ZjEtNmFiOS00NTQ3LWEzNTUtZDJiNGM0ZWRjNDcxXCIiLCJVc2VyTmFtZSI6InJjeHNwb3J0c2FkbWluQG1lZGlhdmFsZXQubmV0IiwiUm9sZUlkIjoiXCIwMzI5ODBkZC02MjhlLTRkOTgtYTg4Mi0yNTc3NjQxMjI2NGZcIiIsIkVtYWlsIjoicmN4c3BvcnRzYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJTSWQiOiJcIjAzMjk4MGRkLTYyOGUtNGQ5OC1hODgyLTI1Nzc2NDEyMjY0ZlwiIiwiSXBBZGRyZXNzIjoiMjA5LjUzLjE4LjIzNCIsImlzcyI6Imh0dHA6Ly93d3cubWVkaWF2YWxldGlzc3Vlci5jb20iLCJhdWQiOiJodHRwOi8vd3d3Lm1lZGlhdmFsZXRhdWRpZW5jZS5jb20iLCJleHAiOjE2NjY4OTU5MDgsIm5iZiI6MTY2NjI5MTEwOH0.Jhsu9zdI3DLyYYIboMt3DwuXMv6FMyrCEpG5dxMHF9JyH00hUXeX8qMh7MbAEbb5VJG8u7lGkVFp7IV0NYRm-Ol4GVeRKDHQ0VpmopwcNBhrWkUIvNCMT_NgYM5A_wAUbTU263fTxnCqES3OL-6FyN9ShPWcB5KVJz3RXDtw2cYO2PIoIorJQVwWPPBxcFM-uNhxyrIt9Q3WEir6ApA09bsyfc3vNDxvo26QL-5ebJDFn8Vy2r2A_bQskAxBIFJ872-81XwN1QLPMUhA7xNTy9E0fZI2vzVtK9D1eMM4X3GTrVH8T_DrekKRHSrGw1QdTUKLKubxQtykWk3_v-fdHQ'
    },
    "body": JSON.stringify({
        "count": 1000,
        "offset": 0,
        "search": true,
    })
}

let groups;
request(options, function (error, response) {
    if (error) throw new Error(error);
    users = (JSON.parse(response.body).payload.users);
    // console.log(users)
    csvWriter
        .writeRecords(users)
        .then(() => console.log('The CSV file was written successfully'))
});
