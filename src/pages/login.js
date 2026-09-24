/**
 * SAHAYAK Civic Operations Portal
 * pages/login.js — Dedicated, Professional Government Civic Login Page
 */

export function renderLoginPage() {
  return `
  <div class="login-page-container" style="
    min-height: calc(100vh - var(--topbar-height) - 70px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    position: relative;
  ">
    <!-- Ambient glowing accents -->
    <div style="
      position: absolute;
      top: 10%;
      left: 20%;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
      pointer-events: none;
      filter: blur(40px);
    "></div>
    <div style="
      position: absolute;
      bottom: 10%;
      right: 20%;
      width: 360px;
      height: 360px;
      background: radial-gradient(circle, rgba(15, 41, 66, 0.1) 0%, transparent 70%);
      pointer-events: none;
      filter: blur(50px);
    "></div>

    <!-- Main Login Card -->
    <div class="card" style="
      width: 100%;
      max-width: 480px;
      box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8);
      border-radius: var(--radius-xl);
      overflow: hidden;
      background: #ffffff;
      position: relative;
      z-index: 1;
    ">
      <!-- Header Banner -->
      <div style="
        background: linear-gradient(135deg, #071728 0%, #0f2942 50%, #163b5f 100%);
        padding: 2rem 2rem 1.5rem 2rem;
        text-align: center;
        color: #ffffff;
        position: relative;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      ">
        <div style="
          width: 56px;
          height: 56px;
          margin: 0 auto 12px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        ">
          <span class="material-symbols-outlined" style="font-size: 32px; color: #93c5fd;">shield_person</span>
        </div>

        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 4px;">
          <h1 style="font-family: var(--font-family-headings); font-size: 22px; font-weight: 700; letter-spacing: 0.04em; color: #ffffff; margin: 0;">
            SAHAYAK
          </h1>
          <span style="font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 9999px; background: rgba(165, 197, 254, 0.2); color: #bfdbfe; border: 1px solid rgba(191, 219, 254, 0.3); text-transform: uppercase;">
            GovNet Portal
          </span>
        </div>
        <p style="font-size: 13px; color: #94a9c4; margin: 0; line-height: 1.4;">
          Karnataka Police &amp; District Administration Unified Senior Citizen Response Command
        </p>
      </div>

      <!-- Quick Role / Mode Tabs -->
      <div style="
        display: flex;
        border-bottom: 1px solid #e2e8f0;
        background: #f8fafc;
      ">
        <button id="login-tab-officer" onclick="switchLoginTab('officer')" style="
          flex: 1;
          padding: 10px;
          border: none;
          background: #ffffff;
          border-bottom: 2px solid #0f2942;
          font-family: var(--font-family-headings);
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        ">
          <span class="material-symbols-outlined" style="font-size: 16px; color: #1e40af;">local_police</span>
          Officer &amp; Command
        </button>
        <button id="login-tab-volunteer" onclick="switchLoginTab('volunteer')" style="
          flex: 1;
          padding: 10px;
          border: none;
          background: transparent;
          border-bottom: 2px solid transparent;
          font-family: var(--font-family-headings);
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        ">
          <span class="material-symbols-outlined" style="font-size: 16px;">groups</span>
          Volunteer Cadre
        </button>
      </div>

      <!-- Form Body -->
      <div style="padding: 1.75rem 2rem;">
        <form id="login-form" onsubmit="handleLoginSubmit(event)" style="display: flex; flex-direction: column; gap: 1rem;">
          
          <!-- Station / Sector Notice -->
          <div style="
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: var(--radius-base);
            padding: 8px 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: #166534;
          ">
            <span class="material-symbols-outlined" style="font-size: 18px; color: #16a34a; flex-shrink: 0;">verified_user</span>
            <span>Secure Node: <strong>UDUPI-SHIRVA-POLICE-01</strong></span>
          </div>

          <!-- Input 1: Government Service ID / Badge Number -->
          <div>
            <label for="badge-id" class="text-label-status" style="display: block; color: #334155; margin-bottom: 6px; font-size: 11px;">
              POLICE BADGE / GOVNET SERVICE ID
            </label>
            <div style="position: relative;">
              <input
                type="text"
                id="badge-id"
                class="input"
                value="KA-POL-8821"
                required
                style="padding-left: 38px; font-size: 14px; font-weight: 500;"
                placeholder="e.g. KA-POL-8821"
              />
              <span class="material-symbols-outlined" style="
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                color: #64748b;
                font-size: 20px;
                pointer-events: none;
              ">badge</span>
            </div>
          </div>

          <!-- Input 2: Password / Security PIN -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label for="password" class="text-label-status" style="color: #334155; font-size: 11px;">
                SECURITY PIN / PASSWORD
              </label>
              <a href="#" onclick="alert('For PIN reset, please contact District IT Cell: 0820-2520112'); return false;" style="font-size: 12px; color: #2563eb; font-weight: 500;">
                Forgot PIN?
              </a>
            </div>
            <div style="position: relative;">
              <input
                type="password"
                id="password"
                class="input"
                value="••••••••••••"
                required
                style="padding-left: 38px; padding-right: 38px; font-size: 14px;"
                placeholder="Enter password or 6-digit PIN"
              />
              <span class="material-symbols-outlined" style="
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                color: #64748b;
                font-size: 20px;
                pointer-events: none;
              ">lock</span>
              <button
                type="button"
                onclick="togglePasswordVisibility()"
                style="
                  position: absolute;
                  right: 8px;
                  top: 50%;
                  transform: translateY(-50%);
                  background: none;
                  border: none;
                  color: #94a3b8;
                  cursor: pointer;
                  padding: 4px;
                  display: flex;
                  align-items: center;
                "
                title="Toggle password view"
              >
                <span class="material-symbols-outlined" id="toggle-pwd-icon" style="font-size: 18px;">visibility</span>
              </button>
            </div>
          </div>

          <!-- Input 3: Station Role Clearance -->
          <div>
            <label for="role-select" class="text-label-status" style="display: block; color: #334155; margin-bottom: 6px; font-size: 11px;">
              AUTHENTICATED COMMAND ROLE
            </label>
            <div style="position: relative;">
              <select id="role-select" class="input" style="
                padding-left: 38px;
                font-size: 13px;
                font-weight: 500;
                appearance: none;
                cursor: pointer;
                background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
                background-repeat: no-repeat;
                background-position: right 12px center;
                background-size: 10px;
              ">
                <option value="station-cdr" selected>Station Commander (Inspector R. Nayak)</option>
                <option value="welfare-officer">District Senior Welfare Officer (Udupi)</option>
                <option value="dispatcher">112 / 14567 Unified Dispatch Desk</option>
              </select>
              <span class="material-symbols-outlined" style="
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                color: #64748b;
                font-size: 20px;
                pointer-events: none;
              ">admin_panel_settings</span>
            </div>
          </div>

          <!-- Remember me & 2FA indicator -->
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: #475569; margin: 2px 0;">
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
              <input type="checkbox" checked class="checkbox-custom" style="width: 16px; height: 16px;" />
              <span>Remember station terminal</span>
            </label>
            <span style="font-size: 11px; color: #059669; display: flex; align-items: center; gap: 3px;">
              <span class="material-symbols-outlined" style="font-size: 14px;">check_circle</span>
              2FA Active
            </span>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            id="login-btn"
            class="btn btn-primary"
            style="
              width: 100%;
              height: 44px;
              font-size: 14px;
              font-weight: 700;
              letter-spacing: 0.02em;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              margin-top: 4px;
            "
          >
            <span class="material-symbols-outlined" style="font-size: 18px;">login</span>
            Authenticate &amp; Open Command
          </button>

          <!-- 1-Click Demo Access -->
          <div style="position: relative; text-align: center; margin: 4px 0;">
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 10px 0;" />
            <span style="position: absolute; top: -9px; left: 50%; transform: translateX(-50%); background: #ffffff; padding: 0 10px; font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase;">
              OR
            </span>
          </div>

          <button
            type="button"
            onclick="quickLoginDemo()"
            class="btn btn-secondary btn-sm"
            style="
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              background: #f8fafc;
              border-color: #cbd5e1;
            "
          >
            <span class="material-symbols-outlined" style="font-size: 16px; color: #2563eb;">flash_on</span>
            1-Click Demo Login (Insp. R. Nayak)
          </button>
        </form>
      </div>

      <!-- Legal Compliance Footer -->
      <div style="
        background: #f8fafc;
        border-top: 1px solid #e2e8f0;
        padding: 12px 20px;
        text-align: center;
        font-size: 11px;
        color: #64748b;
        line-height: 1.4;
      ">
        <span>Authorized Personnel Only. Logins are encrypted and audited under Sec 43/66 of the Information Technology Act.</span>
      </div>
    </div>
  </div>`;
}

