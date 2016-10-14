module.exports = routesConfig;

routesConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
/** @ngInject */
function routesConfig($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    });
}
