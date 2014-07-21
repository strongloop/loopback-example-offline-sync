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
