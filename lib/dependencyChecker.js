var path = require('path');
var depcheck = require('depcheck');
var ora = require('ora');
var logger = require("./logger");
var setStatus = require('./setStatus');

/* Github build status constants */
let BUILD_FAIL    = { state: 'failure', message: 'Prohibitive licensing found' };
const BUILD_PASS    = { state: 'success', message: 'No dependency related issues found' };
const BUILD_PENDING = { state: 'pending', message: 'Checking dependencies...' };
// const BUILD_ERROR   = { state: 'error',   message: 'An error occured during dependency check' };

module.exports = (rootPath, config) => {

  logger.process(`Analysing dependencies in ${rootPath}...`);

  setStatus(BUILD_PENDING);

  depcheck(rootPath, config, (unused) => {

    let invalidFiles = Object.keys(unused.invalidFiles);
    let invalidDirs = Object.keys(unused.invalidDirs);
    let missingDependencies = unused.missing;
    let unusedDependencies = unused.dependencies;
    let unusedDevDependencies = unused.devDependencies;

    // an array containing the unused dependencies
    // console.log(unused.dependencies);
    if(unusedDependencies && unusedDependencies.length){
      logger.error(`\n ${unusedDependencies.length} Unused Dependencies: Declared in the package.json file, but not used by any code.`);
      unusedDependencies.map((fileName) => {
        console.log("  -- ", fileName);
      });
      BUILD_FAIL.message = `(${unusedDependencies.length}) Unused dependencies found.`;
      setStatus(BUILD_FAIL);
      process.exit(1);
    } else {
      logger.success("\n✓ No unsued dependencies found.")
    }

    // an array containing the unused devDependencies
    // console.log(unused.devDependencies);
    if(unusedDevDependencies && unusedDevDependencies.length){
      logger.error(`\n ${unusedDevDependencies.length} Unused Dev Dependencies: Declared in the package.json file, but not used by any code.`);
      unusedDevDependencies.map((fileName) => {
        console.log("  -- ", fileName);
      });
      BUILD_FAIL.message = `(${unusedDevDependencies.length}) Unused dev dependencies found.`;
      setStatus(BUILD_FAIL);
      process.exit(1);
    } else {
      logger.success("\n✓ No unsued dev dependencies found.")
    }

    // a lookup containing the dependencies missing in `package.json` and where they are used
    // console.log(unused.missing);
    if(missingDependencies && missingDependencies.length){
      logger.error(`\n ${missingDependencies.length} Missing Dependencies: is used somewhere in the code, but not declared in the package.json file.`);
      missingDependencies.map((fileName) => {
        console.log("  -- ", fileName);
      });
      BUILD_FAIL.message = `(${missingDependencies.length}) Missing dependencies found.`;
      setStatus(BUILD_FAIL);
      process.exit(1);
    } else {
      logger.success("\n✓ No missing dependencies found.")
    }

    // console.log(unused.using); // a lookup indicating each dependency is used by which files

    // files that cannot access or parse
    if(invalidFiles && invalidFiles.length){
      logger.warn(`\nFailed to parse ${invalidFiles.length} files`);
      invalidFiles.map((fileName) => {
        console.log("  -- ", fileName);
      });
    }

    // directories that cannot access
    // console.log(unused.invalidDirs);
    if(invalidDirs && invalidDirs.length){
      logger.warn(`Failed to parse ${invalidDirs.length} files`);
      invalidDirs.map((fileName) => {
        console.log("  -- ", fileName);
      });
    }

    setStatus(BUILD_PASS);
  });
};
