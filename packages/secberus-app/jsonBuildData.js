const fs = require('fs');
const path = require('path');
const packageData = require('./package.json');

// This file generates a buildData.json file into src/ which can then
// source static values in a static build environment

// This reads Package.json for the version (build number) and can also have
// other items added to the payload.
const payload = {
  buildNumber: packageData.version,
  timestamp: Date.now(),
};
// Get path of the buildData file
const buildDataPath = path.join(__dirname, 'src', 'buildData.json');
// Get files in directory
const dir = fs.readdirSync(path.join(__dirname, 'src'));

// If buildData exists, remove it
if (dir.indexOf('buildData.json') > -1) {
  process.stdout.write('Deleting existing build data');
  fs.unlinkSync(buildDataPath, err => {
    process.stderr.write(err);
  });
} else {
  process.stdout.write('Writing new buildData.json');
}

// Buffer the payload
const bufferedPayload = Buffer.from(JSON.stringify(payload));

process.stdout.write('Writing build data');

// Output new buffered payload
fs.writeFileSync(buildDataPath, bufferedPayload);

process.stdout.write('Complete');

// Clean exit
process.exit(0);
