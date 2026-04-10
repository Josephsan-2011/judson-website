/**
 * Podcasts stored in localStorage (key: rtn_podcasts).
 * Used by admin page to add/delete and by podcasts page to display.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'rtn_podcasts';

  window.Podcasts = {
    get: function () {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    },

    save: function (list) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list || []));
    },

    add: function (item) {
      var list = this.get();
      item.id = item.id || 'id-' + Date.now();
      list.unshift(item);
      this.save(list);
      return item;
    },

    remove: function (id) {
      var list = this.get().filter(function (p) { return p.id !== id; });
      this.save(list);
    }
  };
})();
