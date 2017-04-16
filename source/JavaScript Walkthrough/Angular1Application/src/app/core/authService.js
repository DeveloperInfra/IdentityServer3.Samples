var Oidc = require('oidc-client');

module.exports = authService;

authService.$inject = ['$log'];
/* @ngInject */
function authService($log) {
  var svc = {
    manager: null,
    user: null
  };

  activate();

  function activate() {
    Oidc.Log.logger = console;

    var settings = {
      authority: 'https://localhost:44300',
      client_id: 'ng',
      popup_redirect_uri: 'https://localhost:3000/popup.html',
      silent_redirect_uri: 'https://localhost:3000/silentrenew.html',
      post_logout_redirect_uri: 'https://localhost:3000/index.html',

      response_type: 'id_token token',
      scope: 'openid profile email api',

      accessTokenExpiringNotificationTime: 4,
      automaticSilentRenew: true,

      filterProtocolClaims: true
    };

    svc.manager = new Oidc.UserManager(settings);

    svc.manager.events.addUserLoaded(function (userLoaded) {
      // handle the case where the user has signed in
      $log.info('The user has signed in.', userLoaded);
      svc.user = userLoaded;
    });

    svc.manager.events.addSilentRenewError(function (error) {
      // handle the case where there was an error while renewing the access token
      $log.error('Error while renewing the access token:', error);
    });

    svc.manager.events.addUserSignedOut(function () {
      // handle the case where the user has signed out
      $log.info('The user has signed out.');
      svc.user = null;
    });
  }

  return svc;
}
