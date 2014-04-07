var gulp = require('gulp');
var sh = require('shelljs');
var path = require('path');
var fs = require('fs');
var currentEnv = process.NODE_ENV || 'development';
var config = {
  global: {},
  local: {},
  build: {}
};

// npm link ALL packages to each other
gulp.task('link', function() {
  findPackages().forEach(function(packageName) {
    process.chdir(__dirname);
    var pkg = path.join(__dirname, packageName);
    sh.exec('npm link ', pkg);
    process.chdir(pkg);
    findPackages().forEach(function(otherPackage) {
      if(otherPackage !== packageName) {
        var otherPackagePath = path.join('..', otherPackage);
        sh.exec('npm link ' + otherPackagePath);
      }
    });
  });
});

// run a package
task('run', function(packageName) {
  findPackages(packageName).forEach(run);
});

// run a package
task('stop', function(packageName) {
  findPackages(packageName).forEach(stop);
});

// build a package
gulp.task('build', function() {
  // clean
  // findPackages(packageName).forEach(clean);

  // configure all globally
  findPackages().forEach(globalConfigure);
  
  // configure locally
  findPackages().forEach(localConfigure);

  // configure build
  findPackages().forEach(buildConfigure);

  // write local config modules
  findPackages().forEach(writeLocalConfigModule);

  // write global config module
  writeGlobalConfigModule();

  // build each
  findPackages().forEach(build);
});

// debug a package
task('debug', function(packageName) {
  findPackages(packageName).forEach(debug);
});

// define a task for all packages
function task(name, fn) {
  findPackages().forEach(function(package) {
    addTask(name + ':' + package, package);
  });
  addTask(name);
  addTask(name + ':' + '*');
  function addTask(name, package) {
    gulp.task(name, function() {
      fn(package);
    });
  }
}

var packageCache;

function findPackages(packageName) {
  var matchAll = packageName === '*' || !packageName;
  var packages = packageCache || (packageCache = listPackages());

  return packages.filter(function(directoryName) {
    if(matchAll) {
      return true;
    } else if(directoryName === packageName) {
      return true;
    }
    return false;
  });
}

function listPackages() {
  return sh
    .find(__dirname)
    .filter(function(filePath) {
      return path.dirname(path.dirname(filePath)) === __dirname
             && path.dirname(filePath) !== __dirname
             && path.basename(filePath) === 'package.json'
    })
    .map(function(filePath) {
      return path.basename(path.dirname(filePath));
    });
}

function build(package) {
  var buildConfig = config.build[package];
  console.log('building', package);
  configure(package, 'build');
}

function run(package, mode) {
  build(package);
  var run = pacakgeScript(package, 'run');
  if(run) {
    run(currentEnv, config.global, config.local[package]);
  }
}

function stop(package) {

}

function debug(package) {
  
}

function configure(package, scope) {
  var configurePackage = pacakgeScript(package, 'configure');
  var localConfig = config.local[package] || (config.local[package] = {});
  var buildConfig = config.build[package] || (config.build[package] = {});
  var globalConfig = config.global;

  if(configurePackage && configurePackage[scope]) {
    configurePackage[scope](currentEnv, globalConfig, localConfig, buildConfig);
  }
}

function globalConfigure(package) {
  configure(package, 'global');
}

function localConfigure(package) {
  configure(package, 'local');
}

function buildConfigure(package) {
  configure(package, 'build');
}

function clean(package) {
  removeConfigModule(package);
}

function pacakgeScript(package, name) {
  var file = path.join(__dirname, package, name + '.js');
  if(fs.existsSync(file)) {
    return require(file);
  }
}

function writeLocalConfigModule(package) {
  var localConfig = config.local[package];
  writeConfigModule(path.join(__dirname, package), 'local.config.js', localConfig);
}

function writeGlobalConfigModule() {
  writeConfigModule(__dirname, 'global.config.js', config.global);
}

function writeConfigModule(root, name, obj) {
  var type = ~name.indexOf('global') ? 'GLOBAL' : 'LOCAL';
  sh.mkdir('-p', path.join(root, 'node_modules'));
  var src = 'process.' + type + '_CONFIG = ' + JSON.stringify(obj);
  src.to(path.join(root, 'node_modules', name));
}

function removeConfigModule(package) {
  fs.unlinkSync(path.join(__dirname, package, 'node_modules', 'local.config.js'));
}
