const fs = require('fs');
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
fs.copyFileSync('./README.md', './dist/README.md');
fs.copyFileSync('./CHANGELOG.md', './dist/CHANGELOG.md');
