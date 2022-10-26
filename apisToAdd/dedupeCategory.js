const request = require('request');
const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream("ffwDupes.csv")
    .pipe(csv())
    .on('data', (data) => {
        assets.push(
            {
                assetId: data.Id,
                MD5Hash: data.MD5Hash,
                categoryId: data.Categories
            }
        );
    })
    .on('end', () => {
        splitCategories()
        console.log(assets)
        // tagMultiList(assets)
    });

const splitCategories = () => {
    for(asset of assets) {
        asset.categoryId = asset.value.split(", ")
    }
}