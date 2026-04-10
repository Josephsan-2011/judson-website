/**
 * Simple client-side admin auth. Session is stored in sessionStorage (clears when browser closes).
 * Change ADMIN_PASSWORD below to your own secure password.
 * Note: This is not secure against anyone who can view source. Use only for restricting casual access.
 * For sensitive data, use a real backend with server-side authentication.
 */
(function () {
  'use strict';

  // Change this to your desired admin password
  var ADMIN_PASSWORD = 'Thailand2025';

  var SESSION_KEY = 'rtn_admin_session';

  window.auth = {
    isAuthenticated: function () {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    },

    login: function (password) {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, '1');
        return true;
      }
      return false;
    },

    logout: function () {
      sessionStorage.removeItem(SESSION_KEY);
      window.location.href = 'login.html';
    },

    requireAuth: function () {
      if (!this.isAuthenticated()) {
        window.location.replace('login.html');
      }
    }
  };
})();
