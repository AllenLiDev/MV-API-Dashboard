
const request = require('request');

let options = {
    'method': 'PUT',
    'url': 'https://mv-api-usca.mediavalet.com/groups/df913905-b43d-46b1-befe-e384904066b8',
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCIwY2NlOWNhNC05M2E1LTQ4YTctOWU2YS0yOTAyMmZhMTZjNTFcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCIzOWFhZTVjYy01ZjI4LTQ2YTItYTQwZS1jZDBiZjBiOTQ2NTVcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCJkMzFkMTdjNy0yMTAwLTQwYzktYjY1Ni1kOWM5NGQyZGNhYjRcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCIwY2NlOWNhNC05M2E1LTQ4YTctOWU2YS0yOTAyMmZhMTZjNTFcIiIsIlVzZXJJZCI6IlwiZGU0MGQ1NTctZGFjNC00NmIwLTg1N2YtNmMyNDIxNTFmZjAwXCIiLCJVc2VyTmFtZSI6ImFsbGVubGlhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlJvbGVJZCI6IlwiYjdjODk0YTQtMWI2Yi00MDkzLWE5NjItZTUxN2JhOGEyNTZjXCIiLCJFbWFpbCI6ImFsbGVubGlhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlNJZCI6IlwiYjdjODk0YTQtMWI2Yi00MDkzLWE5NjItZTUxN2JhOGEyNTZjXCIiLCJJcEFkZHJlc3MiOiIyMDkuNTMuMTguMjM0IiwiaXNzIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0aXNzdWVyLmNvbSIsImF1ZCI6Imh0dHA6Ly93d3cubWVkaWF2YWxldGF1ZGllbmNlLmNvbSIsImV4cCI6MTY2MDMyOTc4NywibmJmIjoxNjU5NzI0OTg3fQ.PeN8707zy2MMiQmBlUPn7JqhUHNdZccyYIraNNlhZIm83Kp3VjHKmAN41UK7Il_YUS5xTLGRSSB77jdg39wLN53I-1HkCpobW4UrILhBL0dkZ7JE4rQpo1XhzfFiDchf0_kI1UmbWUbfgFSDj5PR85dfRQd9B281tdpHBh28K2YTInvO1Msi5BFdLJ0rIcv0_qVJr4zfQj8QxkWufyKLJMMFKt_ekfzPuvQUJPm2elxOn_7AZyB4LTJxlhsn4uZpEN81mHx6x_YAX6O7SC_zdBB_mVoIZHHVFN48cWXXFmeqadGx0fj_Er3lMwL59T2x7x9KL6Zr990WlCw2Y13Vyw'},
    'form': {
        "roleName": "custom-changed",
        "roleDescription": "",
        "inheritedFrom": [
          "Member"
        ],
        "permissions": [
          "CMISRead",
          "List",
          "ListViewableOnly",
          "RequestDownload",
          "DownloadRenditionOnly",
          "AddToCart",
          "CMISWrite",
          "ViewVersions",
          "ViewLinkedAssets",
          "ShareAssetsAsRendition",
          "ShareLightboxAsRendition",
          "ViewAssetComments",
          "ViewAssetHistory",
          "VideoIntelligenceView",
          "GenerateDirectLinkForRenditionsOnly"
        ],
        "id": "df913905-b43d-46b1-befe-e384904066b8",
        "repositories": [
          "d31d17c7-2100-40c9-b656-d9c94d2dcab4"
        ],
        "orgUnitId": "0cce9ca4-93a5-48a7-9e6a-29022fa16c51",
        "orgUnitName": "Allen Li",
        "libraryName": [
          "Allen Li Library"
        ],
        "isDefaultGroup": false,
        "_links": {
          "self": "group",
          "functions": [
            "groups"
          ]
        },
        "translationKeys": {},
        "interpolations": {},
        "whenCancelled": {}
      }
};

// users can be removed but used for api testing
// make request for user data
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response)
});