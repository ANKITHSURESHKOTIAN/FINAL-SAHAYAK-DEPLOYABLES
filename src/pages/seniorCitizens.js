/**
 * SAHAYAK — Official Police & Community Assistance Portal
 * Senior Citizens Page — Vibrant, Colorful Citizen Registry
 */

import { getSeniorCitizens } from '../data/portalData.js';

export function renderSeniorCitizensPage() {
  const citizens = getSeniorCitizens();
  const alertCount = citizens.filter((c) => c.status.includes('Alert') || c.status.includes('Welfare')).length;
  const activeCount = citizens.length - alertCount;

  const avatarGradients = [
    'linear-gradient(135deg, #4f79ff 0%, #7c5cfc 100%)',
    'linear-gradient(135deg, #10b981 0%, #0dbfa8 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  ];

  const tableRows = citizens
    .map((c, index) => {
      const isAlert = c.status.includes('Alert') || c.status.includes('Welfare');
      const grad = avatarGradients[index % avatarGradients.length];
      const statusPill = isAlert
        ? `<span class="gov-pill gov-pill--emergency">${c.status}</span>`
        : `<span class="gov-pill gov-pill--completed">Active Care</span>`;

      return `
      <tr style="--row-i:${index};">
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;border-radius:10px;background:${grad};color:#ffffff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,0.12);">
              ${c.name.charAt(0)}
            </div>
            <div>
              <div style="font-weight:700;color:var(--gov-navy-primary);">${c.name}</div>
              <div style="font-size:var(--fs-xs);color:var(--gov-text-muted);">${c.age ? `${c.age} years old` : 'Senior Citizen'}</div>
            </div>
          </div>
        </td>
        <td>
          <a href="tel:${c.phone}" style="color:var(--accent-blue);font-weight:600;display:inline-flex;align-items:center;gap:4px;text-decoration:none;">
            <span class="material-symbols-outlined" style="font-size:15px;">call</span>
            ${c.phone}
          </a>
        </td>
        <td>
          <span style="display:inline-flex;align-items:center;gap:4px;font-weight:500;">
            <span class="material-symbols-outlined" style="font-size:15px;color:var(--accent-blue);">location_on</span>
            ${c.area}
          </span>
        </td>
        <td>
          <span style="font-family:var(--font-family-sans);font-weight:800;color:var(--gov-navy-primary);background:#f0f2ff;padding:3px 8px;border-radius:6px;border:1px solid #c7d2fe;">${c.sahayakId}</span>
        </td>
        <td>
          <div style="font-size:var(--fs-sm);color:var(--gov-text-secondary);">${c.emergencyContact}</div>
        </td>
        <td>${statusPill}</td>
      </tr>`;
    })
    .join('');

  return `
  <div class="gov-container">
    <!-- Page Header with Registration Button -->
    <div class="gov-page-header">
      <div>
        <h1 class="gov-page-title">Senior Citizens Registry</h1>
        <p class="gov-page-subtitle">Verified senior citizens enrolled under Shirva Police Station Community Care Network.</p>
      </div>
      <div>
        <button
          type="button"
          class="gov-btn gov-btn-primary"
          onclick="openRegisterCitizenModal()"
          title="Add a new senior citizen to the registry"
        >
          <span class="material-symbols-outlined" style="font-size:20px;">person_add</span>
          + Register Senior Citizen
        </button>
      </div>
    </div>

    <!-- 4 Colorful Metric Cards -->
    <div class="gov-stats-grid" style="margin-bottom:24px;">
      <div class="gov-stat-box">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">Enrolled Citizens</span>
          <span class="material-symbols-outlined" style="font-size:24px;">elderly</span>
        </div>
        <div class="gov-stat-box__value">${citizens.length}</div>
        <div class="gov-stat-box__sub">Shirva &amp; Manipal Sector</div>
      </div>

      <div class="gov-stat-box" style="background:linear-gradient(135deg, #059669 0%, #0284c7 100%) !important;">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">Active Normal Care</span>
          <span class="material-symbols-outlined" style="font-size:24px;">health_and_safety</span>
        </div>
        <div class="gov-stat-box__value">${activeCount}</div>
        <div class="gov-stat-box__sub">Stable &amp; Checked</div>
      </div>

      <div class="gov-stat-box" style="background:linear-gradient(135deg, #d97706 0%, #ea580c 100%) !important;">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">Priority Welfare Follow-ups</span>
          <span class="material-symbols-outlined" style="font-size:24px;">notification_important</span>
        </div>
        <div class="gov-stat-box__value">${alertCount}</div>
        <div class="gov-stat-box__sub">Requires Field Beat Visit</div>
      </div>

      <div class="gov-stat-box gov-stat-box--emergency">
        <div class="gov-stat-box__header">
          <span class="gov-stat-box__label">SOS Panic Monitored</span>
          <span class="material-symbols-outlined" style="font-size:24px;">crisis_alert</span>
        </div>
        <div class="gov-stat-box__value">2</div>
        <div class="gov-stat-box__sub">Direct Police Dial Active</div>
      </div>
    </div>

    <!-- Citizens Table Card -->
    <div class="gov-table-card">
      <div class="gov-table-card__header">
        <div>
          <h2 class="gov-table-card__title">Registered Beneficiaries (${citizens.length})</h2>
          <span style="font-size:var(--fs-xs);color:var(--gov-text-muted);">Priority assistance &amp; daily welfare check registry</span>
        </div>
      </div>

      <div class="gov-table-responsive">
        <table class="gov-table">
          <thead>
            <tr>
              <th scope="col">Name &amp; Age</th>
              <th scope="col">Phone</th>
              <th scope="col">Area</th>
              <th scope="col">Sahayak ID</th>
              <th scope="col">Emergency Contact</th>
              <th scope="col">Status</th>
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
