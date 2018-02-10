const fs = require('fs');
const path = require('path');

const config = Object.assign(
  {},
  JSON.parse(fs.readFileSync('./package.json')),
  JSON.parse(fs.readFileSync('./package.dist.json')),
);

for (const key in config) {
  if (config[key] &&
      typeof config[key] === 'object' &&
      Object.keys(config[key]).length === 0) {
    delete config[key];
  }

  if (!config[key]) {
    delete config[key];
  }
}

fs.writeFileSync('./dist/package.json', JSON.stringify(config, undefined, 2) + "\n");

function copyFileToDist(file) {
  fs.copyFileSync(file, path.join('./dist', file));
}

copyFileToDist('./README.md');
copyFileToDist('./CHANGELOG.md');
copyFileToDist('./LICENSE');
