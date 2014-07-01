angular.module('templates-app', ['app/login/login.tpl.html']);

angular.module("app/login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/login/login.tpl.html",
    "");
}]);
