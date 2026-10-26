/* KupEye landing page: theme toggle and copy buttons. No dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORAGE_KEY = 'kupeye-theme';

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function savedTheme() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* storage may be blocked */ }
    }
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  /* Theme toggle. The inline script in <head> has already set the starting theme. */
  applyTheme(currentTheme(), false);

  document.addEventListener('click', function (event) {
    var toggle = event.target.closest('[data-theme-toggle]');
    if (!toggle) { return; }
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
  });

  /* Follow the system setting until the visitor picks a theme themselves. */
  if (window.matchMedia) {
    var query = window.matchMedia('(prefers-color-scheme: light)');
    var onSystemChange = function (e) {
      if (!savedTheme()) { applyTheme(e.matches ? 'light' : 'dark', false); }
    };
    if (query.addEventListener) { query.addEventListener('change', onSystemChange); }
    else if (query.addListener) { query.addListener(onSystemChange); }
  }

  /* Copy buttons: <button data-copy="text to copy">. */
  var status = document.querySelector('[data-copy-status]');

  function announce(message) {
    if (!status) { return; }
    status.textContent = '';
    window.setTimeout(function () { status.textContent = message; }, 50);
  }

  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'absolute';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  var timers = new WeakMap();

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-copy]');
    if (!button) { return; }
    var text = button.getAttribute('data-copy');

    var done = function () {
      button.classList.add('is-copied');
      announce('Copied to clipboard');
      window.clearTimeout(timers.get(button));
      timers.set(button, window.setTimeout(function () {
        button.classList.remove('is-copied');
      }, 1600));
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {
        if (fallbackCopy(text)) { done(); }
      });
    } else if (fallbackCopy(text)) {
      done();
    }
  });
})();
