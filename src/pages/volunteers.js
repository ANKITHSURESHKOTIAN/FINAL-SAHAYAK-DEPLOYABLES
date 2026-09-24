/**
 * SAHAYAK — Official Police & Community Assistance Portal
 * Volunteers Page — Vibrant, Colorful Volunteer Network Roster
 */

import { getVolunteers } from '../data/portalData.js';

export function renderVolunteersPage() {
  const volunteers = getVolunteers();
  const availableCount = volunteers.filter((v) => v.status === 'Available').length;
  const busyCount = volunteers.filter((v) => v.status === 'Busy').length;
  const offlineCount = volunteers.filter((v) => v.status === 'Offline').length;

  const avatarGradients = [
    'linear-gradient(135deg, #10b981 0%, #0dbfa8 100%)',
    'linear-gradient(135deg, #4f79ff 0%, #7c5cfc 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
  ];

  const tableRows = volunteers
    .map((v, index) => {
      const grad = avatarGradients[index % avatarGradients.length];
      const statusPill =
        v.status === 'Available'
          ? `<span class="gov-pill gov-pill--completed">Available on Field</span>`
          : v.status === 'Busy'
          ? `<span class="gov-pill gov-pill--assigned">On Active Run</span>`
          : `<span class="gov-pill gov-pill--neutral">Off-Duty</span>`;

      return `
      <tr style="--row-i:${index};">
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;border-radius:10px;background:${grad};color:#ffffff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,0.12);">
              ${v.name.charAt(0)}
            </div>
            <div>
              <div style="font-weight:700;color:var(--gov-navy-primary);">${v.name}</div>
              <div style="font-size:var(--fs-xs);color:var(--gov-text-muted);">${v.transit || 'Civic Volunteer'}</div>
            </div>
          </div>
        </td>
        <td>
          <a href="tel:${v.phone}" style="color:var(--accent-blue);font-weight:600;display:inline-flex;align-items:center;gap:4px;text-decoration:none;">
            <span class="material-symbols-outlined" style="font-size:15px;">call</span>
            ${v.phone}
          </a>
        </td>
        <td>
          <span style="display:inline-flex;align-items:center;gap:4px;font-weight:500;">
            <span class="material-symbols-outlined" style="font-size:15px;color:var(--accent-blue);">location_on</span>
            ${v.area}
          </span>
        </td>
        <td>${statusPill}</td>
        <td>
          <span style="display:inline-block;padding:3px 10px;background:#f0fdf4;border-radius:6px;font-weight:800;color:#15803d;border:1px solid #bbf7d0;">
            ${v.requestsCompleted} Tasks
          </span>
        </td>
        <td>
          <div style="display:flex;align-items:center;gap:6px;">
            <button
              type="button"
              class="gov-btn gov-btn-secondary gov-btn-sm"
              onclick="viewVolunteerProfile('${v.name}', '${v.phone}', '${v.area}', '${v.status}', '${v.requestsCompleted}')"
              title="View volunteer details"
            >
              View Profile
            </button>
            <button
              type="button"
              class="gov-btn gov-btn-primary gov-btn-sm"
              onclick="assignRequestToVolunteer('${v.name}')"
              title="Assign an open request to this volunteer"
            >
              <span class="material-symbols-outlined" style="font-size:15px;">assignment_ind</span>
              Assign
            </button>
          </div>
        </td>
      </tr>`;
    })
    .join('');

  return `
  <div class="gov-container">
    <!-- Page Header -->
    <div class="gov-page-header">
      <div>
        <h1 class="gov-page-title">Civic Volunteer Network</h1>
        <p class="gov-page-subtitle">Verified community volunteers registered with Shirva Police Station Sector.</p>
      </div>
      <div>
        <span class="gov-pill gov-pill--completed" style="font-size:13px;padding:6px 14px;background:#ecfdf5;box-shadow:0 2px 8px rgba(16,185,129,0.15);">
          ${availableCount} Active &amp; Ready on Field
        </span>
      </div>
    </div>

    <!-- 4 Colorful Metric Cards -->
    <div class="gov-stats-grid" style="margin-bottom:24px;">
      <div class="gov-stat-box">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">Total Registered Cadre</span>
          <span class="material-symbols-outlined" style="font-size:24px;">groups</span>
        </div>
        <div class="gov-stat-box__value">${volunteers.length}</div>
        <div class="gov-stat-box__sub">Police Background Checked</div>
      </div>

      <div class="gov-stat-box" style="background:linear-gradient(135deg, #059669 0%, #0284c7 100%) !important;">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">Available On-Call</span>
          <span class="material-symbols-outlined" style="font-size:24px;">how_to_reg</span>
        </div>
        <div class="gov-stat-box__value">${availableCount}</div>
        <div class="gov-stat-box__sub">Avg dispatch time: 4.2m</div>
      </div>

      <div class="gov-stat-box" style="background:linear-gradient(135deg, #4f79ff 0%, #7c5cfc 100%) !important;">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">On Active Run</span>
          <span class="material-symbols-outlined" style="font-size:24px;">directions_run</span>
        </div>
        <div class="gov-stat-box__value">${busyCount}</div>
        <div class="gov-stat-box__sub">Delivering aid or medicine</div>
      </div>

      <div class="gov-stat-box" style="background:linear-gradient(135deg, #64748b 0%, #475569 100%) !important;">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">Off-Duty Cadre</span>
          <span class="material-symbols-outlined" style="font-size:24px;">schedule</span>
        </div>
        <div class="gov-stat-box__value">${offlineCount}</div>
        <div class="gov-stat-box__sub">Resting / Night shift</div>
      </div>
    </div>

    <!-- Volunteers Table Card -->
    <div class="gov-table-card">
      <div class="gov-table-card__header">
        <div>
          <h2 class="gov-table-card__title">Registered Volunteer Network (${volunteers.length})</h2>
          <span style="font-size:var(--fs-xs);color:var(--gov-text-muted);">Karnataka Police Civic Volunteer Cadre — Zone 4 Roster</span>
        </div>
      </div>

      <div class="gov-table-responsive">
        <table class="gov-table">
          <thead>
            <tr>
              <th scope="col">Volunteer Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Assigned Area</th>
              <th scope="col">Current Status</th>
              <th scope="col">Missions Completed</th>
              <th scope="col">Dispatch Action</th>
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
