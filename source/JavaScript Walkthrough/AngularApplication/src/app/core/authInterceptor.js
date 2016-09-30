module.exports = authInterceptor;

authInterceptor.$inject = ['$log', '$q', 'authService'];
/* @ngInject */
function authInterceptor($log, $q, authService) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (authService.user && authService.user.access_token) {
        $log.info('Bearer ' + authService.user.access_token);
        config.headers.Authorization = 'Bearer ' + authService.user.access_token;
      }

      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
        $log.error('The user is not authenticated:', response);
      }

      return response || $q.when(response);
    },
    responseError: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
        $log.error('Request failed - The user is not authenticated:', response);
      }
      if (response.status === 403) {
        // handle the case where the user is not authorized
        $log.error('Request failed - The user is not authorized:', response);
      }
      if (response.status === 419 || response.status === 440) {
        // handle the case where there is a session timeout
        $log.error('Request failed - Session timeout:', response);
      }

      return $q.reject(response);
    }
  };
}
