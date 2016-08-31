var angular = require('angular');
require('angular-mocks');
var title = require('./title');

describe('title component', function () {
  beforeEach(function () {
    angular
      .module('appTitle', ['app/title.html'])
      .component('appTitle', title);
    angular.mock.module('appTitle');
  });

  it('should render the title div', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<app-title></app-title>')($rootScope);
    $rootScope.$digest();
    var title = element.find('div');
    expect(title[0].outerHTML).toMatch(/title/);
  }));
});
