const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs')

const results = [];
const edited = [];
const match = [];
const csvWriter = createCsvWriter({
    path: 'modernstar2.csv',
    header: [
        {id: 'id', title: 'AssetId'},
        {id: 'category', title: 'Category'},
        {id: 'filename', title: 'Filename' },
        {id: 'size', title: 'File Size'}
    ]
});

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {
   results.push(data);
  })
  .on('end', () => {
    for(let row of results){
        let cat = row.Categories.substring(1);
        let splited = cat.split(', \\');
        for(let singleCat of splited){
            edited.push({
                'id': row.Id,
                'category': singleCat,
                'filename': row.Filename,
                'size': row.Size
            })
        }
    }

    for(let row of edited){
        for(let secondRow of edited){
            if(row.category === secondRow.category){
               if(row.filename === secondRow.filename){
                   if(row.size !== secondRow.size){
                        match.push(row);
                   }
               }
            }
        }
    }

    // export 
    csvWriter
    .writeRecords(match)
    .then(() => console.log('The CSV file was written successfully'))
  });