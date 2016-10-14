var angular = require('angular');

module.exports = {
  template: require('./main.html'),
  controller: mainController,
  controllerAs: 'vm'
};

mainController.$inject = ['$http', '$log', '$timeout', 'authService'];
/* @ngInject */
function mainController($http, $log, $timeout, authService) {
  var vm = this;

  vm.user = '';
  vm.apiResult = '';

  vm.login = onLogin();
  vm.callApi = onCallApi();
  vm.logout = onLogout();

  function display(selector, data) {
    if (data && angular.isString(data)) {
      data = angular.fromJson(data);
    }
    if (data) {
      data = angular.toJson(data, true);
    }

    $timeout(function () {
      vm[selector] = data;
    });
  }

  function onLogin() {
    return function () {
      $log.info('The user clicked Login...');
      authService.manager
        .signinPopup()
        .then(function (user) {
          display('user', user);
        })
        .catch(function (error) {
          $log.error('Error while signing in through the popup:', error);
        });
    };
  }

  function onCallApi() {
    return function () {
      $log.info('The user clicked Call API...');
      $http({
        url: 'http://localhost:60136/values',
        method: 'GET',
        dataType: 'json'
      }).then(function (data) {
        display('apiResult', data);
      }, function (error) {
        display('apiResult', {
          status: error.status,
          statusText: error.statusText,
          response: error.responseJSON
        });
      });
    };
  }

  function onLogout() {
    return function () {
      $log.info('The user clicked Logout...');
      authService.manager
        .signoutRedirect()
        .catch(function (error) {
          $log.error('Error while signing out user:', error);
        });
    };
  }
}
