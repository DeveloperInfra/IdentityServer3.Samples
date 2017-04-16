var angular = require('angular');

require('angular-ui-router');
var routesConfig = require('./app/core/routes');
var authInterceptorConfig = require('./app/core/authInterceptor');

var authService = require('./app/core/authService');

var main = require('./app/main');
var header = require('./app/header');
var title = require('./app/title');
var footer = require('./app/footer');

require('bootstrap/dist/css/bootstrap.css')
require('./index.less');

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .config(authInterceptorConfig)
  .service('authService', authService)
  .component('app', main)
  .component('appHeader', header)
  .component('appTitle', title)
  .component('appFooter', footer);
