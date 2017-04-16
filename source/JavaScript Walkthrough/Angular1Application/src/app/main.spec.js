var angular = require('angular');
require('angular-mocks');
var main = require('./main');

describe('main component', function () {
  function mockAuthService() {
  }

  beforeEach(function () {
    angular
      .module('app', ['app/main.html'])
      .service('authService', mockAuthService)
      .component('app', main);
    angular.mock.module('app');
  });

  it('should render the header, title, and footer', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<app>Loading...</app>')($rootScope);
    $rootScope.$digest();
    expect(element.find('app-header').length).toEqual(1);
    expect(element.find('app-title').length).toEqual(1);
    expect(element.find('app-footer').length).toEqual(1);
  }));
});
