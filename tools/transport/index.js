const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const stream = fs.createWriteStream(path.resolve(__dirname, '..', '..', 'data', 'transport.csv'));

fs.createReadStream(path.resolve(__dirname, '..', '..', 'data',
  'London stations.csv'))
  .pipe(csv.parse({ headers: true }))
  // pipe the parsed input into a csv formatter
  .pipe(csv.format({ headers: true }))
  // Using the transform function from the formatting stream
  .transform(({ Station, Latitude, Longitude, Zone, Postcode }, next) => {
    // console.log(Object.keys(row));
    return next(null, {
      station: Station,
      lat: Latitude,
      long: Longitude,
      zone: Zone,
      postcode: Postcode,
      type: 'station'
    });
  })
  .pipe(stream)
  .on('end', () => process.exit());