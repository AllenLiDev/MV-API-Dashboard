// Install dependencies 
// npm i -s csv-writer
// npm i -s request

// Call dependencies
const request = require('request');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// set csv writer format
const csvWriter = createCsvWriter({
    path: 'userssonosnov.csv',
    header: [
        { id: 'id', title: 'id' },
        { id: 'userName', title: 'userName' },
        { id: 'address', title: 'address' },
        { id: 'defaultGroup', title: 'defaultGroup' },
        { id: 'userDomain', title: 'userDomain' },
        { id: 'firstName', title: 'firstName' },
        { id: 'lastName', title: 'lastName' },
        { id: 'department', title: 'department' },
        { id: 'position', title: 'position' },
        { id: 'title', title: 'title' },
        { id: 'officeNumber', title: 'officeNumber' },
        { id: 'cellularNumber', title: 'cellularNumber' },
        { id: 'faxNumber', title: 'faxNumber' },
        { id: 'emailAddress', title: 'emailAddress' },
        { id: 'comment', title: 'comment' },
        { id: 'defaultSkin', title: 'defaultSkin' },
        { id: 'additionalMessage', title: 'additionalMessage' },
        { id: 'adminNotes', title: 'adminNotes' },
        { id: 'lastActiveAt', title: 'lastActiveAt' },
        { id: 'lastLockedOutAt', title: 'lastLockedOutAt' },
        { id: 'lastLoginAt', title: 'lastLoginAt' },
        { id: 'createdAt', title: 'createdAt' },
        { id: 'expiresAt', title: 'expiresAt' },
        { id: 'termsandconditionsacceptedat', title: 'termsandconditionsacceptedat' },
        { id: 'termsConditionsAcceptanceStatus', title: 'Accepted' },
        { id: 'alertsEnabled', title: 'alertsEnabled' },
        { id: 'newUserNotification', title: 'newUserNotification' },
        { id: 'password', title: 'password' },
        { id: 'organizationName', title: 'organizationName' },
        { id: 'isLockedOut', title: 'isLockedOut' },
        { id: 'isSuspended', title: 'isSuspended' },
        { id: 'isApproved', title: 'isApproved' },
        { id: 'userType', title: 'userType' },
        { id: 'isExternalUser', title: 'isExternalUser' }
    ]
});

