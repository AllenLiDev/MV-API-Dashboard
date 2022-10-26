var request = require('request');
const fs = require('fs');
const csv = require('csv-parser');
const users = []

fs.createReadStream("C:\\Users\\Allen.Li\\OneDrive - MediaValet\\API\\usersRCXSports.csv")
    .pipe(csv())
    .on('data', (data) => {
        users.push(
            {
                userId: data.userId,
                userName: data.Username,
                firstname: data.FirstName,
                lastName: data.LastName,
                defaultGroup: data.DefaultGroup,
                emailAddress: data.emailAddress,
                roleId: data.roleId,
                position: data.position,
                title: data.title,
                address: data.address,
                cellularNumber: data.cellularNumber,
                organizationName: data.organizationName
            }
        );
    })
    .on('end', () => {
        // console.log(users)
        updateUserGroup()
    });



const updateUserGroup = () => {
    for (user of users) {
        var options = {
            'method': 'PUT',
            'url': `https://mv-api-usca.mediavalet.net/users/${user.userId}`,
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCIzNWMxMTBhNC1kMDAxLTQzYmMtOTZkYy00MTA3ZWI0NzM3OTBcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCJiMzY4Y2JkOS05Y2E0LTQxZjktOTAzOS0xNzljM2FiZDQ2ZTRcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCJkZGE2MzkwNy0zMjcyLTQ4NWQtYTVmMC1kMWE4Y2VkYzBhM2JcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCJiMzY4Y2JkOS05Y2E0LTQxZjktOTAzOS0xNzljM2FiZDQ2ZTRcIiIsIlVzZXJJZCI6IlwiNDFjYmE2ZjEtNmFiOS00NTQ3LWEzNTUtZDJiNGM0ZWRjNDcxXCIiLCJVc2VyTmFtZSI6InJjeHNwb3J0c2FkbWluQG1lZGlhdmFsZXQubmV0IiwiUm9sZUlkIjoiXCIwMzI5ODBkZC02MjhlLTRkOTgtYTg4Mi0yNTc3NjQxMjI2NGZcIiIsIkVtYWlsIjoicmN4c3BvcnRzYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJTSWQiOiJcIjAzMjk4MGRkLTYyOGUtNGQ5OC1hODgyLTI1Nzc2NDEyMjY0ZlwiIiwiSXBBZGRyZXNzIjoiMjA5LjUzLjE4LjIzNCIsImlzcyI6Imh0dHA6Ly93d3cubWVkaWF2YWxldGlzc3Vlci5jb20iLCJhdWQiOiJodHRwOi8vd3d3Lm1lZGlhdmFsZXRhdWRpZW5jZS5jb20iLCJleHAiOjE2NjY4OTU5MDgsIm5iZiI6MTY2NjI5MTEwOH0.Jhsu9zdI3DLyYYIboMt3DwuXMv6FMyrCEpG5dxMHF9JyH00hUXeX8qMh7MbAEbb5VJG8u7lGkVFp7IV0NYRm-Ol4GVeRKDHQ0VpmopwcNBhrWkUIvNCMT_NgYM5A_wAUbTU263fTxnCqES3OL-6FyN9ShPWcB5KVJz3RXDtw2cYO2PIoIorJQVwWPPBxcFM-uNhxyrIt9Q3WEir6ApA09bsyfc3vNDxvo26QL-5ebJDFn8Vy2r2A_bQskAxBIFJ872-81XwN1QLPMUhA7xNTy9E0fZI2vzVtK9D1eMM4X3GTrVH8T_DrekKRHSrGw1QdTUKLKubxQtykWk3_v-fdHQ'
            },
            // body: Json.string([id, id])
            'body': JSON.stringify(
                {
                    "userName": user.userName,
                    "firstname": user.firstname,
                    "lastName": user.lastName,
                    "emailAddress": user.emailAddress,
                    "position": user.position,
                    "title": user.title,
                    "address": user.address,
                    "cellularNumber": user.cellularNumber,
                    "organizationName": user.organizationName,
                    "roleId": "e309ed15-4b11-4acc-b807-4b61d2a6689f",
                    "defaultGroup": "League Organizer - NFL FLAG"
                }
            ),
        }
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });
    }
}