const request = require('request');

const assetIds = [
    "1fb04f55-983a-40e1-b7bd-dfdc0e42baf2",
    "bdeca522-4525-4c28-84c2-bef8187457af",
    "8a1e6b18-e9bb-48d8-93b9-4cfadac5c25e",
    "efeff49d-4a0e-4a4a-8ba0-eb6a88e64625",
    "97f8e2b4-5d13-4d03-871a-c68667886200",
    "d4cd3a27-3212-4e2c-95a3-d80fb2dec11c",
    "0c52c7c1-9172-4474-ad17-c7177f64290f"]

const getAssetCategories = (id) => {
    let options = {
        'method': 'POST',
        'url': 'https://mv-api-usva.mediavalet.net/assets/search',
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCIwYzlkZjg4NC1kZGFjLTQ4ZWQtYTdjNC1jZWJhMzUzNGFiZjBcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCIyNjA2MzM0Ni0xN2U1LTQzMDYtODkzNi0yZGI5MzAyYjU1NWVcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCIzNGIxZmJhMy0wMmE0LTRlY2UtYjgzYS01ZDgyNDZkYTcxYzlcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCIzNGIxZmJhMy0wMmE0LTRlY2UtYjgzYS01ZDgyNDZkYTcxYzlcIiIsIlVzZXJJZCI6IlwiOWFkNTNjODYtNDkzOC00MWFlLTk2NWItZGM3OTA3YWJjZmY3XCIiLCJVc2VyTmFtZSI6IkxpYnJhcnlTZXJ2aWNlc2N5Y0BtZWRpYXZhbGV0Lm5ldCIsIlJvbGVJZCI6IlwiMDQzNzVkY2QtNThhMC00NDQ3LWE4M2MtYzRjZDE4NmNkMzRmXCIiLCJFbWFpbCI6IkxpYnJhcnlTZXJ2aWNlc0NZQ0BtZWRpYXZhbGV0Lm5ldCIsIlNJZCI6IlwiMDQzNzVkY2QtNThhMC00NDQ3LWE4M2MtYzRjZDE4NmNkMzRmXCIiLCJJcEFkZHJlc3MiOiIyMDcuODEuMjUxLjciLCJpc3MiOiJodHRwOi8vd3d3Lm1lZGlhdmFsZXRpc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0YXVkaWVuY2UuY29tIiwiZXhwIjoxNjU1MTU0OTU0LCJuYmYiOjE2NTQ1NTAxNTR9.efVDjLQx0fGGZYbyAgZtcc-maDClWyqeD6OeVFmWukUIFaDS-LslEMiqng-rSxvF6s9KYl5Tl_HBCWaFDIwRy4ltoqrL4-797sBzM13oMufJKhEiFBLJ_3zXdAYdwZ1JTswJaGdnCiHwGBArmr0QHXXLRG_UVCq1BNYaWXK5CjcEm91cbGu9FXyGPgoA5r3p_kJDYXa9i8SNcKwGis1pT1SfVyo_jyKli83qmaDAr00TEL2wVyQ4Z2xKNborPCJC8XWeMdw6PfEQaGtj2qvXSj6RnChs4g2RaQcMf3ZXanNnyMwiQVWy72hHtC2Hg7NrGvUB97tE39D0fbCd53SPPA',
        },
        'form': {
            "search": 'id:' + id,
            "count": 1000,
            "offset": 0,
            "filters": "",
            "sort": "record.createdAt D"
        }

    }
    request(options, function (error, response) {
        if (error) throw new Error(error);
        if (JSON.parse(response.body).payload.assetCount === 1) {
            currentCategories = (JSON.parse(response.body).payload.assets[0].categories);
            for (category of currentCategories) {
                deleteExistingCategory(id, category)
            }
        }
    });
}

const deleteExistingCategory = (id, categoryId) => {
    let options = {
        'method': 'DELETE',
        'url': 'https://mv-api-usva.mediavalet.com/assets/' + id + '/categories/' + categoryId,
        'headers': {
            'content-type': 'application/json',
            'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MSxcIk9iamVjdElkXCI6XCIwYzlkZjg4NC1kZGFjLTQ4ZWQtYTdjNC1jZWJhMzUzNGFiZjBcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCIyNjA2MzM0Ni0xN2U1LTQzMDYtODkzNi0yZGI5MzAyYjU1NWVcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfSx7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCIzNGIxZmJhMy0wMmE0LTRlY2UtYjgzYS01ZDgyNDZkYTcxYzlcIixcIlBlcm1pc3Npb25zXCI6MTIyNDgzNjUyNDY1NTI0MDY3MzEsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCIzNGIxZmJhMy0wMmE0LTRlY2UtYjgzYS01ZDgyNDZkYTcxYzlcIiIsIlVzZXJJZCI6IlwiOWFkNTNjODYtNDkzOC00MWFlLTk2NWItZGM3OTA3YWJjZmY3XCIiLCJVc2VyTmFtZSI6IkxpYnJhcnlTZXJ2aWNlc2N5Y0BtZWRpYXZhbGV0Lm5ldCIsIlJvbGVJZCI6IlwiMDQzNzVkY2QtNThhMC00NDQ3LWE4M2MtYzRjZDE4NmNkMzRmXCIiLCJFbWFpbCI6IkxpYnJhcnlTZXJ2aWNlc0NZQ0BtZWRpYXZhbGV0Lm5ldCIsIlNJZCI6IlwiMDQzNzVkY2QtNThhMC00NDQ3LWE4M2MtYzRjZDE4NmNkMzRmXCIiLCJJcEFkZHJlc3MiOiIyMDcuODEuMjUxLjciLCJpc3MiOiJodHRwOi8vd3d3Lm1lZGlhdmFsZXRpc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0YXVkaWVuY2UuY29tIiwiZXhwIjoxNjU1MTU0OTU0LCJuYmYiOjE2NTQ1NTAxNTR9.efVDjLQx0fGGZYbyAgZtcc-maDClWyqeD6OeVFmWukUIFaDS-LslEMiqng-rSxvF6s9KYl5Tl_HBCWaFDIwRy4ltoqrL4-797sBzM13oMufJKhEiFBLJ_3zXdAYdwZ1JTswJaGdnCiHwGBArmr0QHXXLRG_UVCq1BNYaWXK5CjcEm91cbGu9FXyGPgoA5r3p_kJDYXa9i8SNcKwGis1pT1SfVyo_jyKli83qmaDAr00TEL2wVyQ4Z2xKNborPCJC8XWeMdw6PfEQaGtj2qvXSj6RnChs4g2RaQcMf3ZXanNnyMwiQVWy72hHtC2Hg7NrGvUB97tE39D0fbCd53SPPA',
        }
    }
    console.log("removing category: " + categoryId + "from " + id)
    request(options, function (error, response) {
        if (error) throw new Error(error);
    });
}

for (asset of assetIds) {
    getAssetCategories(asset);
}