/* ── Interactive Helpers ────────────────────────────────────────── */
window.switchLoginTab = function(type) {
  const officerTab = document.getElementById('login-tab-officer');
  const volunteerTab = document.getElementById('login-tab-volunteer');
  const badgeInput = document.getElementById('badge-id');
  const roleSelect = document.getElementById('role-select');

  if (type === 'volunteer') {
    volunteerTab.style.background = '#ffffff';
    volunteerTab.style.borderBottom = '2px solid #0f2942';
    volunteerTab.style.color = '#0f172a';
    volunteerTab.style.fontWeight = '700';

    officerTab.style.background = 'transparent';
    officerTab.style.borderBottom = '2px solid transparent';
    officerTab.style.color = '#64748b';
    officerTab.style.fontWeight = '600';

    if (badgeInput) badgeInput.value = 'VOL-SHIRVA-042';
    if (roleSelect) roleSelect.innerHTML = `
      <option value="lead-vol" selected>Lead Volunteer Coordinator (Shirva Youth Red Cross)</option>
      <option value="field-vol">Verified Field Volunteer</option>
    `;
  } else {
    officerTab.style.background = '#ffffff';
    officerTab.style.borderBottom = '2px solid #0f2942';
    officerTab.style.color = '#0f172a';
    officerTab.style.fontWeight = '700';

    volunteerTab.style.background = 'transparent';
    volunteerTab.style.borderBottom = '2px solid transparent';
    volunteerTab.style.color = '#64748b';
    volunteerTab.style.fontWeight = '600';

    if (badgeInput) badgeInput.value = 'KA-POL-8821';
    if (roleSelect) roleSelect.innerHTML = `
      <option value="station-cdr" selected>Station Commander (Inspector R. Nayak)</option>
      <option value="welfare-officer">District Senior Welfare Officer (Udupi)</option>
      <option value="dispatcher">112 / 14567 Unified Dispatch Desk</option>
    `;
  }
};

window.togglePasswordVisibility = function() {
  const pwdInput = document.getElementById('password');
  const icon = document.getElementById('toggle-pwd-icon');
  if (!pwdInput || !icon) return;

  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    pwdInput.value = 'SahayakGovNet2026';
    icon.textContent = 'visibility_off';
  } else {
    pwdInput.type = 'password';
    pwdInput.value = '••••••••••••';
    icon.textContent = 'visibility';
  }
};

window.handleLoginSubmit = function(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  if (btn) {
    btn.innerHTML = `<span class="material-symbols-outlined animate-spin" style="font-size:18px;">progress_activity</span> Authenticating GovNet...`;
    btn.disabled = true;
  }

  // Set login flag in session storage
  sessionStorage.setItem('loggedIn', 'true');

  setTimeout(() => {
    navigate('assistance-requests');
  }, 700);
};

window.quickLoginDemo = function() {
  const btn = document.getElementById('login-btn');
  if (btn) {
    btn.innerHTML = `<span class="material-symbols-outlined animate-spin" style="font-size:18px;">progress_activity</span> Logging in...`;
  }

  // Set login flag for demo
  sessionStorage.setItem('loggedIn', 'true');

  setTimeout(() => {
    navigate('assistance-requests');
  }, 400);
};
