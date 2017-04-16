var angular = require('angular');
require('angular-mocks');
var header = require('./header');

describe('header component', function () {
  beforeEach(function () {
    angular
      .module('appHeader', ['app/header.html'])
      .component('appHeader', header);
    angular.mock.module('appHeader');
  });

  it('should render the header', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<app-header></app-header>')($rootScope);
    $rootScope.$digest();
    expect(element.find('header').length).toEqual(1);
  }));
});
