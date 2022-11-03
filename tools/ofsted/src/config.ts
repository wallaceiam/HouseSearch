import path from "path";

const mongoDbUrl = "mongodb://127.0.0.1:27017/right-location"; // process.env.MONGODB_URL ??
const childcareFileName = 'Management_information_-_childcare_providers_and_inspections_-_most_recent_inspections_data_as_at_30_June_2022.csv';
const stateFundedFileName = 'Management_information_-_state-funded_schools_-_latest_inspections_at_30_Sep_2022.csv';
const postcodeFileName = 'postcodes.csv';
const localAuthoritiesFileName = 'local_authorities.csv';
const dataDir = path.resolve(__dirname, "..", "..", "..", "data");
const ofstedDir = path.resolve(dataDir, 'ofsted', '2020-2021');
const schoolFileName = 'england_school_information.csv';
const censusFileName = 'england_census.csv';
const financialsFileName = 'england_cfr.csv';
const teachersFileName = 'england_swf.csv';

export default {
  showProgress: true,
  mongoDbUrl,
  dataDir,
  childcareFileName: path.resolve(dataDir, childcareFileName),
  stateFundedFileName: path.resolve(dataDir, stateFundedFileName),
  postcodeFileName: path.resolve(dataDir, postcodeFileName),
  localAuthoritiesFileName: path.resolve(dataDir, localAuthoritiesFileName),
  schoolFileName: path.resolve(ofstedDir, schoolFileName),
  censusFileName: path.resolve(ofstedDir, censusFileName),
  financialsFileName: path.resolve(ofstedDir, financialsFileName),
  teachersFileName: path.resolve(ofstedDir, teachersFileName),
}