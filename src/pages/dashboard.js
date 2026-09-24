/**
 * SAHAYAK — Official Police & Community Assistance Portal
 * Dashboard Page
 * 
 * Shows immediately what is happening:
 * - Greeting + today's assistance overview
 * - 4 Key rectangular statistic boxes
 * - AI Voice Helpline section
 * - Recent Requests simple table
 */

import { getRequests, PORTAL_METRICS, AI_HELPLINE_DATA } from '../data/portalData.js';

export function renderDashboardPage() {
  const requests = getRequests();
  // Take top 5 recent requests
  const recentRequests = requests.slice(0, 5);

  const tableRows = recentRequests
    .map((req, index) => {
      const isEmergency = req.isEmergency || req.priority === 'EMERGENCY';
      const rowClass = isEmergency ? 'row--emergency' : '';

      // Priority pill
      const priorityPill = isEmergency
        ? `<span class="gov-pill gov-pill--emergency">EMERGENCY</span>`
        : req.priority === 'High'
        ? `<span class="gov-pill gov-pill--pending">High</span>`
        : `<span class="gov-pill gov-pill--neutral">Normal</span>`;

      // Status pill
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
          <div style="font-weight:600;color:var(--gov-navy-primary);">${req.seniorCitizen}</div>
          <div style="font-size:var(--fs-xs);color:var(--gov-text-muted);">${req.phone}</div>
        </td>
        <td>${req.request}</td>
        <td>${req.area || req.location}</td>
        <td>${priorityPill}</td>
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
    .join('');

  return `
  <div class="gov-container">
    <!-- Top Greeting Section -->
    <div class="gov-page-header">
      <div>
        <h1 class="gov-page-title">Good Morning</h1>
        <p class="gov-page-subtitle">Here's today's assistance overview for Shirva Police Station jurisdiction.</p>
      </div>
      <div>
        <span class="gov-pill gov-pill--neutral" style="font-size:13px;padding:6px 12px;">
          <span class="material-symbols-outlined" style="font-size:16px;color:var(--gov-navy-primary);">calendar_today</span>
          Today, 13 September 2026
        </span>
      </div>
    </div>

    <!-- 4 Important Rectangular Statistics Boxes -->
    <div class="gov-stats-grid" role="region" aria-label="Key Operational Metrics">
      <!-- 1. Total Requests -->
      <div class="gov-stat-box">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">Total Requests</span>
          <span class="material-symbols-outlined" style="color:#ffffff;font-size:24px;">assignment</span>
        </div>
        <div class="gov-stat-box__value">${PORTAL_METRICS.totalRequests}</div>
        <div class="gov-stat-box__sub">Logged across helpline &amp; desk</div>
      </div>

      <!-- 2. Pending Requests -->
      <div class="gov-stat-box">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">Pending Requests</span>
          <span class="material-symbols-outlined" style="color:#ffffff;font-size:24px;">hourglass_top</span>
        </div>
        <div class="gov-stat-box__value">${PORTAL_METRICS.pendingRequests}</div>
        <div class="gov-stat-box__sub">Awaiting volunteer assignment</div>
      </div>

      <!-- 3. Active Volunteers -->
      <div class="gov-stat-box">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">Active Volunteers</span>
          <span class="material-symbols-outlined" style="color:#ffffff;font-size:24px;">groups</span>
        </div>
        <div class="gov-stat-box__value">${PORTAL_METRICS.activeVolunteers}</div>
        <div class="gov-stat-box__sub">Verified &amp; on-call in sector</div>
      </div>

      <!-- 4. Emergency Requests -->
      <div class="gov-stat-box gov-stat-box--emergency">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">Emergency Requests</span>
          <div class="emergency-beacon-wrap" title="Active SOS emergency radar">
            <span class="emergency-beacon-ring" style="border-color:rgba(255,255,255,0.8);"></span>
            <span class="emergency-beacon-ring" style="border-color:rgba(255,255,255,0.4);"></span>
            <span class="material-symbols-outlined emergency-beacon-icon" style="font-size:24px;color:#ffffff;">crisis_alert</span>
          </div>
        </div>
        <div class="gov-stat-box__value">${PORTAL_METRICS.emergencyRequests}</div>
        <div class="gov-stat-box__sub" style="color:#ffffff;font-weight:700;display:flex;align-items:center;gap:6px;">
          <span class="gov-status-dot" style="background-color:#ffffff;width:7px;height:7px;"></span>
          Immediate action required
        </div>
      </div>
    </div>

    <!-- Small AI Voice Helpline Section with Live Soundwave -->
    <div class="gov-helpline-card" role="region" aria-label="AI Voice Helpline Overview">
      <div class="gov-helpline-info">
        <div class="gov-helpline-title-block">
          <div class="gov-helpline-title" style="display:flex;align-items:center;gap:8px;">
            <span class="gov-status-dot" aria-hidden="true"></span>
            <span>AI Voice Helpline</span>
            <div class="gov-soundwave" title="Live audio stream monitoring">
              <span class="soundwave-bar"></span>
              <span class="soundwave-bar"></span>
              <span class="soundwave-bar"></span>
              <span class="soundwave-bar"></span>
              <span class="soundwave-bar"></span>
            </div>
          </div>
          <span class="gov-helpline-number">${AI_HELPLINE_DATA.helplineNumber}</span>
        </div>

        <div class="gov-helpline-stats">
          <div class="gov-helpline-stat-item">
            <span class="gov-helpline-stat-num">${AI_HELPLINE_DATA.callsToday}</span>
            <span class="gov-helpline-stat-lbl">Calls Today</span>
          </div>
          <div class="gov-helpline-stat-item">
            <span class="gov-helpline-stat-num">${AI_HELPLINE_DATA.requestsGenerated}</span>
            <span class="gov-helpline-stat-lbl">Requests Generated</span>
          </div>
          <div class="gov-helpline-stat-item">
            <span class="gov-helpline-stat-num" style="color:var(--gov-success-green);">Online</span>
            <span class="gov-helpline-stat-lbl">IVR Gateway Status</span>
          </div>
        </div>
      </div>

      <div>
        <button
          type="button"
          class="gov-btn gov-btn-secondary"
          onclick="openCallHistoryModal()"
          title="Open today's helpline call logs"
        >
          <span class="material-symbols-outlined" style="font-size:18px;">history</span>
          View Call History
        </button>
      </div>
    </div>

    <!-- Recent Requests Section -->
    <div class="gov-table-card">
      <div class="gov-table-card__header">
        <div>
          <h2 class="gov-table-card__title">Recent Requests</h2>
          <span style="font-size:var(--fs-xs);color:var(--gov-text-muted);">Latest incoming citizen requirements</span>
        </div>
        <button
          type="button"
          class="gov-btn gov-btn-primary gov-btn-sm"
          onclick="navigate('requests')"
        >
          <span>View All Requests</span>
          <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
        </button>
      </div>

      <div class="gov-table-responsive">
        <table class="gov-table">
          <thead>
            <tr>
              <th scope="col">Request ID</th>
              <th scope="col">Senior Citizen</th>
              <th scope="col">Request</th>
              <th scope="col">Location</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}
