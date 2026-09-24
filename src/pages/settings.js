/**
 * SAHAYAK — Official Police & Community Assistance Portal
 * Settings Page — Police Station & Operating Configuration
 */

export function renderSettingsPage() {
  return `
  <div class="gov-container">
    <div class="gov-page-header">
      <div>
        <h1 class="gov-page-title">Portal Settings</h1>
        <p class="gov-page-subtitle">Configure police station node, helpline routing, and emergency alert protocols.</p>
      </div>
    </div>

    <div class="gov-table-card" style="padding:var(--space-5);margin-bottom:var(--space-5);">
      <h2 style="font-family:var(--font-family-sans);font-size:var(--fs-lg);font-weight:700;color:var(--gov-navy-primary);margin:0 0 1rem 0;border-bottom:1px solid var(--gov-border-subtle);padding-bottom:8px;">
        Police Station Node Configuration
      </h2>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:var(--space-4);">
        <div class="gov-form-group">
          <label class="gov-form-label">Station Name</label>
          <input type="text" class="gov-form-input" value="Shirva Police Station (Udupi District)" readonly />
        </div>

        <div class="gov-form-group">
          <label class="gov-form-label">Node Identifier</label>
          <input type="text" class="gov-form-input" value="UDUPI-SHIRVA-POLICE-01" readonly />
        </div>

        <div class="gov-form-group">
          <label class="gov-form-label">Station Landline / Control Room</label>
          <input type="text" class="gov-form-input" value="0820-2554100 / 112" readonly />
        </div>

        <div class="gov-form-group">
          <label class="gov-form-label">Station Officer-in-Charge</label>
          <input type="text" class="gov-form-input" value="Inspector R. Nayak (Badge #KA-POL-8491)" readonly />
        </div>
      </div>
    </div>

    <div class="gov-table-card" style="padding:var(--space-5);">
      <h2 style="font-family:var(--font-family-sans);font-size:var(--fs-lg);font-weight:700;color:var(--gov-navy-primary);margin:0 0 1rem 0;border-bottom:1px solid var(--gov-border-subtle);padding-bottom:8px;">
        Emergency &amp; Helpline Operational Settings
      </h2>

      <div style="display:flex;flex-direction:column;gap:var(--space-3);">
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
          <input type="checkbox" checked style="width:18px;height:18px;accent-color:var(--gov-navy-primary);" />
          <span style="font-weight:600;font-size:var(--fs-base);">
            Audible Siren Alert on New SOS / Emergency Ingestion
          </span>
        </label>

        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
          <input type="checkbox" checked style="width:18px;height:18px;accent-color:var(--gov-navy-primary);" />
          <span style="font-weight:600;font-size:var(--fs-base);">
            Automatic Volunteer WhatsApp Broadcast upon Emergency Ingestion
          </span>
        </label>

        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
          <input type="checkbox" checked style="width:18px;height:18px;accent-color:var(--gov-navy-primary);" />
          <span style="font-weight:600;font-size:var(--fs-base);">
            High-Contrast Accessibility Mode (Complies with Govt of India Web Guidelines GIGW)
          </span>
        </label>
      </div>

      <div style="margin-top:var(--space-5);display:flex;gap:12px;">
        <button type="button" class="gov-btn gov-btn-primary" onclick="alert('Settings saved successfully.')">
          Save Settings
        </button>
      </div>
    </div>
  </div>`;
}
