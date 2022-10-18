
const fs = require('fs/promises');
const path = require('path');
const fetch = require('node-fetch')

const dir = path.resolve(__dirname, '..', '..', 'client', 'public', 'imgs');

const sharp = require("sharp");
const { fstat } = require('fs');

const loadImages = async () => {
  await fs.mkdir(dir);
  const response = await fetch("https://raw.githubusercontent.com/tailwindlabs/heroicons/master/src/20/solid/academic-cap.svg");
  const data = await response.text();
  await fs.writeFile('new-file.svg', data);
  await sharp('./new-file.svg')
    .resize(20, 20)
    .png()
    .toFile(path.resolve(dir, 'academic-cap.png'));
};

async function main() {
  await loadImages();
}

main();