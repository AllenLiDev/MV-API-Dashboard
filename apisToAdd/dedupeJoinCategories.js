const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const assetsToTagCSV = createCsvWriter({
    path: 'assetsToTagChosen.csv',
    header: [
        { id: 'assetId', title: 'AssetId' },
        { id: 'category', title: 'CategoryId' }
    ]
});

const assetsToDeleteCSV = createCsvWriter({
    path: 'assetsToDeleteChosen.csv',
    header: [
        { id: 'assetId', title: 'AssetId' }
    ]
});



let assets = [];
let assetsWithJoinedCategory = [];
let assetsToDelete = [];

fs.createReadStream("dupesChosen.csv")
    .pipe(csv())
    .on('data', (data) => {
        assets.push(
            {
                assetId: data.AssetId,
                md5hash: data.MD5Hash,
                categories: data.Categories
            }
        );
    })
    .on('end', () => {
        // console.log(assets)
        joinOnMD5()
    });

const joinOnMD5 = () => {
    for (let asset of assets) {
        let spliceAssets = []
        for (let secondAsset of assets) {
            if (asset.md5hash === secondAsset.md5hash && asset.assetId !== secondAsset.assetId) {
                let categories = secondAsset.categories.split(",")
                for(let category of categories) {
                    assetsWithJoinedCategory.push(
                        {
                            assetId: asset.assetId,
                            category: category
                        }
                    )
                }
                assetsToDelete.push({ assetId: secondAsset.assetId })
                spliceAssets.push(secondAsset)
            }
        }
        for (let spliceAsset of spliceAssets) {
            assets.splice(spliceAsset, 1)
        }
    }
    assetsToTagCSV
        .writeRecords(assetsWithJoinedCategory)
        .then(() => console.log('The CSV file was written successfully'))
    assetsToDeleteCSV
        .writeRecords(assetsToDelete)
        .then(() => console.log('The CSV file was written successfully'))
}