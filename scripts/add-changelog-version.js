const fs = require('fs');

const version = require('../package.json').version;
const today = new Date();
const year = `${today.getFullYear()}`;
const month = `${today.getMonth() + 1}`.padStart(2, '0');
const day = `${today.getDate()}`.padStart(2, '0');
const todayString = `${year}-${month}-${day}`;

let changelogContents = fs.readFileSync('./CHANGELOG.md', 'utf-8');
changelogContents = changelogContents.replace(/## \[Unreleased\]/, `$&\n\n## [${version}] - ${todayString}`);
changelogContents = changelogContents.replace(/\[Unreleased\]:.*/, `$&\n[${version}]: https://github.com/Ailrun/tsdux/tree/v${version}`);

fs.writeFileSync('./CHANGELOG.md', changelogContents);
