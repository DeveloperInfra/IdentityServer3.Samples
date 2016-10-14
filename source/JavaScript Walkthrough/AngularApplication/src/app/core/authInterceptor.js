module.exports = authInterceptorConfig;

authInterceptorConfig.$inject = ['$httpProvider', '$provide'];
/* @ngInject */
function authInterceptorConfig($httpProvider, $provide) {
  $provide.factory('authInterceptor', function ($log, $q, authService) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if (authService.user && authService.user.access_token) {
          $log.info('Bearer ' + authService.user.access_token);
          config.headers.Authorization = 'Bearer ' + authService.user.access_token;
        }

        return config;
      },
      requestError: function (rejection) {
        // handle the case where the request fails
        $log.error('API request failed: ', rejection);

        return $q.reject(rejection);
      },
      response: function (response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
          $log.error('The user is not authenticated:', response);
        }

        return response || $q.when(response);
      },
      responseError: function (rejection) {
        if (rejection.status === 401) {
          // handle the case where the user is not authenticated
          $log.error('Request failed - The user is not authenticated:', rejection);
        }
        if (rejection.status === 403) {
          // handle the case where the user is not authorized
          $log.error('Request failed - The user is not authorized:', rejection);
        }
        if (rejection.status === 419 || rejection.status === 440) {
          // handle the case where there is a session timeout
          $log.error('Request failed - Session timeout:', rejection);
        }

        return $q.reject(rejection);
      }
    };
  });

  $httpProvider.interceptors.push('authInterceptor');
}
