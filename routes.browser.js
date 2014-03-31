module.exports = {
  '/': {
    controller: 'HomeCtrl',
    templateUrl: 'views/welcome'
  },
  '/me': {
    controller: 'UserCtrl',
    templateUrl: 'views/me',
  },
  '/my/todos': {
    controller: 'TodoCtrl',
    templateUrl: 'views/todos'
  }
};
