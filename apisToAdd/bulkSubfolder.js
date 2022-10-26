var request = require('request');

let idArray = ["dc4d1952-d9ba-461a-a0f0-94e73e8644f9", "46b4f18d-5bbe-4a32-bb58-d182fd658f58", "ffd18d32-47e1-4aa0-9570-59ae396b2f2f", "c95f5ead-d59b-40eb-b85c-91bf501fd80e", "bf6fcd09-125a-462a-9825-8e9018092c0c"]

    idArray.forEach(id => {
    var options = {
        'method': 'PATCH',
        'url': 'https://mv-api-usca.mediavalet.com/categories/' + id,
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkY5RTE0NTg1NzM4NEFFMTlDQjcxRkNFQkI0NEQzNjEyRDJFNTNDQTIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiItZUZGaFhPRXJobkxjZnpydEUwMkV0TGxQS0kifQ.eyJuYmYiOjE2NDcyOTIwNTgsImV4cCI6MTY0Nzg5Njg1OCwiaXNzIjoiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20iLCJhdWQiOlsiaHR0cHM6Ly9pYW0ubWVkaWF2YWxldC5jb20vcmVzb3VyY2VzIiwiaHR0cHM6Ly9hcGktdXNjYS5tZWRpYXZhbGV0Lm5ldCJdLCJjbGllbnRfaWQiOiI1MTg1YjFiNS05MzhlLTRjNzktYmNkYi1hYjZiMjVjYjg1ODAiLCJzdWIiOiJmdW5pbWF0aW9uYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJhdXRoX3RpbWUiOjE2NDcyOTIwNTgsImlkcCI6ImxvY2FsIiwiYXBpX3VyaSI6Imh0dHBzOi8vYXBpLXVzY2EubWVkaWF2YWxldC5uZXQiLCJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCI1ZTJlNDdiZi1iMjU4LTRhNmUtYTZmNi1iYmRiMThlYTNmOGFcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCI2MTlmMWIyMy0yMGVkLTQzNjAtYmM2MS03ZWU0ODVhZTBlYjVcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCJhZmIxN2I5Ny1lOTEwLTRmMGUtOWU3Ny04MWVmOWUyNzRlOTBcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJSb2xlSWQiOiJcImQ1MWRjYWMxLTE5YWEtNGRiMS05MzY1LTFjYWUyZTY0YzU1NlwiIiwiVXNlck9yZ1VuaXRJZCI6IlwiNjE5ZjFiMjMtMjBlZC00MzYwLWJjNjEtN2VlNDg1YWUwZWI1XCIiLCJVc2VyTmFtZSI6ImZ1bmltYXRpb25hZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIkVtYWlsIjoiZnVuaW1hdGlvbmFkbWluQG1lZGlhdmFsZXQubmV0IiwiVXNlcklkIjoiXCI3YTljOWVmZS1jNTc0LTQwZDItYWFiZS0xOWQ3ZjhlYmM2YmFcIiIsIlNJZCI6IlwiZDUxZGNhYzEtMTlhYS00ZGIxLTkzNjUtMWNhZTJlNjRjNTU2XCIiLCJzY29wZSI6WyJhcGkiXSwiYW1yIjpbInBhc3N3b3JkIl19.Uxcfu7Rur6EfwtaT6Qa8FZ_Ej-DIeoM1uK-iJ4UjKuNKZgJw_JKMv92yic5Q-AAYH13mg7kW0Qxf8ueSrZha0TI9YuwBHkryU60xHiXuIHH02scnZIw9quuk0MYFHLzlivp0SHag0369dmKPRM6d2Lj9jXnxRup8MwRAg2Yliid2JZdXxTPKoIP5nohtjFI2fYrYvh1QKSMIIsOfySWcE8_T5VvH0Ddd3XTubdxoXdx_y8udiiiVxxWWWsFn8wCd0420ZEBsAE__3f9z9zB-8bOYqxBel-G44gS8IX_vCpL4K6NE0pmzLKIU2MzIALaPIM7kseUG_Fuor3z4xUHP4w'
        },
        'body': JSON.stringify([
            {
                "op": "replace",
                "path": "/parentId",
                "value": "8f55b35a-e450-4db8-9f36-5a7354d5972e"
            }
        ])
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
});