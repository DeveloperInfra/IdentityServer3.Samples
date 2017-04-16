var angular = require('angular');
require('angular-mocks');
var footer = require('./footer');

describe('footer component', function () {
  beforeEach(function () {
    angular
      .module('appFooter', ['app/footer.html'])
      .component('appFooter', footer);
    angular.mock.module('appFooter');
  });

  it('should render the footer', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<app-footer></app-footer>')($rootScope);
    $rootScope.$digest();
    expect(element.find('footer').length).toEqual(1);
  }));
});
