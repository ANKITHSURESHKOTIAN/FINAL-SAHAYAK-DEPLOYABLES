/**
 * SAHAYAK — Official Police & Community Assistance Portal
 * Modal Component — Clean, Accessible Modals
 * - Request Details Modal
 * - AI Voice Helpline Call History Modal
 * - Register Senior Citizen Modal
 */

import { getRequestById, getAvailableVolunteers, AI_HELPLINE_DATA } from '../data/portalData.js';

export function renderModals() {
  return `
  <!-- 1. Request Details Modal -->
  <div
    class="gov-modal-backdrop"
    id="requestDetailsModal"
    hidden
    role="dialog"
    aria-modal="true"
    aria-labelledby="reqModalTitle"
  >
    <div class="gov-modal" role="document">
      <div class="gov-modal__header">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="material-symbols-outlined" style="font-size:22px;">assignment</span>
          <h2 class="gov-modal__title" id="reqModalTitle">Request Details</h2>
        </div>
        <button
          type="button"
          class="gov-modal__close"
          onclick="closeRequestDetailsModal()"
          aria-label="Close dialog"
        >
          <span class="material-symbols-outlined" style="font-size:24px;">close</span>
        </button>
      </div>

      <div class="gov-modal__body" id="reqModalBody">
        <!-- Injected dynamically by openRequestDetails() -->
      </div>

      <div class="gov-modal__footer" id="reqModalFooter">
        <!-- Actions injected dynamically -->
      </div>
    </div>
  </div>

  <!-- 2. AI Voice Helpline Call History Modal -->
  <div
    class="gov-modal-backdrop"
    id="callHistoryModal"
    hidden
    role="dialog"
    aria-modal="true"
    aria-labelledby="callHistoryTitle"
  >
    <div class="gov-modal" style="max-width:760px;" role="document">
      <div class="gov-modal__header">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="material-symbols-outlined" style="font-size:22px;">phone_in_talk</span>
          <h2 class="gov-modal__title" id="callHistoryTitle">AI Voice Helpline — Today's Call History</h2>
        </div>
        <button
          type="button"
          class="gov-modal__close"
          onclick="closeCallHistoryModal()"
          aria-label="Close dialog"
        >
          <span class="material-symbols-outlined" style="font-size:24px;">close</span>
        </button>
      </div>

      <div class="gov-modal__body">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--gov-border);padding-bottom:12px;">
          <div>
            <span style="font-size:var(--fs-sm);color:var(--gov-text-muted);">Toll-Free Helpline:</span>
            <strong style="color:var(--gov-navy-primary);font-size:var(--fs-md);margin-left:6px;">1800-425-14567</strong>
          </div>
          <div>
            <span class="gov-status-dot"></span>
            <span style="font-size:var(--fs-sm);font-weight:700;color:var(--gov-success-green);margin-left:4px;">Helpline Active &amp; Logging</span>
          </div>
        </div>

        <div class="gov-table-responsive">
          <table class="gov-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Caller</th>
                <th>Language</th>
                <th>Request</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${AI_HELPLINE_DATA.callLogs
                .map(
                  (log) => `
              <tr>
                <td><strong>${log.time}</strong></td>
                <td>${log.caller}</td>
                <td>${log.language}</td>
                <td>${log.request}</td>
                <td>
                  <span class="gov-pill ${log.status.includes('Emergency') ? 'gov-pill--emergency' : 'gov-pill--neutral'}">
                    ${log.status}
                  </span>
                </td>
              </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="gov-modal__footer">
        <button type="button" class="gov-btn gov-btn-secondary" onclick="closeCallHistoryModal()">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- 3. Register Senior Citizen Modal -->
  <div
    class="gov-modal-backdrop"
    id="registerCitizenModal"
    hidden
    role="dialog"
    aria-modal="true"
    aria-labelledby="regCitizenTitle"
  >
    <div class="gov-modal" role="document">
      <div class="gov-modal__header">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="material-symbols-outlined" style="font-size:22px;">person_add</span>
          <h2 class="gov-modal__title" id="regCitizenTitle">Register Senior Citizen</h2>
        </div>
        <button
          type="button"
          class="gov-modal__close"
          onclick="closeRegisterCitizenModal()"
          aria-label="Close dialog"
        >
          <span class="material-symbols-outlined" style="font-size:24px;">close</span>
        </button>
      </div>

      <form id="registerCitizenForm" onsubmit="handleCitizenFormSubmit(event)">
        <div class="gov-modal__body">
          <div class="gov-form-group">
            <label class="gov-form-label" for="citizenName">Full Name *</label>
            <input type="text" id="citizenName" class="gov-form-input" placeholder="e.g. Anand Shenoy" required />
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);">
            <div class="gov-form-group">
              <label class="gov-form-label" for="citizenAge">Age *</label>
              <input type="number" id="citizenAge" class="gov-form-input" min="60" max="110" placeholder="e.g. 74" required />
            </div>
            <div class="gov-form-group">
              <label class="gov-form-label" for="citizenPhone">Phone Number *</label>
              <input type="tel" id="citizenPhone" class="gov-form-input" placeholder="e.g. +91 98450 00000" required />
            </div>
          </div>

          <div class="gov-form-group">
            <label class="gov-form-label" for="citizenArea">Area / Address *</label>
            <input type="text" id="citizenArea" class="gov-form-input" placeholder="e.g. Shirva Main Road, Near Post Office" required />
          </div>

          <div class="gov-form-group">
            <label class="gov-form-label" for="citizenContact">Emergency Contact (Relation &amp; Phone) *</label>
            <input type="text" id="citizenContact" class="gov-form-input" placeholder="e.g. Daughter (Geetha): +91 99802 33445" required />
          </div>

          <div class="gov-form-group">
            <label class="gov-form-label" for="citizenNotes">Special Notes (Living Alone, Medical, Mobility)</label>
            <textarea id="citizenNotes" class="gov-form-textarea" placeholder="e.g. Lives alone, mild knee arthritis, requires morning milk assistance."></textarea>
          </div>
        </div>

        <div class="gov-modal__footer">
          <button type="button" class="gov-btn gov-btn-secondary" onclick="closeRegisterCitizenModal()">
            Cancel
          </button>
          <button type="submit" class="gov-btn gov-btn-primary">
            <span class="material-symbols-outlined" style="font-size:18px;">how_to_reg</span>
            Register Citizen
          </button>
        </div>
      </form>
    </div>
  </div>`;
}

/**
 * Build and populate the Request Details modal content
 */
export function buildRequestDetailsHtml(req) {
  const isEmergency = req.isEmergency || req.priority === 'EMERGENCY';

  // Emergency banner
  const emergencyBanner = isEmergency
    ? `
    <div class="gov-emergency-banner" role="alert">
      <span class="material-symbols-outlined" style="font-size:28px;">crisis_alert</span>
      <div>
        <div>EMERGENCY REQUEST — IMMEDIATE POLICE &amp; MEDICAL ACTION REQUIRED</div>
        <div style="font-size:12px;font-weight:500;text-transform:none;margin-top:2px;">
          Logged via SAHAYAK AI Voice Helpline with high-urgency distress priority.
        </div>
      </div>
    </div>`
    : '';

  // Nearby shops html
  const shopsHtml = req.nearbyShops && req.nearbyShops.length > 0
    ? req.nearbyShops
        .map(
          (s) => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px dashed var(--gov-border-subtle);font-size:var(--fs-sm);">
          <div>
            <strong>${s.name}</strong> (${s.distance})
          </div>
          <span class="gov-pill gov-pill--neutral">${s.availability}</span>
        </div>`
        )
        .join('')
    : '<div style="font-size:var(--fs-sm);color:var(--gov-text-muted);">No nearby registered vendors recorded.</div>';

  const bodyHtml = `
  ${emergencyBanner}

  <!-- Senior Citizen Section -->
  <div class="gov-info-block">
    <div class="gov-info-block__title">
      <span class="material-symbols-outlined" style="font-size:18px;">elderly</span>
      Senior Citizen Details
    </div>
    <div class="gov-info-grid">
      <div class="gov-info-item">
        <span class="gov-info-item__label">Full Name &amp; Age</span>
        <span class="gov-info-item__val">${req.seniorCitizen} (${req.age} yrs)</span>
      </div>
      <div class="gov-info-item">
        <span class="gov-info-item__label">Phone Number</span>
        <span class="gov-info-item__val">
          <a href="tel:${req.phone}" style="color:var(--gov-navy-primary);text-decoration:underline;">${req.phone}</a>
        </span>
      </div>
      <div class="gov-info-item" style="grid-column:1/-1;">
        <span class="gov-info-item__label">Residence Location</span>
        <span class="gov-info-item__val">${req.location}</span>
      </div>
    </div>
  </div>

  <!-- Request Section -->
  <div class="gov-info-block">
    <div class="gov-info-block__title">
      <span class="material-symbols-outlined" style="font-size:18px;">shopping_bag</span>
      Request Information
    </div>
    <div class="gov-info-grid">
      <div class="gov-info-item">
        <span class="gov-info-item__label">What is Needed</span>
        <span class="gov-info-item__val">${req.request}</span>
      </div>
      <div class="gov-info-item">
        <span class="gov-info-item__label">Quantity</span>
        <span class="gov-info-item__val">${req.quantity}</span>
      </div>
      <div class="gov-info-item" style="grid-column:1/-1;">
        <span class="gov-info-item__label">Brand / Preference / Medical Verification</span>
        <span class="gov-info-item__val">${req.brandPreference}</span>
      </div>
    </div>
  </div>

  <!-- AI Call Summary -->
  <div class="gov-info-block" style="background-color:var(--gov-bg-subtle);">
    <div class="gov-info-block__title">
      <span class="material-symbols-outlined" style="font-size:18px;">support_agent</span>
      AI Call Summary
    </div>
    <p style="font-size:var(--fs-base);color:var(--gov-text-primary);line-height:1.5;margin:0 0 8px 0;">
      ${req.aiSummary}
    </p>
    ${
      req.kannadaAudioTranscript
        ? `<div style="font-size:var(--fs-sm);color:var(--gov-text-secondary);font-style:italic;background:#ffffff;border:1px solid var(--gov-border-subtle);padding:8px 12px;border-radius:var(--radius-sm);">
            <strong>Caller audio transcript (Kannada):</strong> "${req.kannadaAudioTranscript}"
          </div>`
        : ''
    }
  </div>

  <!-- Nearby Shops -->
  <div class="gov-info-block">
    <div class="gov-info-block__title">
      <span class="material-symbols-outlined" style="font-size:18px;">storefront</span>
      Nearby Registered Vendors &amp; Facilities
    </div>
    ${shopsHtml}
  </div>

  <!-- Volunteer Section -->
  <div class="gov-info-block">
    <div class="gov-info-block__title">
      <span class="material-symbols-outlined" style="font-size:18px;">groups</span>
      Assigned Volunteer Details
    </div>
    <div class="gov-info-grid">
      <div class="gov-info-item">
        <span class="gov-info-item__label">Assigned Volunteer</span>
        <span class="gov-info-item__val">${req.assignedVolunteer}</span>
      </div>
      <div class="gov-info-item">
        <span class="gov-info-item__label">Volunteer Contact</span>
        <span class="gov-info-item__val">${req.volunteerPhone}</span>
      </div>
      <div class="gov-info-item" style="grid-column:1/-1;">
        <span class="gov-info-item__label">Assignment Status</span>
        <span class="gov-info-item__val">${req.volunteerStatus}</span>
      </div>
    </div>
  </div>`;

  const footerHtml = `
  <button
    type="button"
    class="gov-btn gov-btn-secondary"
    onclick="callSeniorCitizen('${req.phone}', '${req.seniorCitizen}')"
  >
    <span class="material-symbols-outlined" style="font-size:18px;">call</span>
    Call Senior Citizen
  </button>

  <button
    type="button"
    class="gov-btn gov-btn-primary"
    onclick="promptAssignVolunteer('${req.id}')"
  >
    <span class="material-symbols-outlined" style="font-size:18px;">person_add</span>
    Assign Volunteer
  </button>

  <button
    type="button"
    class="gov-btn gov-btn-success"
    onclick="markRequestCompleted('${req.id}')"
  >
    <span class="material-symbols-outlined" style="font-size:18px;">task_alt</span>
    Mark as Completed
  </button>`;

  return { bodyHtml, footerHtml };
}
