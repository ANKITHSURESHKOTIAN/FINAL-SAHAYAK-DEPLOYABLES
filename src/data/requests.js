/**
 * SAHAYAK Civic Operations Portal
 * data/requests.js — Assistance request data store
 *
 * In a real deployment this would be fetched from a REST/GraphQL API.
 * For this prototype, static data mirrors the design spec exactly.
 */

export const ASSISTANCE_REQUESTS = [
  {
    id: 'ASR-2026-0134',
    status: 'waiting',
    statusLabel: 'WAITING FOR VOLUNTEER — IMMEDIATE ACTION REQUIRED',
    statusDetail: 'Elapsed: 18 minutes',
    urgency: 'critical',

    citizen: {
      name: 'Lakshmi Shetty',
      age: 72,
      icon: 'elderly_woman',
      address: 'Shirva Main Road, Near Old Post Office',
      tags: ['Lives Alone', 'Verified Citizen'],
    },

    partner: {
      type: 'Partner Store In Vicinity',
      distance: '0.4 KM AWAY',
      icon: 'storefront',
      name: 'Sri Krishna Provision Store',
      detail: 'Merchant: U. Krishna Bhat • Ph: +91 94481 22810',
      payment: 'Direct Payment: Cash on Receipt / UPI QR',
    },

    request: {
      category: 'GROCERIES & DAIRY',
      categoryBg: 'bg-secondary-fixed',
      categoryText: 'text-on-secondary-fixed',
      received: 'Received Today, 07:15 AM via IVR',
      item: '1L Nandini Milk (Blue Packet)',
      qty: 'QTY: 1 Packet',
      description: 'Citizen requests morning fresh milk packet delivered at door step. Unable to walk to road due to mild knee swelling.',
    },

    audio: {
      type: 'AI Speech Ingestion & Natural Audio',
      icon: 'graphic_eq',
      iconColor: 'error',
      pulse: true,
      duration: '0:14 / 0:28 (Kannada IVR)',
      showPlayer: true,
      kannada: '"ನನಗೆ ಒಂದು ಪ್ಯಾಕೆಟ್ ನಂದಿನಿ ಹಾಲು ಬೇಕು, ಮಂಡಿ ನೋವು ಜಾಸ್ತಿ ಇದೆ, ತರಲು ಆಗುತ್ತಿಲ್ಲ..."',
      english: '"I need one packet Nandini milk; severe knee pain today, unable to step outside..."',
      dialectLabel: 'Dialect (Kannada):',
    },

    dispatch: {
      type: 'actions',
      hub: 'Shirva Police Station Desk #3',
      volunteers: '3 Verified Active within 1.2 km',
      citizenPhone: '+91 98450 11928',
      primaryAction: { label: 'Assign Volunteer Now', type: 'assign', icon: 'person_add' },
    },
  },

  {
    id: 'ASR-2026-0131',
    status: 'in-progress',
    statusLabel: 'IN PROGRESS — VOLUNTEER EN ROUTE',
    statusDetail: 'ETA: 12 minutes',
    urgency: 'in-progress',

    citizen: {
      name: 'Kamala Poojary',
      age: 76,
      icon: 'elderly',
      address: 'Eshwar Nagar, Manipal Sector 2',
      tags: ['Hypertensive Care', 'Medical Priority 2'],
    },

    partner: {
      type: 'Authorized Medical Dispensary',
      distance: '0.8 KM AWAY',
      icon: 'local_pharmacy',
      name: 'Jan Aushadhi Kendra (Tiger Circle)',
      detail: 'Pharmacist: S. Kamath • Prescription #MED-9941 Verified',
      payment: 'Medicine Billed: ₹48.00 (Subsidized)',
    },

    request: {
      category: 'MEDICINE REFILL',
      categoryBg: 'bg-surface-container-high',
      categoryText: 'text-primary-color',
      received: 'Prescription on File (Gov PHC)',
      item: 'Amlodipine 5mg BP Tablets',
      qty: '30 Tablets (1 Strip)',
      description: 'Citizen runs out of daily essential blood pressure dosage this evening. Courier or transit required urgently before 12:00 PM.',
    },

    audio: {
      type: 'IVR Voice Logged via +91 97412 88201',
      icon: 'record_voice_over',
      iconColor: 'secondary',
      pulse: false,
      duration: '0:21 / 0:21',
      showPlayer: false,
      kannada: '"ಬಿಪಿ ಮಾತ್ರೆ ಖಾಲಿಯಾಗಿದೆ ಕಣಪ್ಪ, ಸಂಜೆ ಒಳಗೆ ಬೇಕಿತ್ತು..."',
      english: '"My BP tablets are finished, son; desperately needed before the evening..."',
      dialectLabel: 'Dialect (Kannada):',
    },

    dispatch: {
      type: 'volunteer',
      volunteerName: 'Prashanth Rao',
      volunteerInitials: 'PR',
      volunteerDetail: 'Youth Volunteer #UD-882',
      volunteerDist: '1.1 km to residence',
      transitMode: 'Two-Wheeler',
      phone: '+91 98863 44102',
      primaryAction: { label: 'Track Live GPS', type: 'gps', icon: 'near_me' },
      secondaryAction: { label: 'Ring Volunteer', type: 'call', icon: 'phone_forwarded' },
    },
  },

  {
    id: 'ASR-2026-0129',
    status: 'verification',
    statusLabel: 'VERIFICATION PENDING — DOMESTIC UTILITY DISPATCH',
    statusDetail: 'Physical cylinder placed; hookup pending verification',
    urgency: 'neutral',

    citizen: {
      name: 'Raghavendra Rao',
      age: 71,
      icon: 'elderly',
      address: 'Car Street, Near Venkataramana Temple, Udupi',
      tags: ['Joint Pensioner', 'Gas Safety Protocol'],
    },

    partner: {
      type: 'Utility Agency Provider',
      distance: '1.5 KM AWAY',
      icon: 'propane',
      name: 'Udupi Indane Gas Distributors',
      detail: 'Consumer No: 00941824 • Refill Order #78219',
      payment: 'Safety seal intact by agency boy',
    },

    request: {
      category: 'DOMESTIC UTILITY / GAS SAFETY',
      categoryBg: 'bg-tertiary-fixed',
      categoryText: 'text-on-tertiary-fixed',
      received: 'Service Logged at 08:30 AM',
      item: 'Indane LPG Cylinder Connection Assist',
      qty: '14.2 KG',
      description: 'Delivery delivered outside doorstep; elderly citizen unable to lift weight to kitchen or safely connect brass regulator without assistance.',
    },

    audio: {
      type: 'IVR Voice Logged via Sahayak Landline',
      icon: 'record_voice_over',
      iconColor: 'secondary',
      pulse: false,
      duration: '0:19 / 0:19',
      showPlayer: false,
      kannada: '"ಸಿಲಿಂಡರ್ ಬಂದು ಬಾಗಿಲಲ್ಲೇ ಇದೆ, ನಮಗೆ ಎತ್ತೋಕೆ ಆಗಲ್ಲ ರೆಗ್ಯುಲೇಟರ್ ಕೂರಿಸಿ ಕೊಡಿ..."',
      english: '"Cylinder arrived at doorstep; we cannot lift it. Please help connect the regulator safely..."',
      dialectLabel: 'Dialect (Kannada):',
    },

    dispatch: {
      type: 'volunteer',
      volunteerName: 'Santhosh Kumar',
      volunteerInitials: 'SK',
      volunteerDetail: 'Civic Volunteer (Civil Defence)',
      volunteerDist: 'On Site (Connecting)',
      primaryAction: { label: 'Validate Soap Bubble Check & Close', type: 'validate', icon: 'verified' },
      secondaryAction: { label: 'Call Volunteer On-Site', type: 'call', icon: 'call' },
    },
  },

  {
    id: 'ASR-2026-0128',
    status: 'assigned',
    statusLabel: 'VOLUNTEER ASSIGNED — SCHEDULED ESCORT',
    statusDetail: 'Appointment: Today, 10:30 AM',
    urgency: 'assigned',

    citizen: {
      name: "Mary D'Souza",
      age: 80,
      icon: 'elderly_woman',
      address: 'Shirva Catholic Church Road, Cross 3',
      tags: ['Mobility Impaired', 'Requires Walking Frame'],
    },

    partner: {
      type: 'Government Destination',
      distance: '1.1 KM AWAY',
      icon: 'local_post_office',
      name: 'Shirva Sub-Post Office (574116)',
      detail: 'Service: Monthly Senior Pension Biometric Authentication',
      payment: 'Postmaster alerted for ground-floor priority counter',
    },

    request: {
      category: 'MOBILITY & PENSION ESCORT',
      categoryBg: 'bg-secondary-fixed',
      categoryText: 'text-on-secondary-fixed',
      received: 'Pre-booked Recurring Service',
      item: 'Monthly Pension Withdrawal & Post Office Escort',
      qty: '2-Way Transit',
      description: 'Accompaniment required from home to post office counter for Aadhaar finger scan. Safely escort back home with cash disbursement envelope.',
    },

    audio: {
      type: 'Audio Intake (Direct Call to Desk)',
      icon: 'record_voice_over',
      iconColor: 'secondary',
      pulse: false,
      duration: '0:25 / 0:25',
      showPlayer: false,
      kannada: '"ಪೋಸ್ಟ್ ಆಫೀಸ್‌ಗೆ ಹೋಗಿ ಪೆನ್ಷನ್ ತರಲು ಸಹಾಯ ಬೇಕಿತ್ತು, ಒಬ್ಬಳೇ ನಡೆಯಲು ಆಗಲ್ಲ..."',
      english: '"Need assistance to visit post office for pension withdrawal; unable to walk alone safely..."',
      dialectLabel: 'Dialect (Kannada/Konkani Mix):',
    },

    dispatch: {
      type: 'escort',
      volunteerName: 'Ananya Nayak',
      volunteerInitials: 'AN',
      volunteerDetail: 'Certified Civic Aide (ID: #CK-914)',
      volunteerDist: 'ETA at Home: 10:15 AM',
      vehicle: 'Civic Auto-Rickshaw #KA-20-B-4419',
      primaryAction: { label: 'Live Escort Checkpoint', type: 'checkpoint', icon: 'pin_drop' },
      secondaryAction: { label: 'Call Escort Volunteer', type: 'call', icon: 'call' },
    },
  },
];

