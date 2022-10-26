const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs')

const csvWriter = createCsvWriter({
    path: 'modernstar2.csv',
    header: [
        {id: 'id', title: 'AssetId'},
        {id: 'category', title: 'Category'},
        {id: 'filename', title: 'Filename' },
        {id: 'size', title: 'File Size'}
    ]
});