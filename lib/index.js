var path        = require('path');
var fs          = require('fs');
var stripComments = require("strip-json-comments");
var yaml = require("js-yaml");
var defaultConfig = require("./defaultConfig");
var dependencyChecker = require("./dependencyChecker");
var args = require('yargs').argv;

const CWD = process.cwd();

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/^\ufeff/, "");
}

let arguments = args["_"];
if(arguments.length === 0){
  console.error("Please provide the start location as 'ndc <location>'. E.g., ndc .");
} else {
  const dir = path.resolve(process.cwd(), arguments[0]);
  const configFilePath = path.join(dir, ".ndcrc");
  let userConfig = {}, config = {};

  // console.log("Current location: ", CWD);
  // console.log("Final location: ", dir);

  if (fs.existsSync(configFilePath) && fs.statSync(configFilePath).isFile()) {
    console.log("Config file `.ndcrc` found.\n");
    userConfig = yaml.safeLoad(stripComments(readFile(configFilePath))) || {};
  } else {
    console.log("Config file `.ndcrc` not found. Using default config.\nAdd '.ndcrc' file in you repo root if you wish to specify custom logic.\n");
  }
  config = Object.assign({}, defaultConfig, userConfig);
  // console.log("Final config: ", config)
  dependencyChecker(dir, config);
}
