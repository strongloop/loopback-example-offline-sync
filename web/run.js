var sh = require('shelljs');

module.exports = function run(env, global, local) {
  process.chdir(__dirname);
  sh.exec('slc run app.js');
}