// set options for api call
let options = {
    'method': 'GET',
    'url': 'https://mv-api-usca.mediavalet.com/users',
    'headers': {
        'content-type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA0MUIwMUQ1OTg1ODI4MzcwNTI2Qjk5Rjc2MjgyNkIyNUM3QkE2ODciLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCQnNCMVpoWUtEY0ZKcm1mZGlnbXNseDdwb2MifQ.eyJuYmYiOjE2Njk1NzkwNzcsImV4cCI6MTY3MDE4Mzg3NywiaXNzIjoiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20iLCJhdWQiOlsiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20vcmVzb3VyY2VzIiwiaHR0cHM6Ly9hcGktdXN2YS5tZWRpYXZhbGV0Lm5ldCJdLCJjbGllbnRfaWQiOiI1MTg1YjFiNS05MzhlLTRjNzktYmNkYi1hYjZiMjVjYjg1ODAiLCJzdWIiOiJzb25vc2FkbWluQG1lZGlhdmFsZXQubmV0IiwiYXV0aF90aW1lIjoxNjY5NTc5MDc3LCJpZHAiOiJsb2NhbCIsImFwaV91cmkiOiJodHRwczovL2FwaS11c3ZhLm1lZGlhdmFsZXQubmV0IiwiUGVybWlzc2lvbnMiOiJbe1wiU2VjdXJhYmxlT2JqZWN0VHlwZVwiOjksXCJPYmplY3RJZFwiOlwiMDNlYTYwOGItOTZiYy00ZjcxLTg0NjktNDI1MzI4MGU0OWIyXCIsXCJQZXJtaXNzaW9uc1wiOjEyMjQ4MzY1MjQ2NTUyNDA2NzMxLFwiUGVybWlzc2lvbnMyXCI6MX0se1wiU2VjdXJhYmxlT2JqZWN0VHlwZVwiOjEsXCJPYmplY3RJZFwiOlwiNWY3NDE0NzYtZWFiNi00ZGFkLWI1YmItYWI1OWE1OWQyOGU3XCIsXCJQZXJtaXNzaW9uc1wiOjEyMjQ4MzY1MjQ2NTUyNDA2NzMxLFwiUGVybWlzc2lvbnMyXCI6MX0se1wiU2VjdXJhYmxlT2JqZWN0VHlwZVwiOjAsXCJPYmplY3RJZFwiOlwiOGVlZTgzYTktN2M0NC00OTJjLTg0OTctZDgxMTU4M2RjODA0XCIsXCJQZXJtaXNzaW9uc1wiOjEyMjQ4MzY1MjQ2NTUyNDA2NzMxLFwiUGVybWlzc2lvbnMyXCI6MX1dIiwiUm9sZUlkIjoiXCJmMmQwZGUxYi01ZTc3LTQwYzktYmRjYS1kMGFiY2RhNTg2YzNcIiIsIlVzZXJPcmdVbml0SWQiOiJcIjAzZWE2MDhiLTk2YmMtNGY3MS04NDY5LTQyNTMyODBlNDliMlwiIiwiVXNlck5hbWUiOiJzb25vc2FkbWluQG1lZGlhdmFsZXQubmV0IiwiRW1haWwiOiJzb25vc2FkbWluQG1lZGlhdmFsZXQubmV0IiwiVXNlcklkIjoiXCIzYzllNWJmMy01YmZlLTQ5NWItYTFkOC01MzczN2NlZGM3MzdcIiIsIlNJZCI6IlwiZjJkMGRlMWItNWU3Ny00MGM5LWJkY2EtZDBhYmNkYTU4NmMzXCIiLCJzY29wZSI6WyJhcGkiXSwiYW1yIjpbInBhc3N3b3JkIl19.iOzZDxuIX0po32qWmuKfA1QfrWBGFo5tUg59x147Pa4xw1rP_h7CaKhTSKPyS4_Oq4kwJKtQkZSZXCMYRXnX48m_dK0XJEyr1s8kIY-Eu5s4xOG7vDZRsDkRJEX3ZHBfDybrWniz71KqZqrSeN1NQn9B8LvcKeD5JJi_AJQCvXBggyTUflzvgG4uZY8n_xa5ojJ_FKGDOzKs48Ae7Ij-sScucn2fAeVqTd3ZGefOLilQo8RCimdCMaFeSKI7T6j78B8w3Ztl2-wVJwqSycT9PP1qLikEkAkxYwur7r9q-wK6E1FSAIWNEkbNXQ4swUyqaWYcShw585EWM8bk16AqgXZs_fBjC4kHGPKEkcohk4Rsl16fwtOuy2s3PdrqzaQM5uvDRLjSwwGSrBtym1CLBk1mYbI0mdydJ8sdW_zq2k27a5b19_MTB2jCHvizcJecmpfJd55_hR1vIOIfzPH1G5NRPJ3UCmTuqdHmUXguZCTdS0ImC3hH0OEBrNK1Ur_xRLYna9dWKXQTU7XllnidaLfxJoECVACukOwAzV2OgZbnEhxvkp4zVZWyyHbIJUPCS63GNmCRQauPzOv7W_WSRXCCGy05nO-bO15VLTjAfdJEq3V02t9MX1QtMLbD0KBX_cuLDgEhBXBSyb1I-8RXvOpg4tMp2tVUVSgL4QW1ljM"
    }
}

let users = [];

// users can be removed but used for api testing
// make request for user data
request(options, function (error, response) {
    if (error) throw new Error(error);
    users = JSON.parse(response.body).payload.users;
    csvWriter
    .writeRecords(users)
    .then(() => console.log('The CSV file was written successfully'))
});