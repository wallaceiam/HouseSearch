const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const stream = fs.createWriteStream(path.resolve(__dirname, '..', '..', 'data', 'postcodes.csv'));

let firstChar = '';

fs.createReadStream(path.resolve(__dirname, '..', '..', 'data', 'NSPL_AUG_2022_UK.csv'))
  .pipe(csv.parse({ headers: true }))
  // pipe the parsed input into a csv formatter
  .pipe(csv.format({ headers: true }))
  // Using the transform function from the formatting stream
  .transform(({ pcds, lat, long }, next) => {
    if(pcds[0] !== firstChar) {
      console.log(pcds[0]);
      firstChar = pcds[0];
    }
    return next(null, {
      pcds,
      lat,
      long
    });
  })
  .pipe(stream)
  .on('end', () => process.exit());