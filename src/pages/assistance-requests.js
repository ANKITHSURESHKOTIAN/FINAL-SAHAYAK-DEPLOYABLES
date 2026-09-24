/**
 * SAHAYAK Civic Operations Portal
 * pages/assistance-requests.js — Clean, User-Friendly Assistance Requests Interface
 */

import { ASSISTANCE_REQUESTS, METRICS } from '../data/requests.js';

/* ── Status configurations ─────────────────────────────────────── */
const STATUS_CONFIG = {
  critical: {
    bg: '#fef2f2',
    text: '#991b1b',
    border: '#fecaca',
    badgeClass: 'badge-emergency',
    icon: 'priority_high',
  },
  'in-progress': {
    bg: '#eff6ff',
    text: '#1e40af',
    border: '#bfdbfe',
    badgeClass: 'badge-in-progress',
    icon: 'near_me',
  },
  assigned: {
    bg: '#f0fdf4',
    text: '#166534',
    border: '#bbf7d0',
    badgeClass: 'badge-resolved',
    icon: 'verified',
  },
  neutral: {
    bg: '#f8fafc',
    text: '#334155',
    border: '#e2e8f0',
    badgeClass: 'badge-neutral',
    icon: 'check_circle',
  },
};

/* ── Metric Card ───────────────────────────────────────────────── */
function renderMetricCard(m) {
  return `
  <div class="metric-card" id="${m.id}" role="region" aria-label="${m.label}">
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div>
        <span class="text-label-status" style="color:#64748b;font-size:11px;">${m.label}</span>
        <div style="font-family:var(--font-family-headings);font-size:28px;font-weight:700;color:#0f172a;margin-top:2px;">
          ${m.value}
        </div>
        <span class="text-label-md" style="color:#475569;font-weight:500;">${m.sublabel}</span>
      </div>
      <div class="metric-card__icon" style="background:${m.iconBg};color:${m.iconColor};">
        <span class="material-symbols-outlined" style="font-size:22px;">${m.icon}</span>
      </div>
    </div>
    <div style="margin-top:12px;padding-top:8px;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;">
      <span class="text-body-sm" style="color:#64748b;font-size:12px;">${m.detail}</span>
      <span class="text-label-status" style="color:${m.statColor};font-weight:700;font-size:11px;">${m.stat}</span>
    </div>
  </div>`;
}

/* ── Audio Snippet ─────────────────────────────────────────────── */
function renderAudioSnippet(audio) {
  return `
  <div class="audio-snippet">
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="material-symbols-outlined${audio.pulse ? ' animate-pulse' : ''}" style="font-size:16px;color:#ef4444;">
          ${audio.icon || 'graphic_eq'}
        </span>
        <span class="text-label-status" style="color:#1e3a5f;font-weight:700;font-size:11px;">
          VOICE INTAKE • ${audio.duration}
        </span>
      </div>
      <span class="text-label-status" style="color:#64748b;font-size:10px;">AI TRANSCRIBED</span>
    </div>

    ${
      audio.showPlayer
        ? `
    <div style="display:flex;align-items:center;gap:8px;background:#ffffff;padding:6px 10px;border-radius:var(--radius-base);border:1px solid #e2e8f0;margin:4px 0;">
      <button
        class="btn btn-primary btn-sm"
        style="width:28px;height:28px;min-height:28px;padding:0;border-radius:50%;flex-shrink:0;"
        aria-label="Play recorded citizen voice"
        onclick="this.innerHTML = this.innerHTML.includes('pause') ? '<span class=\\\'material-symbols-outlined\\\' style=\\\'font-size:16px;\\\'>play_arrow</span>' : '<span class=\\\'material-symbols-outlined\\\' style=\\\'font-size:16px;\\\'>pause</span>'"
      >
        <span class="material-symbols-outlined" style="font-size:16px;">play_arrow</span>
      </button>
      <div style="flex:1;display:flex;align-items:center;gap:3px;height:16px;">
        <span style="width:3px;height:12px;background:#3f5f92;border-radius:2px;"></span>
        <span style="width:3px;height:16px;background:#3f5f92;border-radius:2px;"></span>
        <span style="width:3px;height:8px;background:#3f5f92;border-radius:2px;"></span>
        <span style="width:3px;height:18px;background:#0f2942;border-radius:2px;"></span>
        <span style="width:3px;height:14px;background:#0f2942;border-radius:2px;"></span>
        <span style="width:3px;height:10px;background:#94a3b8;border-radius:2px;"></span>
        <span style="width:3px;height:14px;background:#cbd5e1;border-radius:2px;"></span>
        <span style="width:3px;height:6px;background:#cbd5e1;border-radius:2px;"></span>
        <span style="width:3px;height:12px;background:#cbd5e1;border-radius:2px;"></span>
      </div>
      <span class="material-symbols-outlined" style="color:#94a3b8;font-size:16px;">volume_up</span>
    </div>`
        : ''
    }

    <div style="font-size:12px;line-height:1.4;margin-top:2px;">
      <p style="color:#334155;font-style:italic;">${audio.kannada}</p>
      <p style="color:#64748b;margin-top:2px;"><strong>English:</strong> ${audio.english}</p>
    </div>
  </div>`;
}

