/**
 * SAHAYAK — Official Police & Community Assistance Portal
 * Requests Page — The Core Operating Worktable
 * 
 * Supports both:
 * 1. Rich Vibrant Cards View (original civic dispatch card feed)
 * 2. High-contrast Compact Table View
 * - Search & category filtering
 * - Direct assignment and status handling
 */

import { getRequests } from '../data/portalData.js';

export function renderRequestsPage(activeFilter = 'All', searchQuery = '') {
  let requests = getRequests();
  const viewMode = window.requestsViewMode || 'cards';

  // Filter
  if (activeFilter === 'Pending') {
    requests = requests.filter((r) => r.status === 'Pending');
  } else if (activeFilter === 'Assigned') {
    requests = requests.filter((r) => r.status === 'Assigned');
  } else if (activeFilter === 'Completed') {
    requests = requests.filter((r) => r.status === 'Completed');
  } else if (activeFilter === 'Emergency') {
    requests = requests.filter((r) => r.isEmergency || r.priority === 'EMERGENCY');
  }

  // Search
  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    requests = requests.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.seniorCitizen.toLowerCase().includes(q) ||
        r.request.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        (r.assignedVolunteer && r.assignedVolunteer.toLowerCase().includes(q))
    );
  }

  // Filter buttons
  const filters = ['All', 'Pending', 'Assigned', 'Completed', 'Emergency'];
  const filterTabsHtml = filters
    .map((f) => {
      const isActive = activeFilter === f;
      return `
      <button
        type="button"
        class="gov-filter-tab${isActive ? ' active' : ''}"
        onclick="setRequestsFilter('${f}')"
      >
        ${f}
      </button>`;
    })
    .join('');

  // 1. CARDS VIEW GENERATION
  const cardsHtml = requests.length > 0
    ? requests
        .map((req, index) => {
          const isEmergency = req.isEmergency || req.priority === 'EMERGENCY';
          const headerBg = isEmergency
            ? 'linear-gradient(135deg, #fee2e2 0%, #ffedd5 100%)'
            : req.status === 'Pending'
            ? 'linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%)'
            : req.status === 'Assigned'
            ? 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%)'
            : 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)';

          const headerBorder = isEmergency
            ? '#fca5a5'
            : req.status === 'Pending'
            ? '#fcd34d'
            : req.status === 'Assigned'
            ? '#c7d2fe'
            : '#a7f3d0';

          const statusBadge = isEmergency
            ? `<span class="badge badge-emergency"><span class="material-symbols-outlined" style="font-size:14px;">crisis_alert</span> Emergency SOS</span>`
            : req.status === 'Pending'
            ? `<span class="badge" style="background:#fef3c7;color:#b45309;border:1px solid #fcd34d;"><span class="material-symbols-outlined" style="font-size:14px;">hourglass_top</span> Waiting for Volunteer</span>`
            : req.status === 'Assigned'
            ? `<span class="badge badge-in-progress"><span class="material-symbols-outlined" style="font-size:14px;">directions_bike</span> Assigned to Volunteer</span>`
            : `<span class="badge badge-resolved"><span class="material-symbols-outlined" style="font-size:14px;">check_circle</span> Delivered / Resolved</span>`;

          const priorityBadge = isEmergency
            ? `<span class="badge badge-emergency">CRITICAL PRIORITY</span>`
            : req.priority === 'High'
            ? `<span class="badge" style="background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;">High Priority</span>`
            : `<span class="badge badge-neutral">Standard</span>`;

          return `
          <article class="request-card" id="request-card-${req.id}" style="animation:fadeInUp 0.3s ease both;animation-delay:${index * 40}ms;">
            <!-- Top Status Header -->
            <div class="request-card__header" style="background:${headerBg};border-bottom:1px solid ${headerBorder};">
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                ${statusBadge}
                ${priorityBadge}
                <span style="font-size:12px;color:var(--gov-text-muted);">Jurisdiction: Shirva PS Beat #2</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:11px;font-weight:700;color:var(--gov-text-muted);letter-spacing:0.04em;">CASE ID:</span>
                <span style="font-family:var(--font-family-sans);font-weight:800;font-size:13px;color:var(--gov-navy-primary);">${req.id}</span>
              </div>
            </div>

            <!-- Card Body: 3 Columns -->
            <div class="request-card__body">
              <!-- Column 1: Citizen Profile -->
              <div class="request-card__citizen">
                <div style="display:flex;align-items:flex-start;gap:12px;">
                  <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg, #4f79ff 0%, #7c5cfc 100%);display:flex;align-items:center;justify-content:center;color:#ffffff;font-size:20px;font-weight:700;flex-shrink:0;box-shadow:0 3px 10px rgba(79,121,255,0.3);">
                    ${req.seniorCitizen.charAt(0)}
                  </div>
                  <div style="min-width:0;flex:1;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <h3 style="font-size:16px;font-weight:700;color:var(--gov-text-primary);margin:0;">
                        ${req.seniorCitizen}
                      </h3>
                      <span class="badge badge-neutral" style="font-size:10px;">Senior</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:4px;color:var(--gov-text-secondary);font-size:13px;margin-top:4px;">
                      <span class="material-symbols-outlined" style="font-size:16px;color:#4f79ff;">location_on</span>
                      <span class="truncate">${req.location || req.area}</span>
                    </div>
                    <div style="margin-top:6px;">
                      <a href="tel:${req.phone}" style="display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600;color:var(--accent-blue);text-decoration:none;">
                        <span class="material-symbols-outlined" style="font-size:15px;">call</span>
                        ${req.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Assistance Details Box -->
                <div style="margin-top:14px;background:#f8faff;border:1px solid #e0e7ff;border-radius:8px;padding:10px 12px;">
                  <span style="font-size:10px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:0.04em;">Assistance Category</span>
                  <div style="font-size:13px;font-weight:700;color:var(--gov-text-primary);margin-top:2px;">
                    ${req.category || 'General Civic Assistance'}
                  </div>
                </div>
              </div>

              <!-- Column 2: Required Items & Voice Record Details -->
              <div class="request-card__details">
                <div style="background:#ffffff;border:1px solid var(--gov-border);border-radius:10px;padding:12px;box-shadow:0 1px 4px rgba(0,0,0,0.03);">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                    <span style="font-size:14px;font-weight:700;color:var(--gov-text-primary);">${req.request}</span>
                    <span class="badge" style="background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;">${req.quantity || '1 unit'}</span>
                  </div>
                  <p style="font-size:13px;color:var(--gov-text-secondary);line-height:1.4;margin:0;">
                    ${req.description || 'Request recorded through citizen dialer. Immediate local support dispatch requested.'}
                  </p>
                </div>

                <!-- Simulated Voice Intake Transcript snippet -->
                <div class="audio-snippet" style="margin-top:10px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <div style="display:flex;align-items:center;gap:6px;">
                      <span class="material-symbols-outlined" style="font-size:16px;color:#ef4444;">graphic_eq</span>
                      <span style="font-size:11px;font-weight:700;color:var(--gov-text-primary);letter-spacing:0.04em;">AI VOICE HELPLINE TRANSCRIPT</span>
                    </div>
                    <span style="font-size:10px;color:var(--gov-text-muted);font-weight:600;">RECORDED</span>
                  </div>
                  <div style="font-size:12px;color:var(--gov-text-secondary);font-style:italic;margin-top:2px;">
                    "ನಮಸ್ಕಾರ, ನನಗೆ ಅಗತ್ಯ ವಸ್ತುಗಳು ತಲುಪಿಸಲು ಸಹಾಯ ಬೇಕಾಗಿದೆ..."
                  </div>
                </div>
              </div>

              <!-- Column 3: Volunteer Dispatch Actions -->
              <div class="dispatch-col">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                  <span style="font-size:11px;font-weight:700;color:var(--gov-text-muted);text-transform:uppercase;letter-spacing:0.04em;">DISPATCH STATUS</span>
                  <span class="material-symbols-outlined" style="font-size:18px;color:#4f79ff;">shield</span>
                </div>

                <div style="background:#ffffff;border:1px solid var(--gov-border);border-radius:8px;padding:10px;margin-bottom:12px;">
                  <div style="font-size:11px;color:var(--gov-text-muted);font-weight:600;text-transform:uppercase;">Assigned Volunteer</div>
                  <div style="font-size:14px;font-weight:700;color:var(--gov-text-primary);margin-top:2px;display:flex;align-items:center;gap:6px;">
                    <span class="material-symbols-outlined" style="font-size:18px;color:${req.assignedVolunteer ? '#10b981' : '#f59e0b'};">
                      ${req.assignedVolunteer ? 'verified_user' : 'pending'}
                    </span>
                    ${req.assignedVolunteer || 'None (Unassigned)'}
                  </div>
                </div>

                <div style="display:flex;flex-direction:column;gap:8px;margin-top:auto;">
                  <button
                    type="button"
                    class="gov-btn gov-btn-primary gov-btn-sm"
                    style="width:100%;justify-content:center;"
                    onclick="openRequestDetails('${req.id}')"
                  >
                    <span class="material-symbols-outlined" style="font-size:16px;">visibility</span>
                    View Details &amp; Dispatch
                  </button>
                  <button
                    type="button"
                    class="gov-btn gov-btn-secondary gov-btn-sm"
                    style="width:100%;justify-content:center;"
                    onclick="window.showToast ? window.showToast({title:'Connecting Call', message:'Direct phone dial initiated with ${req.seniorCitizen} (${req.phone}).', type:'info'}) : alert('Calling ${req.phone}')"
                  >
                    <span class="material-symbols-outlined" style="font-size:16px;">call</span>
                    Call Citizen
                  </button>
                </div>
              </div>
            </div>
          </article>`;
        })
        .join('')
    : `
    <div style="text-align:center;padding:4rem 2rem;background:#ffffff;border-radius:16px;border:1px solid var(--gov-border);">
      <span class="material-symbols-outlined" style="font-size:48px;color:var(--gov-text-muted);display:block;margin-bottom:12px;">inbox</span>
      <h3 style="font-size:18px;font-weight:700;color:var(--gov-text-primary);margin:0;">No assistance requests match the filter</h3>
      <p style="font-size:14px;color:var(--gov-text-muted);margin-top:6px;">Try selecting "All" or clearing the search query.</p>
    </div>`;

  // 2. TABLE VIEW GENERATION
  const tableRows = requests.length > 0
    ? requests
        .map((req, index) => {
          const isEmergency = req.isEmergency || req.priority === 'EMERGENCY';
          const rowClass = isEmergency ? 'row--emergency' : '';

          const priorityPill = isEmergency
            ? `<span class="gov-pill gov-pill--emergency">EMERGENCY</span>`
            : req.priority === 'High'
            ? `<span class="gov-pill gov-pill--pending">High</span>`
            : `<span class="gov-pill gov-pill--neutral">Normal</span>`;

          const statusPill = isEmergency
            ? `<span class="gov-pill gov-pill--emergency">Active SOS</span>`
            : req.status === 'Pending'
            ? `<span class="gov-pill gov-pill--pending">Pending</span>`
            : req.status === 'Assigned'
            ? `<span class="gov-pill gov-pill--assigned">Assigned</span>`
            : `<span class="gov-pill gov-pill--completed">Completed</span>`;

          return `
          <tr class="${rowClass}" style="--row-i:${index};">
            <td><strong>${req.id}</strong></td>
            <td>
              <div style="font-weight:700;color:var(--gov-navy-primary);">${req.seniorCitizen}</div>
              <div style="font-size:var(--fs-xs);color:var(--gov-text-muted);">${req.phone}</div>
            </td>
            <td>
              <div style="font-weight:500;">${req.request}</div>
              <div style="font-size:var(--fs-xs);color:var(--gov-text-muted);">${req.quantity || ''}</div>
            </td>
            <td>${req.area || req.location}</td>
            <td>${priorityPill}</td>
            <td>
              <span style="font-weight:500;">${req.assignedVolunteer || 'Unassigned'}</span>
            </td>
            <td>${statusPill}</td>
            <td>
              <button
                type="button"
                class="gov-btn gov-btn-secondary gov-btn-sm"
                onclick="openRequestDetails('${req.id}')"
                title="View full request details"
              >
                <span class="material-symbols-outlined" style="font-size:16px;">visibility</span>
                View
              </button>
            </td>
          </tr>`;
        })
        .join('')
    : `
    <tr>
      <td colspan="8" style="text-align:center;padding:3rem 1rem;color:var(--gov-text-muted);">
        <span class="material-symbols-outlined" style="font-size:36px;display:block;margin-bottom:8px;">inbox</span>
        <strong>No assistance requests match the selected criteria.</strong>
      </td>
    </tr>`;

  const tableViewHtml = `
    <div class="gov-table-card">
      <div class="gov-table-responsive">
        <table class="gov-table">
          <thead>
            <tr>
              <th scope="col">Request ID</th>
              <th scope="col">Senior Citizen</th>
              <th scope="col">Request</th>
              <th scope="col">Location</th>
              <th scope="col">Priority</th>
              <th scope="col">Volunteer</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    </div>`;

  return `
  <!-- Sub-banner for Civic Command -->
  <div class="sub-banner">
    <div class="sub-banner__breadcrumb">
      <span class="text-label-status" style="color:#b0c9e8;font-weight:700;">CIVIC SERVICES DISPATCH</span>
      <span style="color:rgba(255,255,255,0.3);">•</span>
      <span class="text-label-md" style="color:#ffffff;font-weight:600;">UDUPI CIVIC COMMAND (SHIRVA PS / ZONE 4)</span>
      <span style="color:rgba(255,255,255,0.3);">•</span>
      <span class="badge" style="background:rgba(99,130,255,0.2);color:#ffffff;border:1px solid rgba(99,130,255,0.4);">LIVE BACKLOG</span>
    </div>
    <div class="sub-banner__actions">
      <button
        class="gov-btn gov-btn-secondary gov-btn-sm"
        onclick="window.showToast({title:'Helpline Synced', message:'Karnataka 14567 Direct Dial System synchronized.', type:'success'})"
      >
        <span class="material-symbols-outlined" style="font-size:16px;">cloud_sync</span>
        Sync Direct Dial (14567)
      </button>
      <button
        class="gov-btn gov-btn-primary gov-btn-sm"
        onclick="openRegisterCitizenModal()"
      >
        <span class="material-symbols-outlined" style="font-size:16px;">add_task</span>
        Manual Citizen Intake
      </button>
    </div>
  </div>

  <div class="gov-container">
    <!-- Page Header with Summary -->
    <div class="gov-page-header">
      <div>
        <h1 class="gov-page-title">Assistance Requests</h1>
        <p class="gov-page-subtitle">Track, filter, and dispatch volunteer assistance to registered senior citizens.</p>
      </div>
      <div>
        <span class="gov-pill gov-pill--neutral" style="font-size:13px;padding:6px 14px;background:#ffffff;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          Showing ${requests.length} of ${getRequests().length} Requests
        </span>
      </div>
    </div>

    <!-- Search, Filter & View Toggle Controls -->
    <div class="gov-filter-bar" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <!-- Search Input -->
      <div class="gov-search-box" style="flex:1;min-width:240px;">
        <span class="material-symbols-outlined gov-search-icon">search</span>
        <input
          type="text"
          id="requestsSearchInput"
          class="gov-search-input"
          placeholder="Search requests by ID, name, medicine, grocery..."
          value="${searchQuery}"
          oninput="handleRequestsSearch(this.value)"
        />
      </div>

      <!-- Filter Tabs -->
      <div class="gov-filter-group" role="tablist" aria-label="Filter requests by status">
        ${filterTabsHtml}
      </div>

      <!-- View Switcher (Cards vs Table) -->
      <div style="display:flex;align-items:center;background:#e2e8f0;padding:2px;border-radius:var(--radius-sm);gap:2px;">
        <button
          type="button"
          class="gov-filter-tab${viewMode === 'cards' ? ' active' : ''}"
          style="padding:5px 12px;font-size:12px;display:flex;align-items:center;gap:4px;"
          onclick="setRequestsViewMode('cards')"
          title="Grid of rich request cards"
        >
          <span class="material-symbols-outlined" style="font-size:16px;">grid_view</span>
          Cards
        </button>
        <button
          type="button"
          class="gov-filter-tab${viewMode === 'table' ? ' active' : ''}"
          style="padding:5px 12px;font-size:12px;display:flex;align-items:center;gap:4px;"
          onclick="setRequestsViewMode('table')"
          title="Compact table view"
        >
          <span class="material-symbols-outlined" style="font-size:16px;">table_rows</span>
          Table
        </button>
      </div>
    </div>

    <!-- Main Content: Cards Feed OR Table View -->
    <div style="margin-top:16px;">
      ${viewMode === 'cards' ? cardsHtml : tableViewHtml}
    </div>
  </div>`;
}
