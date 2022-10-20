const XLSX = require("xlsx");
const path = require('path');

const fileName = 'Childcare_provider_level_data_as_at_31_August_2021.ods';
const dir = path.resolve(__dirname, '..', '..', 'data');

const inFile = path.resolve(dir, fileName);

const workbook = XLSX.readFile(inFile);

const outFile = path.resolve(dir, fileName.replace('.ods', '.csv'));

XLSX.writeFile(workbook, outFile, { type: "csv", sheet: "D1-_Childcare_providers"});