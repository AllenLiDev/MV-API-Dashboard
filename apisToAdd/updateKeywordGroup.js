const request = require('request');
// add /portalid/sectionid/
let options = {
    'method': 'PATCH',
    'url': 'https://mv-api-usva.mediavalet.net/keywordGroups/3c4a2f76-5000-44d6-9a93-5d5ead2b6926',
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJQZXJtaXNzaW9ucyI6Ilt7XCJTZWN1cmFibGVPYmplY3RUeXBlXCI6OSxcIk9iamVjdElkXCI6XCIwY2NlOWNhNC05M2E1LTQ4YTctOWU2YS0yOTAyMmZhMTZjNTFcIixcIlBlcm1pc3Npb25zXCI6MzAyNDk5MzIwOTY5NzYzMDkyMyxcIlBlcm1pc3Npb25zMlwiOjF9LHtcIlNlY3VyYWJsZU9iamVjdFR5cGVcIjoxLFwiT2JqZWN0SWRcIjpcIjM5YWFlNWNjLTVmMjgtNDZhMi1hNDBlLWNkMGJmMGI5NDY1NVwiLFwiUGVybWlzc2lvbnNcIjozMDI0OTkzMjA5Njk3NjMwOTIzLFwiUGVybWlzc2lvbnMyXCI6MX0se1wiU2VjdXJhYmxlT2JqZWN0VHlwZVwiOjAsXCJPYmplY3RJZFwiOlwiZDMxZDE3YzctMjEwMC00MGM5LWI2NTYtZDljOTRkMmRjYWI0XCIsXCJQZXJtaXNzaW9uc1wiOjMwMjQ5OTMyMDk2OTc2MzA5MjMsXCJQZXJtaXNzaW9uczJcIjoxfV0iLCJVc2VyT3JnVW5pdElkIjoiXCIwY2NlOWNhNC05M2E1LTQ4YTctOWU2YS0yOTAyMmZhMTZjNTFcIiIsIlVzZXJJZCI6IlwiZGU0MGQ1NTctZGFjNC00NmIwLTg1N2YtNmMyNDIxNTFmZjAwXCIiLCJVc2VyTmFtZSI6ImFsbGVubGlhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlJvbGVJZCI6IlwiYjdjODk0YTQtMWI2Yi00MDkzLWE5NjItZTUxN2JhOGEyNTZjXCIiLCJFbWFpbCI6ImFsbGVubGlhZG1pbkBtZWRpYXZhbGV0Lm5ldCIsIlNJZCI6IlwiYjdjODk0YTQtMWI2Yi00MDkzLWE5NjItZTUxN2JhOGEyNTZjXCIiLCJJcEFkZHJlc3MiOiIyMDcuODEuMjUxLjciLCJpc3MiOiJodHRwOi8vd3d3Lm1lZGlhdmFsZXRpc3N1ZXIuY29tIiwiYXVkIjoiaHR0cDovL3d3dy5tZWRpYXZhbGV0YXVkaWVuY2UuY29tIiwiZXhwIjoxNjQwNjgwMTUzLCJuYmYiOjE2NDAwNzUzNTN9.Y2VB9dyLBWYQb9_TA1r9kYqcts4OrVa7O_xyerIBtazikUORlwpT4MzIYVsekLwE-U2edLOc5zwUf9a-3prblizWwVac8khqGBd4-p2f-wd8DRCgYcx00CiEFSJKwzskAj5t9kUc6E_bCKS8DY-AA4l6_GnF94M69XiYokQs0LJgxz12kFK4EceZyPTN7nw2NxWirTwZN6JS3ZqpyEsGZ76vxW3ENnib8I30X_Y0-ksZNvzJCxpfC5gkgP5edJnIbeHCPcKmnG8lTPrW4marlidAeWwlxHkHyB7YDvVcnSDIUCpus_awpRB20Vi5o7ERqvtzExcOlytvTyDvmNFTvg'
    },
    'form': {
        'op': 'replace',
        'path': '/keywordsInGroup',
        'value': 'banana,bryant,hotdog,hotwheel,keyword2new,kobe,lego,london,new Keyword,test,turkey,vegas,walrus'
    }
};

request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log( JSON.parse(response.body));
});