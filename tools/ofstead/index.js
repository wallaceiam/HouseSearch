const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const dir = path.resolve(__dirname, '..', '..', 'data');

const catOfConcerns = [
  'SWK',
  'SM'
];

const faithGroups = [
  'Non-faith',
  'Christian',
  'Jewish',
  'Muslim',
  'Other faith'
]
const typeOfEdications = [
  'Voluntary Aided School',
  'Voluntary Controlled School',
  'LA Nursery School',
  'Community School',
  'Community Special School',
  'Free School',
  'Free School Special',
  'Free School - Alternative Provision',
  'Academy Special Sponsor Led',
  'Academy Converter',
  'Academy Alternative Provision Converter',
  'Academy Sponsor Led',
  'Academy Special Converter',
  'Academy Alternative Provision Sponsor Led',
  'University Technical College',
  'City Technology College',
  'Studio School',
  'Foundation School',
  'Foundation Special School',
  'Pupil Referral Unit',
  'Non-Maintained Special School'
]

const readPostcodes = () => {
  return new Promise((resolve) => {
    let postcodes = {};
    fs.createReadStream(path.resolve(dir, "postcodes.csv"))
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', ({ pcds, ...rest }) => {
        postcodes[pcds] = rest;
      })
      .on('end', () => resolve(postcodes));
  });
}

const processSchools = (postcodes) => {
  return new Promise((resolve) => {
    const stream = fs.createWriteStream(path.resolve(dir, 'ofsted.csv'));

    fs.createReadStream(path.resolve(dir, 'Management_information_-_state-funded_schools_-_latest_inspections_at_30_Sep_2022.csv'))
      .pipe(csv.parse({ headers: true }))
      // pipe the parsed input into a csv formatter
      .pipe(csv.format({ headers: true }))
      // Using the transform function from the formatting stream
      .transform((row, next) => {
        const webLink = row['Web link'];
        const urn = row['URN'];
        const name = row['School name'];
        const region = row['Region'];
        const faith = row['Faith grouping'];
        const postcode = row['Postcode'];
        const overallEffectiveness = row['Overall effectiveness'];
        const type = row['Type of education'];
        const idaci = row['The income deprivation affecting children index (IDACI) quintile'];
        const totalNumOfPupils = row['Total number of pupils'];
        const age = [row['Statutory lowest age'], row['Statutory highest age']];
        const catOfConcern = row['Category of concern'];
        const qualityOfEducation = row['Quality of education'];
        const behaviourAndAttitudes = row['Behaviour and attitudes'];
        const personalDevelopment = row['Personal development'];
        const effectivenessOfLeadership = row['Effectiveness of leadership and management'];
        const effectivenessOfSafeguarding = row['Safeguarding is effective?'];

        if (postcodes[postcode] === undefined) {
          console.warn(`${postcode} not found`);
        }
        const { lat, long } = postcodes[postcode] ?? { lat: 0, long: 0 };

        const typeOfEducation = typeOfEdications.indexOf(type);
        if (typeOfEducation < 0) {
          console.warn(`${type} not found!`);
        }

        const faithGroup = faithGroups.indexOf(faith);
        if (faithGroup < 0) {
          console.warn(`${faith} not found!`);
        }

        const catOfConcernIndex = catOfConcerns.indexOf(catOfConcern);
        if(catOfConcernIndex < 0 && catOfConcern.length > 0 && catOfConcern !== 'NULL') {
          console.warn(`${catOfConcern} not found!`);
        }

        // console.log(Object.keys(row));
        return next(null, {
          urn,
          webLink,
          name,
          region,
          faithGroup,
          postcode,
          overallEffectiveness,
          typeOfEducation,
          lat,
          long,
          idaci,
          totalNumOfPupils,
          age,
          catOfConcern: catOfConcern !== 'NULL' ? catOfConcern : '',
          qualityOfEducation,
          behaviourAndAttitudes,
          personalDevelopment,
          effectivenessOfLeadership,
          effectivenessOfSafeguarding
        });
      })
      .pipe(stream)
      .on('end', () => resolve());
  });
}

async function main() {
  const pc = await readPostcodes();
  await processSchools(pc);
}

main();

