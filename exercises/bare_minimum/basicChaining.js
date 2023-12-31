/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
const { getGitHubProfileAsync } = require('./promisification');
const { pluckFirstLineFromFileAsync } = require('./promiseConstructor');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((userName) => {
      return getGitHubProfileAsync(userName);
    })
    .then((profile) => {
      let stringified = JSON.stringify(profile);
      return fs.writeFileAsync(writeFilePath, stringified, 'utf8');
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
