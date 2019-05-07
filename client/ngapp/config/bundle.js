// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

window.CONFIG = {
  "routes": {
    "/": {
      "controller": "HomeCtrl",
      "templateUrl": "/views/welcome.html"
    },
    "/me": {
      "controller": "UserCtrl",
      "templateUrl": "/views/user.html"
    },
    "/my/todos/:status": {
      "controller": "TodoCtrl",
      "templateUrl": "/views/todos.html"
    },
    "/my/todos": {
      "controller": "TodoCtrl",
      "templateUrl": "/views/todos.html"
    },
    "/login": {
      "controller": "LoginCtrl",
      "templateUrl": "/views/login.html"
    },
    "/register": {
      "controller": "RegisterCtrl",
      "templateUrl": "/views/register.html"
    },
    "/debug": {
      "controller": "ChangeCtrl",
      "templateUrl": "/views/changes.html"
    }
  }
};
