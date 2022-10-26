const request = require('request');

let options = {
    'method': 'POST',
    'url': 'https://mv-api-usva.mediavalet.net/users',
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA0MUIwMUQ1OTg1ODI4MzcwNTI2Qjk5Rjc2MjgyNkIyNUM3QkE2ODciLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCQnNCMVpoWUtEY0ZKcm1mZGlnbXNseDdwb2MifQ.eyJuYmYiOjE2NTA0ODc1NzIsImV4cCI6MTY1MTA5MjM3MiwiaXNzIjoiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20iLCJhdWQiOlsiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20vcmVzb3VyY2VzIiwiaHR0cHM6Ly9hcGktdXN2YS5tZWRpYXZhbGV0Lm5ldCJdLCJjbGllbnRfaWQiOiI1MTg1YjFiNS05MzhlLTRjNzktYmNkYi1hYjZiMjVjYjg1ODAiLCJzdWIiOiJjYm5hZG1pbkBtZWRpYXZhbGV0Lm5ldCIsImF1dGhfdGltZSI6MTY1MDQ4NzU3MSwiaWRwIjoibG9jYWwiLCJhcGlfdXJpIjoiaHR0cHM6Ly9hcGktdXN2YS5tZWRpYXZhbGV0Lm5ldCIsIlBlcm1pc3Npb25zIjoiW3tcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjoxLFwiT2JqZWN0SWRcIjpcIjJlMGZmNmRkLTBlZjUtNDNhZi05ODE5LWQ0MmY3Mjg5NDNiN1wiLFwiUGVybWlzc2lvbnNcIjoxMjI0ODM2NTI0NjU1MjQwNjczMSxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjo5LFwiT2JqZWN0SWRcIjpcIjQyMWVhZGRmLTA4ZGItNDg2Ni04NmJiLTkzNjMxNDY4NzI4OVwiLFwiUGVybWlzc2lvbnNcIjoxMjI0ODM2NTI0NjU1MjQwNjczMSxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjowLFwiT2JqZWN0SWRcIjpcImM2YmQ5NjIzLWY0MzItNDZiZC1iMmNmLThkNWFkZDE0YjNkMVwiLFwiUGVybWlzc2lvbnNcIjoxMjI0ODM2NTI0NjU1MjQwNjczMSxcIlBlcm1pc3Npb25zMlwiOjF9XSIsIlJvbGVJZCI6IlwiMTEwYTk5ZDMtNGY5Zi00ZjI2LWExN2QtMDRhZjBjZWQ4ZmYwXCIiLCJVc2VyT3JnVW5pdElkIjoiXCI0MjFlYWRkZi0wOGRiLTQ4NjYtODZiYi05MzYzMTQ2ODcyODlcIiIsIlVzZXJOYW1lIjoiY2JuYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJFbWFpbCI6ImNibmFkbWluQG1lZGlhdmFsZXQubmV0IiwiVXNlcklkIjoiXCJmMzA5ZDc0MS1iODhlLTQ4YjYtODM2Yy1kZTMzNzYzYzY2OTlcIiIsIlNJZCI6IlwiMTEwYTk5ZDMtNGY5Zi00ZjI2LWExN2QtMDRhZjBjZWQ4ZmYwXCIiLCJzY29wZSI6WyJhcGkiXSwiYW1yIjpbInBhc3N3b3JkIl19.Q-84b4itqyHt_IDJYamrlsCOzpSs2AZLkWUbb3scP4yJr1OemDKtFkGqxadkptz6buruI5BTXQUHBshH0UUKvsEJ6tOqCrW_WC4VOCvb3lKEueQGGQ7iCXhaRu8eyY9oGDLfO46p7eUj39WrAlyu4Si4kSmML8ynKdonMSL1IyVH6yJJK7H8_VQY7ckejZn7264A8nWJ_4eivVNKdYTaAJOe_uUc9QOdGjEJiPOTj5Ng-XkPy1bVHQf2oU3uyJ3K3taG2LYJ6BeYKSoPHCgzv6z_X2pmNFFml7PX8DIA4oL6rRdzdn2ZbkhCCwR38rsxkkebXG9R3ovF4GiU-6J7i8_r1rv3GAlj3xR_lEop04c0pPd-bnGQIlmmXIQQrN-Po94_faXiAirCoMQEcGsuXSpISaf7baB8Y8oph2u5PZpmYLKgfAr3tBm1ysNrRpAKijGVZZuZ6BCFptPJirnO5Wre6VWuCdDPvx9v_RzvfBg9kzzDuQ5AmjX2munGIaHaKiduS3AkNr6gthoF0WrpMUoRimd2Xcmwwr3kZEQxT4xzZ8jORde_VDilmXfPXtSPM_WWXuxJQTWliNJ47FpQhfG8tnTEyrSQtFs1bi-NKnaEDlt5KerVL_x9xFEIpWzZekkgVxtBVu9lOO_GjKC56RCthdkOD2IYx9ZV4dwn4cY'
    },
    'body': JSON.stringify({
        "newUserNotification": true,
        "alertsEnabled": true,
        "defaultGroup": "Approver",
        "organizationName": "allenli",
        "firstName": "Ming",
        "lastName": "Li",
        "emailAddress": "testthisaccount@mediavalet.net",
        "passwordinformation": {
            "password": "A123456!"
        },
        "userName": "testthisaccount@mediavalet.net",
        "officeNumber": "",
        "website": "",
        "address": ""
    })
};

request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body)
});