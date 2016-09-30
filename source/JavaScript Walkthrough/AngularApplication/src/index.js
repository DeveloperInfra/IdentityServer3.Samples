var angular = require('angular');

require('angular-ui-router');
var routesConfig = require('./routes');
var core = require('./app/core/index');

var main = require('./app/main');
var header = require('./app/header');
var title = require('./app/title');
var footer = require('./app/footer');

require('bootstrap/dist/css/bootstrap.css')
require('./index.less');

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .service('authService', core.authService)
  .factory('authInterceptor', core.authInterceptor)
  .config(core.authInterceptorProvider)
  .component('app', main)
  .component('appHeader', header)
  .component('appTitle', title)
  .component('appFooter', footer);
