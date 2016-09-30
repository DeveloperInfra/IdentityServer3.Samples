module.exports = authInterceptorProvider;

authInterceptorProvider.$inject = ['$httpProvider'];
/* @ngInject */
function authInterceptorProvider($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}
