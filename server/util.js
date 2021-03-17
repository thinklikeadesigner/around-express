
const fs = require("fs").promises;

function getFileContent(filePath) {
  // console.log('getfilecontent');
  return fs
  .readFile(filePath, { encoding: "utf-8" })
  .then(JSON.parse)
  .catch(console.log);
}


function matchId(element, req) {
  // console.log('matchid');
const hasId = element._id === req.params.id
return hasId;
}

module.exports = {
  getFileContent,
  matchId
}