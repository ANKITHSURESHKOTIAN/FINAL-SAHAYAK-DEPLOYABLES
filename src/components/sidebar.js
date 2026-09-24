/**
 * SAHAYAK — Official Police & Community Assistance Portal
 * Sidebar Component — Exactly 5 Main Navigation Items + Settings & Logout
 */

export function renderSidebar(activePath = 'dashboard') {
  // Normalize paths
  let current = activePath;
  if (current === 'assistance-requests') current = 'requests';
  if (current === 'emergency-requests') current = 'emergency';

  const menuItems = [
    {
      id: 'dashboard',
      path: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      id: 'requests',
      path: 'requests',
      label: 'Requests',
      icon: 'assignment',
      badge: '14',
    },
    {
      id: 'volunteers',
      path: 'volunteers',
      label: 'Volunteers',
      icon: 'groups',
    },
    {
      id: 'senior-citizens',
      path: 'senior-citizens',
      label: 'Senior Citizens',
      icon: 'elderly',
    },
    {
      id: 'emergency',
      path: 'emergency',
      label: 'Emergency',
      icon: 'crisis_alert',
      isEmergency: true,
      badge: '2 Active',
    },
  ];

  const menuHtml = menuItems
    .map((item) => {
      const isActive = current === item.id;
      const emergencyClass = item.isEmergency ? ' nav-item--emergency' : '';
      const activeClass = isActive ? ' active' : '';
      const badgeHtml = item.badge
        ? `<span class="gov-nav-badge${item.isEmergency ? ' gov-nav-badge--emergency' : ''}">${item.badge}</span>`
        : '';

      return `
      <li>
        <a
          href="#${item.path}"
          class="gov-nav-item${emergencyClass}${activeClass}"
          onclick="navigate('${item.path}'); return false;"
          ${isActive ? 'aria-current="page"' : ''}
        >
          <span class="material-symbols-outlined" style="font-size:22px;">${item.icon}</span>
          <span>${item.label}</span>
          ${badgeHtml}
        </a>
      </li>`;
    })
    .join('');

  const isSettingsActive = current === 'settings';

  return `
  <aside class="gov-sidebar" id="main-sidebar" aria-label="Main Navigation">
    <ul class="gov-sidebar__menu">
      ${menuHtml}
    </ul>

    <div class="gov-sidebar__footer">
      <a
        href="#settings"
        class="gov-nav-item${isSettingsActive ? ' active' : ''}"
        onclick="navigate('settings'); return false;"
        title="Portal & Station Settings"
      >
        <span class="material-symbols-outlined" style="font-size:22px;">settings</span>
        <span>Settings</span>
      </a>

      <button
        type="button"
        class="gov-nav-item"
        style="width:100%;border:none;background:transparent;cursor:pointer;text-align:left;"
        onclick="handleLogout()"
        title="Sign Out"
      >
        <span class="material-symbols-outlined" style="font-size:22px;color:var(--gov-emergency-red);">logout</span>
        <span style="color:var(--gov-emergency-red);font-weight:600;">Logout</span>
      </button>

      <div style="padding:10px 14px;font-size:11.5px;color:#c5d4fb;line-height:1.4;border-top:1px solid rgba(255,255,255,0.12);margin-top:6px;">
        <strong style="color:#ffffff;">Shirva Police Station</strong><br />
        <span style="color:#93c5fd;">GovNet Udupi Node #04</span>
      </div>
    </div>
  </aside>`;
}