/* ── Dispatch Actions Column ───────────────────────────────────── */
function renderDispatchColumn(req) {
  const { dispatch } = req;

  if (dispatch.type === 'actions') {
    return `
    <div class="dispatch-col">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span class="text-label-status" style="color:#64748b;font-weight:700;">ASSIGNMENT DESK</span>
          <span class="badge badge-emergency" style="font-size:10px;">Immediate</span>
        </div>
        <div style="background:#ffffff;padding:10px;border-radius:var(--radius-base);border:1px solid #e2e8f0;display:flex;flex-direction:column;gap:6px;">
          <div>
            <span class="text-label-status" style="color:#64748b;display:block;font-size:10px;">POLICE DESK / HUB</span>
            <span class="text-label-md" style="color:#0f172a;font-weight:600;">${dispatch.hub}</span>
          </div>
          <div>
            <span class="text-label-status" style="color:#64748b;display:block;font-size:10px;">AVAILABLE NEARBY</span>
            <span class="text-label-md" style="color:#059669;font-weight:700;">${dispatch.volunteers}</span>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px;margin-top:auto;">
        <button
          class="btn btn-emergency"
          style="width:100%;"
          onclick="openAssignModal('${req.id}', '${req.citizen.name}', '${req.request.item}', '${req.citizen.address}')"
          id="assign-btn-${req.id}"
        >
          <span class="material-symbols-outlined" style="font-size:18px;">person_add</span>
          Assign Volunteer Now
        </button>
        <button
          class="btn btn-secondary btn-sm"
          style="width:100%;"
          onclick="alert('Calling citizen at ${dispatch.citizenPhone}...')"
        >
          <span class="material-symbols-outlined" style="font-size:16px;">call</span>
          Call Citizen (${dispatch.citizenPhone})
        </button>
      </div>
    </div>`;
  }

  if (dispatch.type === 'volunteer' || dispatch.type === 'escort') {
    const isEscort = dispatch.type === 'escort';
    return `
    <div class="dispatch-col">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span class="text-label-status" style="color:#1e40af;font-weight:700;">
            ${isEscort ? 'POLICE ESCORT' : 'ACTIVE VOLUNTEER'}
          </span>
          <span class="badge badge-in-progress" style="font-size:10px;">En Route</span>
        </div>

        <div style="background:#ffffff;padding:10px;border-radius:var(--radius-base);border:1px solid #e2e8f0;display:flex;align-items:center;gap:10px;">
          <div style="width:38px;height:38px;border-radius:50%;background:#dbeafe;color:#1e40af;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0;">
            ${dispatch.volunteerInitials}
          </div>
          <div style="min-width:0;">
            <span class="text-label-lg" style="color:#0f172a;font-weight:700;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              ${dispatch.volunteerName}
            </span>
            <span class="text-body-sm" style="color:#64748b;font-size:12px;display:block;">
              ${dispatch.volunteerDetail}
            </span>
            <span class="text-label-status" style="color:#2563eb;font-weight:700;font-size:10px;">
              ${dispatch.volunteerDist}
            </span>
          </div>
        </div>

        ${
          dispatch.vehicle
            ? `
        <div style="background:#f1f5f9;padding:6px 10px;border-radius:var(--radius-base);margin-top:6px;display:flex;justify-content:space-between;align-items:center;">
          <span class="text-label-status" style="color:#475569;font-size:10px;">VEHICLE</span>
          <span class="text-label-md" style="color:#0f172a;font-weight:600;">${dispatch.vehicle}</span>
        </div>`
            : ''
        }
      </div>

      <div style="display:flex;flex-direction:column;gap:6px;margin-top:auto;">
        <button class="btn btn-primary btn-sm" style="width:100%;" onclick="alert('Tracking status for ${req.id}')">
          <span class="material-symbols-outlined" style="font-size:16px;">${dispatch.primaryAction.icon}</span>
          ${dispatch.primaryAction.label}
        </button>
        ${
          dispatch.secondaryAction
            ? `
        <button class="btn btn-secondary btn-sm" style="width:100%;" onclick="alert('Contacting dispatch team')">
          <span class="material-symbols-outlined" style="font-size:16px;">${dispatch.secondaryAction.icon}</span>
          ${dispatch.secondaryAction.label}
        </button>`
            : ''
        }
      </div>
    </div>`;
  }

  return '';
}

