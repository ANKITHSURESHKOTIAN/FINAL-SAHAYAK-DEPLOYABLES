/**
 * SAHAYAK — Official Police & Community Assistance Portal
 * Emergency Page — High-Urgency Dispatch & Action Desk
 * 
 * Title: "Emergency Assistance"
 * Section: "Active Emergencies"
 * Displays only active emergencies with prominent actions:
 * [View Location] [Call] [Assign] [Mark Resolved]
 */

import { getActiveEmergencies } from '../data/portalData.js';

export function renderEmergencyPage() {
  const emergencies = getActiveEmergencies();

  const emergencyCards = emergencies.length > 0
    ? emergencies
        .map((em) => {
          return `
          <div class="gov-table-card" style="border:2px solid var(--gov-emergency-red);margin-bottom:var(--space-5);background:#ffffff;box-shadow:0 4px 20px rgba(239,68,68,0.15);">
            <!-- Emergency Header Banner -->
            <div style="background-color:var(--gov-emergency-red);color:#ffffff;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
              <div style="display:flex;align-items:center;gap:12px;">
                <div class="emergency-beacon-wrap" title="Active GPS SOS Tracking">
                  <span class="emergency-beacon-ring" style="border-color:rgba(255,255,255,0.85);"></span>
                  <span class="emergency-beacon-ring" style="border-color:rgba(255,255,255,0.5);"></span>
                  <span class="material-symbols-outlined emergency-beacon-icon" style="font-size:24px;color:#ffffff;">crisis_alert</span>
                </div>
                <span style="font-family:var(--font-family-sans);font-weight:800;letter-spacing:0.04em;">
                  ACTIVE EMERGENCY — ${em.id}
                </span>
              </div>
              <span class="gov-pill gov-pill--emergency" style="background:#ffffff;color:var(--gov-emergency-red);font-weight:800;">
                Logged ${em.timestamp}
              </span>
            </div>

            <!-- Emergency Details Body -->
            <div style="padding:var(--space-5);display:flex;flex-direction:column;gap:var(--space-4);">
              <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:var(--space-4);">
                <div class="gov-info-item">
                  <span class="gov-info-item__label">Senior Citizen</span>
                  <span class="gov-info-item__val" style="font-size:18px;color:var(--gov-navy-primary);">
                    ${em.seniorCitizen} (${em.age} yrs)
                  </span>
                  <span style="font-size:var(--fs-sm);color:var(--gov-text-muted);">${em.phone}</span>
                </div>

                <div class="gov-info-item">
                  <span class="gov-info-item__label">Emergency Type</span>
                  <span class="gov-info-item__val" style="color:var(--gov-emergency-red);font-size:16px;">
                    ${em.request}
                  </span>
                  <span style="font-size:var(--fs-xs);color:var(--gov-text-muted);">${em.category}</span>
                </div>

                <div class="gov-info-item">
                  <span class="gov-info-item__label">Location</span>
                  <span class="gov-info-item__val">${em.location}</span>
                </div>

                <div class="gov-info-item">
                  <span class="gov-info-item__label">Assigned Officer / Volunteer</span>
                  <span class="gov-info-item__val" style="color:var(--gov-navy-primary);">
                    ${em.assignedVolunteer}
                  </span>
                  <span style="font-size:var(--fs-xs);color:var(--gov-text-muted);">${em.volunteerStatus}</span>
                </div>
              </div>

              <!-- AI Distress Synopsis -->
              <div style="background-color:var(--gov-emergency-bg);border:1px solid var(--gov-emergency-border);border-radius:var(--radius-sm);padding:12px 16px;">
                <div style="font-size:var(--fs-xs);font-weight:700;color:var(--gov-emergency-red);text-transform:uppercase;margin-bottom:4px;">
                  AI Helpline Audio Distress Log:
                </div>
                <div style="font-size:var(--fs-base);color:#7f1d1d;line-height:1.4;">
                  ${em.aiSummary}
                </div>
                ${
                  em.kannadaAudioTranscript
                    ? `<div style="font-size:var(--fs-sm);color:#991b1b;font-style:italic;margin-top:6px;">
                        "${em.kannadaAudioTranscript}"
                      </div>`
                    : ''
                }
              </div>

              <!-- Prominent Actions: [View Location] [Call] [Assign] [Mark Resolved] -->
              <div style="display:flex;align-items:center;justify-content:flex-end;gap:var(--space-3);flex-wrap:wrap;border-top:1px solid var(--gov-border-subtle);padding-top:var(--space-4);">
                <button
                  type="button"
                  class="gov-btn gov-btn-secondary"
                  onclick="viewEmergencyLocation('${em.id}', '${em.location}')"
                  title="View GPS address and vicinity map"
                >
                  <span class="material-symbols-outlined" style="font-size:18px;">near_me</span>
                  View Location
                </button>

                <button
                  type="button"
                  class="gov-btn gov-btn-secondary"
                  onclick="callSeniorCitizen('${em.phone}', '${em.seniorCitizen}')"
                  title="Direct call to citizen"
                >
                  <span class="material-symbols-outlined" style="font-size:18px;">call</span>
                  Call
                </button>

                <button
                  type="button"
                  class="gov-btn gov-btn-primary"
                  onclick="promptAssignVolunteer('${em.id}')"
                  title="Assign police patrol or nearest volunteer"
                >
                  <span class="material-symbols-outlined" style="font-size:18px;">person_add</span>
                  Assign
                </button>

                <button
                  type="button"
                  class="gov-btn gov-btn-success"
                  onclick="markEmergencyResolved('${em.id}')"
                  title="Mark emergency as resolved and log resolution"
                >
                  <span class="material-symbols-outlined" style="font-size:18px;">check_circle</span>
                  Mark Resolved
                </button>
              </div>
            </div>
          </div>`;
        })
        .join('')
    : `
    <div class="gov-table-card" style="padding:3rem 1.5rem;text-align:center;">
      <span class="material-symbols-outlined" style="font-size:48px;color:var(--gov-success-green);display:block;margin-bottom:12px;">verified</span>
      <h2 style="font-family:var(--font-family-sans);font-size:20px;font-weight:700;color:var(--gov-navy-primary);margin:0 0 6px 0;">
        No Active Emergencies
      </h2>
      <p style="font-size:var(--fs-base);color:var(--gov-text-muted);margin:0;">
        All senior citizen SOS alerts and critical medical calls have been attended to and marked resolved.
      </p>
    </div>`;

  return `
  <div class="gov-container">
    <!-- Page Header -->
    <div class="gov-page-header">
      <div>
        <h1 class="gov-page-title">Emergency Assistance</h1>
        <p class="gov-page-subtitle">Immediate response dashboard for high-urgency medical, fall, and distress SOS incidents.</p>
      </div>
      <div>
        <span class="gov-pill gov-pill--emergency" style="font-size:14px;padding:8px 16px;">
          <span class="material-symbols-outlined" style="font-size:18px;">warning</span>
          ${emergencies.length} Active Emergencies Requiring Response
        </span>
      </div>
    </div>

    <!-- Active Emergencies Section -->
    <div style="margin-top:var(--space-2);">
      <h2 style="font-family:var(--font-family-sans);font-size:var(--fs-lg);font-weight:800;color:var(--gov-navy-primary);margin-bottom:var(--space-4);">
        Active Emergencies
      </h2>

      ${emergencyCards}
    </div>
  </div>`;
}
