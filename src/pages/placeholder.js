/**
 * SAHAYAK Civic Operations Portal
 * pages/placeholder.js — Clean, Informative Secondary Pages & Section Hub
 */

const PAGE_DATA = {
  'emergency-requests': {
    icon: 'crisis_alert',
    title: 'Emergency SOS Command',
    category: 'Critical Incidents',
    desc: 'Unified Police (112) & Ambulance (108) emergency response coordination for senior citizens.',
    stats: [
      { label: 'Active SOS Dispatches', val: '2 Urgent' },
      { label: 'Police Response Latency', val: '4.8 Mins' },
      { label: 'Nearby PCR Patrols', val: '5 Online' },
    ],
  },
  'ai-call-centre': {
    icon: 'support_agent',
    title: 'AI Speech & IVR Call Centre',
    category: 'Automated Ingestion',
    desc: 'Real-time Kannada & Tulu speech recognition logs, automated triage, and direct operator hand-offs.',
    stats: [
      { label: 'Incoming IVR Calls', val: '18 Today' },
      { label: 'Language Processing', val: 'Kannada / Tulu / EN' },
      { label: 'Speech Accuracy', val: '98.4%' },
    ],
  },
  'senior-citizens': {
    icon: 'elderly',
    title: 'Senior Citizens Registry',
    category: 'Civic Welfare Registry',
    desc: 'Verified citizen database with medical tags, ward locations, emergency contacts, and home delivery profiles.',
    stats: [
      { label: 'Registered Citizens', val: '1,420 Enrolled' },
      { label: 'Living Alone Flag', val: '312 Monitored' },
      { label: 'Verified Wards', val: '14 Sectors' },
    ],
  },
  volunteers: {
    icon: 'groups',
    title: 'Volunteer Network & Cadre',
    category: 'Community Force',
    desc: 'Civic volunteer roster, police background verifications, service badges, and ward assignments.',
    stats: [
      { label: 'Active Volunteers', val: '86 Ready' },
      { label: 'Average Rating', val: '4.9 / 5.0' },
      { label: 'Welfare Runs Completed', val: '1,840 Total' },
    ],
  },
  'audit-logs': {
    icon: 'policy',
    title: 'System Audit & Compliance Logs',
    category: 'GovNet Governance',
    desc: 'Immutable audit trail of all citizen calls, volunteer dispatches, and police escalations under Sec 43/66 IT Act.',
    stats: [
      { label: 'Audit Trail Records', val: '100% Encrypted' },
      { label: 'GPS Log Precision', val: '< 5 Meters' },
      { label: 'Compliance Status', val: 'Fully Compliant' },
    ],
  },
  login: {
    icon: 'lock_person',
    title: 'GovNet Authentication & Role Access',
    category: 'Security Portal',
    desc: 'Two-Factor biometric and PKI login for Station Commanders, Welfare Officers, and District Magistrates.',
    stats: [
      { label: 'Session Status', val: 'Active (Secured)' },
      { label: 'Role Clearance', val: 'Level 3 Commander' },
      { label: 'Session Expiry', val: '58 Mins' },
    ],
  },
};

export function renderPlaceholderPage(path) {
  const meta = PAGE_DATA[path] || {
    icon: 'dashboard',
    title: path.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    category: 'Civic Module',
    desc: 'Operational portal module for Karnataka Senior Citizen Welfare Command.',
    stats: [
      { label: 'System Status', val: 'Operational' },
      { label: 'Node', val: 'Udupi Central' },
    ],
  };

  const statsHtml = meta.stats
    ? meta.stats
        .map(
          (s) => `
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:var(--radius-base);padding:1rem;flex:1;min-width:160px;text-align:center;">
      <span class="text-label-status" style="color:#64748b;font-size:11px;">${s.label}</span>
      <div style="font-family:var(--font-family-headings);font-size:18px;font-weight:700;color:#0f172a;margin-top:4px;">${s.val}</div>
    </div>`
        )
        .join('')
    : '';

  return `
  <!-- Sub-banner -->
  <div class="sub-banner">
    <div class="sub-banner__breadcrumb">
      <span class="text-label-status" style="color:#0f2942;font-weight:700;font-size:12px;">CIVIC COMMAND</span>
      <span style="color:#cbd5e1;">/</span>
      <span class="text-label-md" style="color:#334155;font-weight:600;">${meta.category}</span>
      <span style="color:#cbd5e1;">/</span>
      <span class="badge badge-neutral" style="font-size:11px;">${meta.title}</span>
    </div>
    <div class="sub-banner__actions">
      <button class="btn btn-secondary btn-sm" onclick="navigate('assistance-requests')">
        <span class="material-symbols-outlined" style="font-size:16px;">arrow_back</span>
        Return to Requests
      </button>
    </div>
  </div>

  <div class="page-pad">
    <div class="card" style="padding:2.5rem 2rem;text-align:center;max-width:800px;margin:2rem auto;display:flex;flex-direction:column;align-items:center;gap:1.25rem;">
      <div style="width:64px;height:64px;border-radius:var(--radius-xl);background:linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);color:#1e40af;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-sm);">
        <span class="material-symbols-outlined" style="font-size:36px;">${meta.icon}</span>
      </div>

      <div>
        <span class="badge badge-neutral" style="font-size:11px;margin-bottom:6px;">${meta.category}</span>
        <h1 class="text-headline-xl" style="font-size:24px;font-weight:700;color:#0f172a;margin-top:4px;">${meta.title}</h1>
        <p class="text-body-md" style="color:#64748b;max-width:540px;margin:8px auto 0;font-size:14px;line-height:1.5;">${meta.desc}</p>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:12px;width:100%;margin-top:10px;">
        ${statsHtml}
      </div>

      <div style="display:flex;gap:10px;margin-top:1rem;">
        <button class="btn btn-primary" onclick="navigate('assistance-requests')">
          <span class="material-symbols-outlined" style="font-size:18px;">assignment</span>
          Open Active Assistance Requests
        </button>
      </div>
    </div>
  </div>`;
}
