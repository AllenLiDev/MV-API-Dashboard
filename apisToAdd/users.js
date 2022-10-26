// Install dependencies 
// npm i -s csv-writer
// npm i -s request

// Call dependencies
const request = require('request');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// set csv writer format
const csvWriter = createCsvWriter({
    path: 'usersCorsairJune16.csv',
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
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCI2NzkzMTNlYS0zMTJhLTQ3Y2EtYTI1Yi0wODRmODU1ZDljMWFcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCI3N2FhYmE4MS1lMDQ4LTRmODgtYmEzNi1jM2MzYjFlOWM2NjNcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCI3ZGNlMGIwYy0xYmJiLTQ4Y2QtOGJmMS1jYjk5NDc0MWQyZDZcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCI3N2FhYmE4MS1lMDQ4LTRmODgtYmEzNi1jM2MzYjFlOWM2NjNcIiIsIlVzZXJJZCI6IlwiNTFmNWY1NGMtYzM4Mi00MmZhLWIzMjctNTczMjk5NjU1OGZiXCIiLCJVc2VyTmFtZSI6ImNvcnNhaXJjb21wb25lbnRzaW5jLmFkbWluQG1lZGlhdmFsZXQubmV0IiwiUm9sZUlkIjoiXCJhMjM4ZTg4OS0yZjgyLTRmZWYtOGIzMi1jOTg2ZmZmMTg5MjdcIiIsIkVtYWlsIjoiY29yc2FpcmNvbXBvbmVudHNpbmMuYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJTSWQiOiJcImEyMzhlODg5LTJmODItNGZlZi04YjMyLWM5ODZmZmYxODkyN1wiIiwiSXBBZGRyZXNzIjoiMjA5LjUzLjE4LjIzNCIsImlzcyI6Imh0dHA6Ly93d3cubWVkaWF2YWxldGlzc3Vlci5jb20iLCJhdWQiOiJodHRwOi8vd3d3Lm1lZGlhdmFsZXRhdWRpZW5jZS5jb20iLCJleHAiOjE2NTYwMDU1NTQsIm5iZiI6MTY1NTQwMDc1NH0.eVAnMi0KUOlsdYyef-sztiIuhoPS23NrkjxyoJ4l9-M0VgL6HJ-0S1eO6jyXL1DdXbnAbUOH-eGZYje1i2HVwGw4lwT0Zs3q731Ryy5la7Mi08N7u6cz5aV9k06Vss9_8E8qJQ9C6nq7Q-xYpK5V_1KVhZpxAhfQwBj2y-SAhwg0rrUB0yuy8VEoxMf1gWPXvvNHUrs4iWwub6lO4GaXOVED0QAS3jQ7hzPuvoXLkUsTDKjqReU7FfMNm5xzqpHAy_H0q7h6Di0PI_osLU8aBMIc11ol1pfc2L-fQte4G6aH2lsazCnH8kGD9DE3RTE8FwYXunENqKVziK8FybZClg'}
};

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