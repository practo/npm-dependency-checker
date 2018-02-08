var path        = require('path');
var fs          = require('fs');
var stripComments = require("strip-json-comments");
var yaml = require("js-yaml");
var defaultConfig = require("./defaultConfig");
var dependencyChecker = require("./dependencyChecker");

const { getInstalledPath } = require('get-installed-path')

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/^\ufeff/, "");
}

getInstalledPath('npm-dependency-checker', { local: true }).then((installed_folder) => {
  const repo_root = path.resolve(installed_folder, "../..");
  const filename = path.join(repo_root, ".ndcrc");
  let userConfig = {}, config = {};
  console.log("Repo root: ", repo_root);
  console.log("Finding local config file: ", filename);
  if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
    console.log("Config file `.ndcrc` found.\n");
    userConfig = yaml.safeLoad(stripComments(readFile(filename))) || {};
    // return filename;
  } else {
    console.log("Config file `.ndcrc` not found. Using default config.\nAdd '.ndcrc' file in you repo root if you wish to specify custom logic.\n");
  }
  config = Object.assign({}, defaultConfig, userConfig);
  // console.log("Final config: ", config)
  dependencyChecker(repo_root, config);
})
.catch((err) => {
  console.error("Error encountered. Possibly, you do not have 'npm-dependency-checker' installed at this location.")
  console.error(err);
})
