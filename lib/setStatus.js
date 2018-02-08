var superagent  = require('superagent');
var args        = require('yargs').argv;
var logger = require("./logger");

var setStatus = function(buildData) {
  /* Environment constants */
  const ORG_NAME    = process.env.TRAVIS_REPO_SLUG && process.env.TRAVIS_REPO_SLUG.split('/')[0];
  const REPO_NAME   = process.env.TRAVIS_REPO_SLUG && process.env.TRAVIS_REPO_SLUG.split('/')[1];
  const COMMIT_SHA  = process.env.TRAVIS_COMMIT;
  const BUILD_ID    = process.env.TRAVIS_BUILD_ID;
  const AUTH_TOKEN  = process.env[args['token'] || 'GITHUB_PERSONAL_TOKEN'];
  // const BUILD_DIR   = args['dir'] || process.env.TRAVIS_BUILD_DIR;

  if(ORG_NAME && REPO_NAME && COMMIT_SHA && AUTH_TOKEN && BUILD_ID){
    superagent
      .post(`https://api.github.com/repos/${ORG_NAME}/${REPO_NAME}/statuses/${COMMIT_SHA}`)
      .set('Authorization', `token ${AUTH_TOKEN}`)
      .send({
        state: buildData.state,
        target_url: `https://travis-ci.com/${ORG_NAME}/${REPO_NAME}/builds/${BUILD_ID}`,
        description: buildData.message,
        context: 'Dependency Check'
      })
      .end(function(err, res) {
        if(err) {
          console.log(err);
          process.exit(1);
        }

        // console.log(res.body)
        logger.success(`${buildData.state} - ${buildData.message} was posted to Github.\n`);
      })
  }
}

module.exports = setStatus;
