const argv = require('yargs').argv;
function CLI () {
  return new Promise(function(resolve, reject) {
    console.log(argv);
    resolve();
  });
}

module.exports = CLI;
