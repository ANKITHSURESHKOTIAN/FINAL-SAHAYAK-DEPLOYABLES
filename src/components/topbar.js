/**
 * SAHAYAK — Official Police & Community Assistance Portal
 * Topbar Component — Simple, Functional Horizontal Header
 */

export function renderTopbar() {
  const currentLang = window.currentLanguage || 'en';
  const userRole = sessionStorage.getItem('userRole') || 'police';
  const roleDisplay = userRole === 'volunteer' ? 'Verified Volunteer' : 'Police Station';
  const userName = userRole === 'volunteer' ? 'Prashanth Rao' : 'Insp. R. Nayak';

  return `
  <div class="gov-header-wrapper" style="position:fixed;top:0;left:0;right:0;z-index:50;display:flex;flex-direction:column;box-shadow:0 4px 24px rgba(15,31,92,0.35);">
    <!-- National Tricolor Strip -->
    <div style="display:flex;height:4px;width:100%;">
      <div style="flex:1;background:#FF9933;"></div>
      <div style="flex:1;background:#FFFFFF;"></div>
      <div style="flex:1;background:#138808;"></div>
    </div>
    
    <!-- Govt of Karnataka Mini Banner -->
    <div class="gov-mini-banner" style="background:#f8fafc;padding:4px 16px;justify-content:space-between;align-items:center;border-bottom:1px solid #e2e8f0;font-size:11px;font-weight:700;color:#0f2848;text-transform:uppercase;letter-spacing:0.05em;">
      <div style="display:flex;align-items:center;gap:6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f2848" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>Government of Karnataka · Karnataka State Police</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <a href="tel:112" style="color:#dc2626;text-decoration:none;display:flex;align-items:center;gap:4px;"><span class="material-symbols-outlined" style="font-size:12px;">call</span> Emergency 112</a>
        <span style="color:#cbd5e1;">|</span>
        <a href="tel:14567" style="color:#d97706;text-decoration:none;display:flex;align-items:center;gap:4px;"><span class="material-symbols-outlined" style="font-size:12px;">call</span> Senior Helpline 14567</a>
      </div>
    </div>

    <header class="gov-header" role="banner" style="position:relative;box-shadow:none;">
      <!-- Header Left: Logo + Title -->
    <div class="gov-header__left">
      <button
        class="gov-header__mobile-toggle"
        id="sidebar-toggle"
        onclick="toggleSidebar()"
        aria-label="Toggle Navigation Menu"
        title="Open Navigation"
      >
        <span class="material-symbols-outlined" style="font-size:24px;">menu</span>
      </button>

      <div class="gov-header__logo-group">
        <div class="gov-header__emblem" aria-hidden="true">
          <span class="material-symbols-outlined" style="font-size:22px;">local_police</span>
        </div>
        <div class="gov-header__titles">
          <span class="gov-header__brand">SAHAYAK</span>
          <span class="gov-header__tagline">Community Assistance Portal</span>
        </div>
      </div>
    </div>

    <!-- Header Right: Jurisdiction, Emergency Badge, Language, User, Logout -->
    <div class="gov-header__right">
      <!-- Jurisdiction Badge -->
      <div class="gov-jurisdiction-badge" style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);padding:4px 10px;border-radius:var(--radius-sm);">
        <span class="material-symbols-outlined" style="color:#b0c9e8;font-size:16px;">location_on</span>
        <div style="display:flex;flex-direction:column;line-height:1.1;">
          <span style="font-size:10px;font-weight:700;color:#94a3cc;text-transform:uppercase;letter-spacing:0.04em;">Jurisdiction</span>
          <span style="font-size:12px;font-weight:700;color:#ffffff;">Udupi / Shirva PS</span>
        </div>
      </div>

      <!-- Active Emergencies Badge -->
      <a
        href="#emergency"
        onclick="navigate('emergency'); return false;"
        style="display:flex;align-items:center;gap:6px;background:linear-gradient(135deg, #ef4444 0%, #dc2626 100%);color:#ffffff;padding:5px 12px;border-radius:var(--radius-sm);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.04em;text-decoration:none;box-shadow:0 2px 10px rgba(239,68,68,0.4);"
        title="View 2 Active Emergency SOS Alerts"
      >
        <span class="material-symbols-outlined" style="font-size:16px;animation:pulse 1.5s infinite;">crisis_alert</span>
        <span>2 Emergencies</span>
      </a>

      <!-- Notifications -->
      <button
        type="button"
        style="position:relative;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:var(--radius-sm);padding:6px;color:#ffffff;cursor:pointer;display:flex;align-items:center;justify-content:center;"
        onclick="window.showToast ? window.showToast({title:'Operational Alerts', message:'All 4 patrol units active and responsive in Shirva sector.', type:'info'}) : alert('No unread alerts')"
        title="Operational Notifications"
        aria-label="Notifications"
      >
        <span class="material-symbols-outlined" style="font-size:19px;">notifications</span>
        <span style="position:absolute;top:4px;right:4px;width:7px;height:7px;background:#ef4444;border-radius:50%;border:1.5px solid #0f1f5c;"></span>
      </button>

      <!-- Language Selector -->
      <div class="gov-lang-select" role="group" aria-label="Select Language">
        <button
          type="button"
          class="gov-lang-btn ${currentLang === 'en' ? 'active' : ''}"
          id="lang-btn-en"
          onclick="setLang('en')"
          title="English"
        >
          English
        </button>
        <button
          type="button"
          class="gov-lang-btn ${currentLang === 'kn' ? 'active' : ''}"
          id="lang-btn-kn"
          onclick="setLang('kn')"
          title="Kannada"
        >
          ಕನ್ನಡ
        </button>
        <button
          type="button"
          class="gov-lang-btn ${currentLang === 'hi' ? 'active' : ''}"
          id="lang-btn-hi"
          onclick="setLang('hi')"
          title="Hindi"
        >
          हिंदी
        </button>
      </div>

      <!-- User Identity -->
      <div class="gov-user-pill">
        <div class="gov-user-details">
          <span class="gov-user-name">${userName}</span>
          <span class="gov-user-role">${roleDisplay}</span>
        </div>
      </div>

      <!-- Logout Button -->
      <button
        type="button"
        class="gov-logout-btn"
        onclick="handleLogout()"
        title="Sign out of SAHAYAK Portal"
        aria-label="Logout"
      >
        <span class="material-symbols-outlined" style="font-size:18px;">logout</span>
        <span class="gov-logout-text">Logout</span>
      </button>
    </div>
    </header>
  </div>`;
}
