(function () {
  var clickStorageKey = 'suheTotalPostClicks';
  var sidebarStorageKey = 'suheNotesSidebarCollapsed';

  function readCount() {
    var value = window.localStorage.getItem(clickStorageKey);
    var count = parseInt(value || '0', 10);
    return isNaN(count) ? 0 : count;
  }

  function writeCount(count) {
    window.localStorage.setItem(clickStorageKey, String(count));
  }

  function renderCount() {
    var targets = document.querySelectorAll('[data-site-click-count]');
    if (!targets.length) {
      return;
    }
    var count = readCount();
    targets.forEach(function (target) {
      target.textContent = ' · 网站已点击 ' + count + ' 次';
    });
  }

  function setSidebarCollapsed(collapsed) {
    document.querySelectorAll('[data-notes-workspace]').forEach(function (workspace) {
      workspace.classList.toggle('notes-sidebar-collapsed', collapsed);
    });
    document.querySelectorAll('[data-notes-sidebar-toggle]').forEach(function (button) {
      button.setAttribute('aria-expanded', String(!collapsed));
      var icon = button.querySelector('.notes-toggle-icon');
      if (icon) {
        icon.textContent = collapsed ? '›' : '‹';
      }
    });
    window.localStorage.setItem(sidebarStorageKey, collapsed ? '1' : '0');
  }

  function initSidebar() {
    var collapsed = window.localStorage.getItem(sidebarStorageKey) === '1';
    setSidebarCollapsed(collapsed);
    document.addEventListener('click', function (event) {
      var toggle = event.target.closest && event.target.closest('[data-notes-sidebar-toggle]');
      if (!toggle) {
        return;
      }
      event.preventDefault();
      var workspace = toggle.closest('[data-notes-workspace]') || document.querySelector('[data-notes-workspace]');
      setSidebarCollapsed(!(workspace && workspace.classList.contains('notes-sidebar-collapsed')));
    });
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[data-post-click="true"]');
    if (!link) {
      return;
    }
    var nextCount = readCount() + 1;
    writeCount(nextCount);
    renderCount();
  });

  function init() {
    renderCount();
    initSidebar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();