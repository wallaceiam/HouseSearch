const XLSX = require("xlsx");
const path = require('path');
const fs = require('fs/promises');

const fileName = 'Childcare_provider_level_data_as_at_31_March_2022.ods';
const dir = path.resolve(__dirname, '..', '..', 'data');

const inFile = path.resolve(dir, fileName);

const workbook = XLSX.readFile(inFile, { cellFormula: true });

const outDir = path.resolve(dir, fileName.replace('.ods', ''));

fs.mkdir(outDir).then(() => {

  XLSX.writeFileXLSX(workbook, path.resolve(outDir, fileName.replace('.ods', '.xlsx')));
  workbook.SheetNames.forEach((sheet) => {
    const file = path.resolve(outDir, `${sheet}.csv`);
    XLSX.writeFile(workbook, file, { type: "csv", sheet });
  });
});