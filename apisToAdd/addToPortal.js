const request = require('request');

let options = {
    'method': 'POST',
    'url': 'https://mv-api-usil.mediavalet.net/brandedportals/ad608f20-e1a6-409c-9e8f-57285ae9d460/7252c7d7-c7ea-424e-9021-c366db08ea15/assets',
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6MCxcIk9iamVjdElkXCI6XCI1ZmJhNDRjNS1mZjFiLTQ3MjItOTRlZS0zY2FmMDgzMmRjOWZcIixcIlBlcm1pc3Npb25zXCI6MzAyNDk5MzIwOTY5NzYzMDkyMyxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjoxLFwiT2JqZWN0SWRcIjpcImEyNTQ2OTlhLWE5NjUtNGEwNC1hNjViLTdmYzU2MTk4Y2Y2ZVwiLFwiUGVybWlzc2lvbnNcIjozMDI0OTkzMjA5Njk3NjMwOTIzLFwiUGVybWlzc2lvbnMyXCI6MX0se1wiU2VjdXJhYmxlT2JqZWN0VHlwZVwiOjksXCJPYmplY3RJZFwiOlwiYWExYzhjMWYtYjRhOS00ZmJiLWJmYzctZWVlYmFjYTY3YzJlXCIsXCJQZXJtaXNzaW9uc1wiOjMwMjQ5OTMyMDk2OTc2MzA5MjMsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCJhYTFjOGMxZi1iNGE5LTRmYmItYmZjNy1lZWViYWNhNjdjMmVcIiIsIlVzZXJJZCI6IlwiYjU4YTZlMWItYjMwYS00NTFmLTgyZjgtNmVjYjgyOWJjODczXCIiLCJVc2VyTmFtZSI6ImNoZW1vdXJzYWRtaW5AbWVkaWF2YWxldC5uZXQiLCJSb2xlSWQiOiJcImE5MTM3ZDdmLTY0MjktNDM4My1hZGM3LWJmYWQ5YWJjYTlmMFwiIiwiRW1haWwiOiJjaGVtb3Vyc2FkbWluQG1lZGlhdmFsZXQubmV0IiwiU0lkIjoiXCJhOTEzN2Q3Zi02NDI5LTQzODMtYWRjNy1iZmFkOWFiY2E5ZjBcIiIsIklwQWRkcmVzcyI6IjI0Ljg0LjIwLjE2IiwiaXNzIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0aXNzdWVyLmNvbSIsImF1ZCI6Imh0dHA6Ly93d3cubWVkaWF2YWxldGF1ZGllbmNlLmNvbSIsImV4cCI6MTYzNTExOTg5NSwibmJmIjoxNjM0NTE1MDk1fQ.LYxcbwM7X3nZL3cdIOIVr2RuxhpIc1lDzl_a1lC8HdkRN7UQvqeBAbJ157HMG73U4zuKSATWYwC29mnUJtSuG17JUiE21sADDPtxyq_etUlO5QJhTLcXZnMkrcF73x2zqhQIACw6ucOav73z5BDFHkyGuD_eo-FQ0tkJThJWi0S6FmdXj2AZtnplphR8VyQiH4RB0biMAC5djWci0dUWSPkcvYdJ5argLNmWfYC12KwENzji4s7t6Hr0pdtFtfvAG7mpd4BgBgI9zybUwtQQ0hOmkF9GxO6FVdiPrlbsMHv5D-mcNf_cm87mP-vBIanrgFc3Eec9p9PslmsW2QKitw'
    },
    'body': JSON.stringify([
        "7c7095bf-0525-4175-ab33-5903025bf7e1",
        "bd8f6c9a-f005-44c4-876f-83f84d15c1a7",
        "5460a209-f9cc-4e02-b07a-02c31391bbf8",
        "9e227f0c-0422-43ff-a414-52ed00e6af6b",
        "882e8afc-fd6d-4c7b-93df-8286adb25406",
        "c3e5ec90-554a-4229-98ec-36e18154d141",
        "09fa50ab-4fc9-49a5-a9fd-a406ac007ed5",
        "e1a63c69-66cb-4bc9-aeea-48ebc91a7baa",
        "c122ab38-353f-4585-9034-dc6520bbd1f6",
        "86413fa4-501c-4af9-b4cc-e5fa79c1e0a4",
        "a4fa937d-9481-4e1d-ae88-f42522b1e4e7",
        "7d12f4df-5611-47d6-a7c6-73a55f012c25",
        "dbdf2809-5e9e-4b44-9afe-f04108d9698b",
        "75c9afe5-06f2-443f-b514-df4935a5d9de",
        "912ca593-dc16-49ab-8400-a477402e9bfb",
        "485528d9-5fd2-4979-a734-0490ac505ef0",
        "e139e094-c6e2-4bc6-bd21-c465fbe5b252"
    ])
};

request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body)
});