/* ── Request Card ──────────────────────────────────────────────── */
function renderRequestCard(req) {
  const cfg = STATUS_CONFIG[req.urgency] || STATUS_CONFIG.neutral;

  return `
  <article class="request-card" id="request-${req.id}" aria-label="Request ${req.id}">
    <!-- Status Header Bar -->
    <div class="request-card__header" style="background:${cfg.bg};border-bottom:1px solid ${cfg.border};">
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="badge ${cfg.badgeClass}" style="display:inline-flex;align-items:center;gap:4px;">
          <span class="material-symbols-outlined" style="font-size:14px;">${cfg.icon}</span>
          ${req.statusLabel}
        </span>
        <span style="color:#94a3b8;">•</span>
        <span class="text-label-md" style="color:${cfg.text};font-weight:500;">${req.statusDetail}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="text-label-status" style="color:#64748b;font-size:11px;">CASE ID:</span>
        <span class="text-label-status" style="color:#0f172a;font-weight:700;font-size:12px;letter-spacing:0.04em;">${req.id}</span>
      </div>
    </div>

    <!-- Main Card Body Grid -->
    <div class="request-card__body">
      <!-- 1. Citizen & Location Information -->
      <div class="request-card__citizen">
        <div>
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <div style="width:50px;height:50px;border-radius:var(--radius-lg);background:#e2e8f0;display:flex;align-items:center;justify-content:center;color:#1e3a5f;flex-shrink:0;">
              <span class="material-symbols-outlined" style="font-size:28px;">${req.citizen.icon}</span>
            </div>
            <div style="min-width:0;flex:1;">
              <div style="display:flex;align-items:center;gap:6px;">
                <h3 class="text-headline-sm" style="color:#0f172a;font-weight:700;margin:0;">
                  ${req.citizen.name}
                </h3>
                <span class="badge badge-neutral" style="font-size:10px;">${req.citizen.age} YRS</span>
              </div>
              <div style="display:flex;align-items:center;gap:4px;color:#475569;font-size:13px;margin-top:3px;">
                <span class="material-symbols-outlined" style="font-size:16px;color:#2563eb;flex-shrink:0;">location_on</span>
                <span class="truncate">${req.citizen.address}</span>
              </div>
              <div style="display:flex;align-items:center;gap:6px;margin-top:6px;flex-wrap:wrap;">
                ${req.citizen.tags.map((t) => `<span class="badge badge-neutral" style="font-size:10px;">${t}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- Merchant / Partner info -->
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:var(--radius-base);padding:8px 10px;margin-top:12px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
              <span class="text-label-status" style="color:#1e40af;font-size:10px;">${req.partner.type}</span>
              <span class="text-label-status" style="color:#475569;font-size:10px;background:#e2e8f0;padding:1px 6px;border-radius:var(--radius-full);">${req.partner.distance}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
              <span class="material-symbols-outlined" style="font-size:18px;color:#3b82f6;">${req.partner.icon}</span>
              <span class="text-label-md" style="color:#0f172a;font-weight:600;">${req.partner.name}</span>
            </div>
            <span class="text-body-sm" style="color:#64748b;font-size:11px;display:block;margin-top:2px;">${req.partner.detail}</span>
          </div>
        </div>
      </div>

      <!-- 2. Request Details & Voice Note -->
      <div class="request-card__details">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:4px;">
            <span class="badge badge-neutral" style="font-size:11px;background:#e2e8f0;color:#0f172a;font-weight:600;">
              ${req.request.category}
            </span>
            <span class="text-body-sm" style="color:#64748b;font-size:11px;">${req.request.received}</span>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:var(--radius-base);padding:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span class="text-label-lg" style="font-weight:700;color:#0f172a;">${req.request.item}</span>
              <span class="badge badge-neutral" style="font-size:10px;">${req.request.qty}</span>
            </div>
            <p class="text-body-sm" style="color:#475569;margin-top:4px;font-size:13px;line-height:1.4;">
              ${req.request.description}
            </p>
          </div>

          <!-- Audio note -->
          ${renderAudioSnippet(req.audio)}
        </div>
      </div>

      <!-- 3. Dispatch & Direct Action -->
      ${renderDispatchColumn(req)}
    </div>
  </article>`;
}

/* ── Filter & Search Controls ──────────────────────────────────── */
function renderFilterBar() {
  const categories = [
    { id: 'all', label: 'All Requests (14)', active: true },
    { id: 'grocery', label: 'Groceries & Milk (5)', active: false },
    { id: 'medicine', label: 'Medicines (4)', active: false },
    { id: 'utility', label: 'Gas & Utility (3)', active: false },
    { id: 'mobility', label: 'Mobility Escort (2)', active: false },
  ];

  return `
  <div class="card" style="padding:0.75rem 1rem;" id="filter-bar">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;">
      <!-- Category Filter Tabs -->
      <div style="display:flex;align-items:center;gap:6px;overflow-x:auto;" role="tablist" aria-label="Request categories">
        ${categories
          .map(
            (c) => `
        <button
          class="btn${c.active ? ' btn-primary' : ' btn-secondary'} btn-sm"
          id="filter-cat-${c.id}"
          onclick="filterCategory('${c.id}')"
          role="tab"
          aria-selected="${c.active}"
          style="min-height:32px;font-size:12px;"
        >
          ${c.label}
        </button>`
          )
          .join('')}
      </div>

      <!-- Search Box & View Mode -->
      <div style="display:flex;align-items:center;gap:10px;flex-shrink:0;">
        <div style="position:relative;width:240px;">
          <input
            class="input"
            id="search-input"
            type="search"
            placeholder="Search citizen or ID..."
            style="padding-left:34px;height:34px;font-size:13px;"
            oninput="filterSearch(this.value)"
            aria-label="Search requests"
          />
          <span class="material-symbols-outlined" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:18px;pointer-events:none;">search</span>
        </div>

        <div style="display:flex;align-items:center;background:#f1f5f9;border-radius:var(--radius-base);padding:2px;" role="group" aria-label="View toggle">
          <button class="btn btn-secondary btn-sm" id="view-grid" onclick="setView('grid')" style="min-height:28px;padding:2px 10px;font-size:12px;" aria-pressed="true">Full</button>
          <button style="border:none;background:transparent;padding:2px 10px;font-size:12px;font-family:var(--font-family-headings);cursor:pointer;color:#64748b;" id="view-compact" onclick="setView('compact')" aria-pressed="false">Compact</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ── Page Root ─────────────────────────────────────────────────── */
export function renderAssistanceRequestsPage() {
  const metricsHtml = METRICS.map(renderMetricCard).join('');
  const cardsHtml = ASSISTANCE_REQUESTS.map(renderRequestCard).join('');

  return `
  <!-- Sub-banner -->
  <div class="sub-banner">
    <div class="sub-banner__breadcrumb">
      <span class="text-label-status" style="color:#0f2942;font-weight:700;font-size:12px;">CIVIC COMMAND</span>
      <span style="color:#cbd5e1;">/</span>
      <span class="text-label-md" style="color:#334155;font-weight:600;">Zone 4: Shirva &amp; Manipal Sub-Sector</span>
      <span style="color:#cbd5e1;">/</span>
      <span class="badge badge-neutral" style="font-size:11px;">Active Watch</span>
    </div>
    <div class="sub-banner__actions">
      <button class="btn btn-secondary btn-sm" onclick="alert('Synchronized with Karnataka 14567 Direct Dial System')">
        <span class="material-symbols-outlined" style="font-size:16px;">sync</span>
        Sync Helpline (14567)
      </button>
      <button class="btn btn-primary btn-sm" onclick="alert('Intake Form Opening...')">
        <span class="material-symbols-outlined" style="font-size:16px;">add</span>
        New Citizen Intake
      </button>
    </div>
  </div>

  <div class="page-pad" style="display:flex;flex-direction:column;gap:1.25rem;">
    <!-- 1. Key Operational Metrics Grid -->
    <section aria-label="Operational Metrics" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;">
      ${metricsHtml}
    </section>

    <!-- 2. Clean Filters & Search Bar -->
    ${renderFilterBar()}

    <!-- 3. Active Assistance Requests Feed -->
    <section aria-label="Assistance Requests" id="requests-container" style="display:flex;flex-direction:column;gap:1rem;">
      ${cardsHtml}
    </section>
  </div>`;
}