export const METRICS = [
  {
    id: 'queue-criticality',
    label: 'QUEUE CRITICALITY',
    value: '14',
    sublabel: 'Total Pending Requests',
    detail: 'Unassigned backlog',
    stat: '+3 in last 20m',
    statColor: '#dc2626',
    icon: 'hourglass_top',
    iconBg: '#fee2e2',
    iconColor: '#991b1b',
    labelColor: '#dc2626',
  },
  {
    id: 'community-allocation',
    label: 'COMMUNITY ALLOCATION',
    value: '08',
    sublabel: 'Assigned to Volunteers',
    detail: 'Avg assignment latency',
    stat: '4.2 Mins',
    statColor: '#3b66f5',
    icon: 'volunteer_activism',
    iconBg: '#e0e7ff',
    iconColor: '#1e3a8a',
    labelColor: '#3b66f5',
  },
  {
    id: 'active-transit',
    label: 'ACTIVE TRANSIT',
    value: '04',
    sublabel: 'Out for Delivery',
    detail: 'Live GPS tracked runs',
    stat: 'All On Schedule',
    statColor: '#059669',
    icon: 'delivery_dining',
    iconBg: '#d1fae5',
    iconColor: '#064e3b',
    labelColor: '#059669',
  },
  {
    id: 'daily-completion',
    label: 'DAILY COMPLETION RATE',
    value: '42',
    sublabel: 'Resolved Today',
    detail: 'Target: 40 requests/day',
    stat: '105% Achieved',
    statColor: '#0284c7',
    icon: 'task_alt',
    iconBg: '#e0f2fe',
    iconColor: '#0c4a6e',
    labelColor: '#0284c7',
  },
];
