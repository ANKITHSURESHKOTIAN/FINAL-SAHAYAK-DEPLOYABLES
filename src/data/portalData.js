/**
 * SAHAYAK — Official Community Assistance Portal
 * Central Data Store
 * Clean, structured data for Police Station and Volunteer Network operations
 */

export const PORTAL_METRICS = {
  totalRequests: 38,
  pendingRequests: 14,
  activeVolunteers: 24,
  emergencyRequests: 2,
};

export const AI_HELPLINE_DATA = {
  status: 'Online',
  helplineNumber: '1800-425-14567',
  emergencyDirectLine: '112 / 108',
  callsToday: 12,
  requestsGenerated: 8,
  lastUpdated: '10:00 AM Today',
  callLogs: [
    {
      time: '09:12 AM',
      caller: 'Lakshmi Devi',
      language: 'Kannada',
      request: 'Milk (1L Nandini)',
      status: 'Request Created (#SH1024)',
    },
    {
      time: '08:45 AM',
      caller: 'Ramappa Gowda',
      language: 'Kannada',
      request: 'BP Medicine Refill',
      status: 'Request Created (#SH1023)',
    },
    {
      time: '08:15 AM',
      caller: 'Kamala Poojary',
      language: 'Kannada',
      request: 'Severe Breathing SOS',
      status: 'Emergency Alert (#SH1022)',
    },
    {
      time: '07:50 AM',
      caller: 'Raghavendra Rao',
      language: 'Kannada',
      request: 'LPG Cylinder Connection',
      status: 'Request Created (#SH1021)',
    },
    {
      time: '07:22 AM',
      caller: "Mary D'Souza",
      language: 'Kannada / Konkani',
      request: 'Pension Escort Assistance',
      status: 'Request Created (#SH1020)',
    },
    {
      time: '06:40 AM',
      caller: 'Bhavani Amma',
      language: 'Kannada',
      request: 'Fall in Home SOS Alert',
      status: 'Emergency Alert (#SH1019)',
    },
    {
      time: '06:15 AM',
      caller: 'Anand Shenoy',
      language: 'English',
      request: 'General Health Camp Info',
      status: 'Answered & Closed',
    },
  ],
};

export const INITIAL_REQUESTS = [
  {
    id: '#SH1024',
    numericId: '1024',
    seniorCitizen: 'Lakshmi Devi',
    age: 72,
    phone: '+91 98450 11928',
    location: 'Shirva Main Road, Near Old Post Office',
    area: 'Shirva',
    category: 'Groceries',
    request: '1L Nandini Milk (Blue Packet)',
    quantity: '1 Packet (1 Litre)',
    brandPreference: 'Nandini Blue (Pasteurized Toned Milk)',
    priority: 'Normal',
    status: 'Pending',
    assignedVolunteer: 'Unassigned',
    volunteerPhone: '—',
    volunteerStatus: 'Pending Assignment',
    aiSummary: 'Citizen called at 09:12 AM requesting morning milk delivery. She reported knee joint pain and is unable to walk down the road to the local dairy booth.',
    kannadaAudioTranscript: 'ನನಗೆ ಒಂದು ಪ್ಯಾಕೆಟ್ ನಂದಿನಿ ಹಾಲು ಬೇಕು, ಮಂಡಿ ನೋವು ಜಾಸ್ತಿ ಇದೆ, ತರಲು ಆಗುತ್ತಿಲ್ಲ...',
    nearbyShops: [
      { name: 'Sri Krishna Provision Store', distance: '0.4 km', availability: 'In Stock' },
      { name: 'KMF Nandini Milk Parlour', distance: '0.6 km', availability: 'In Stock' },
    ],
    timestamp: 'Today, 09:12 AM',
    isEmergency: false,
  },
  {
    id: '#SH1023',
    numericId: '1023',
    seniorCitizen: 'Ramappa Gowda',
    age: 78,
    phone: '+91 94481 22910',
    location: 'Shirva Bus Stand Road, Cross 2',
    area: 'Shirva',
    category: 'Medicines',
    request: 'Amlodipine 5mg Tablets (BP)',
    quantity: '1 Strip (30 Tablets)',
    brandPreference: 'Amlodipine 5mg (Prescription verified on file)',
    priority: 'High',
    status: 'Assigned',
    assignedVolunteer: 'Prashanth Rao',
    volunteerPhone: '+91 98863 44102',
    volunteerStatus: 'Volunteer En Route (ETA 10 mins)',
    aiSummary: 'Citizen called reporting blood pressure tablets will run out by evening. Urgent refill needed before noon. Doctor prescription is verified at PHC.',
    kannadaAudioTranscript: 'ಬಿಪಿ ಮಾತ್ರೆ ಖಾಲಿಯಾಗಿದೆ ಕಣಪ್ಪ, ಸಂಜೆ ಒಳಗೆ ಬೇಕಿತ್ತು...',
    nearbyShops: [
      { name: 'Jan Aushadhi Medical Kendra', distance: '0.6 km', availability: 'Available (₹48)' },
      { name: 'Adarsh Pharmacy', distance: '1.0 km', availability: 'In Stock' },
    ],
    timestamp: 'Today, 08:45 AM',
    isEmergency: false,
  },
  {
    id: '#SH1022',
    numericId: '1022',
    seniorCitizen: 'Kamala Poojary',
    age: 76,
    phone: '+91 97412 88201',
    location: 'Eshwar Nagar, Sector 2, Shirva',
    area: 'Shirva Sector 2',
    category: 'Emergency Medical',
    request: 'Severe Breathing Difficulty & Oxygen Assist',
    quantity: 'Immediate Medical SOS',
    brandPreference: 'Govt 108 Ambulance & Station Patrol Dispatched',
    priority: 'EMERGENCY',
    status: 'Emergency',
    assignedVolunteer: 'Sub-Insp. Suresh & 108 Ambulance Unit',
    volunteerPhone: '+91 94481 11200 (Police Desk)',
    volunteerStatus: 'Patrol Vehicle 4 mins away',
    aiSummary: 'CRITICAL SOS: Citizen called gasping for breath with chest tightness. AI voice detection identified distress acoustics and immediately elevated to Police Command & Emergency Ambulance dispatch.',
    kannadaAudioTranscript: 'ಉಸಿರಾಡಲು ತುಂಬಾ ಕಷ್ಟವಾಗುತ್ತಿದೆ, ಎದೆ ಭಾರವಾಗಿದೆ, ದಯವಿಟ್ಟು ಯಾರಾದರೂ ಬೇಗ ಬನ್ನಿ...',
    nearbyShops: [
      { name: 'Shirva Govt Primary Health Centre', distance: '0.5 km', availability: 'Emergency Doctor On Duty' },
      { name: 'KMC Hospital Manipal (Referral)', distance: '8.5 km', availability: 'ICU Alerted' },
    ],
    timestamp: 'Today, 08:15 AM',
    isEmergency: true,
  },
  {
    id: '#SH1021',
    numericId: '1021',
    seniorCitizen: 'Raghavendra Rao',
    age: 71,
    phone: '+91 98440 33812',
    location: 'Car Street, Near Venkataramana Temple',
    area: 'Udupi Car Street',
    category: 'Utility',
    request: 'LPG Cooking Gas Connection',
    quantity: '14.2 KG Cylinder Hookup',
    brandPreference: 'Indane Gas Refill (Safety check required)',
    priority: 'Normal',
    status: 'Completed',
    assignedVolunteer: 'Santhosh Kumar',
    volunteerPhone: '+91 98452 77123',
    volunteerStatus: 'Service Verified & Completed at 08:50 AM',
    aiSummary: 'Citizen received new cooking gas cylinder at doorstep but cannot safely lift the weight or hook up the brass regulator without assistance.',
    kannadaAudioTranscript: 'ಸಿಲಿಂಡರ್ ಬಂದು ಬಾಗಿಲಲ್ಲೇ ಇದೆ, ನಮಗೆ ಎತ್ತೋಕೆ ಆಗಲ್ಲ ರೆಗ್ಯುಲೇಟರ್ ಕೂರಿಸಿ ಕೊಡಿ...',
    nearbyShops: [
      { name: 'Udupi Indane Gas Agency', distance: '1.2 km', availability: 'Delivered' },
    ],
    timestamp: 'Today, 07:50 AM',
    isEmergency: false,
  },
  {
    id: '#SH1020',
    numericId: '1020',
    seniorCitizen: "Mary D'Souza",
    age: 80,
    phone: '+91 94801 66230',
    location: 'Catholic Church Road, Cross 3, Shirva',
    area: 'Shirva',
    category: 'Mobility Escort',
    request: 'Post Office Pension Escort',
    quantity: '2-Way Escort & Biometric Assistance',
    brandPreference: 'Aadhaar Biometric Pension Withdrawal at Sub-Post Office',
    priority: 'Normal',
    status: 'Assigned',
    assignedVolunteer: 'Ananya Nayak',
    volunteerPhone: '+91 97311 55904',
    volunteerStatus: 'Assigned (Scheduled for 10:30 AM)',
    aiSummary: 'Citizen requires walking assistance and accompaniment to Sub-Post Office for monthly senior pension biometric withdrawal.',
    kannadaAudioTranscript: 'ಪೋಸ್ಟ್ ಆಫೀಸ್‌ಗೆ ಹೋಗಿ ಪೆನ್ಷನ್ ತರಲು ಸಹಾಯ ಬೇಕಿತ್ತು, ಒಬ್ಬಳೇ ನಡೆಯಲು ಆಗಲ್ಲ...',
    nearbyShops: [
      { name: 'Shirva Sub-Post Office', distance: '0.8 km', availability: 'Senior Priority Counter Open' },
    ],
    timestamp: 'Today, 07:22 AM',
    isEmergency: false,
  },
  {
    id: '#SH1019',
    numericId: '1019',
    seniorCitizen: 'Bhavani Amma',
    age: 82,
    phone: '+91 98455 44321',
    location: 'Market Yard Road, Near Old Well, Shirva',
    area: 'Shirva Market',
    category: 'Emergency Fall',
    request: 'Fall in Home SOS Assistance',
    quantity: 'Immediate Welfare Check',
    brandPreference: 'Police Station Beat Constable Responding',
    priority: 'EMERGENCY',
    status: 'Emergency',
    assignedVolunteer: 'HC Ganesh Bhat (Beat #4)',
    volunteerPhone: '+91 94482 11002',
    volunteerStatus: 'Officer On-Site with Neighbor',
    aiSummary: 'CRITICAL SOS: Citizen slipped near washroom and is unable to stand. Phone was on coffee table and triggered voice SOS. Front latch reported unlatched.',
    kannadaAudioTranscript: 'ಕಾಲು ಜಾರಿ ಬಿದ್ದೆ, ಎದ್ದೇಳಲು ಆಗುತ್ತಿಲ್ಲ, ಬಾಗಿಲು ಕೊಂಡಿ ಹಾಕಿಲ್ಲ...',
    nearbyShops: [
      { name: 'Shirva Community Health Clinic', distance: '0.4 km', availability: 'Nurse Dispatched' },
    ],
    timestamp: 'Today, 06:40 AM',
    isEmergency: true,
  },
];

export const INITIAL_VOLUNTEERS = [
  {
    id: 'VOL-01',
    name: 'Prashanth Rao',
    phone: '+91 98863 44102',
    area: 'Shirva Center & Bus Stand',
    status: 'Busy',
    requestsCompleted: 26,
    transit: 'Two-Wheeler (Motorcycle)',
  },
  {
    id: 'VOL-02',
    name: 'Ananya Nayak',
    phone: '+91 97311 55904',
    area: 'Church Road & Shirva East',
    status: 'Busy',
    requestsCompleted: 34,
    transit: 'Auto-Rickshaw Escort',
  },
  {
    id: 'VOL-03',
    name: 'Santhosh Kumar',
    phone: '+91 98452 77123',
    area: 'Car Street & Temple Ward',
    status: 'Available',
    requestsCompleted: 41,
    transit: 'Two-Wheeler',
  },
  {
    id: 'VOL-04',
    name: 'Divya Hegde',
    phone: '+91 94489 12345',
    area: 'Manipal Sector & Eshwar Nagar',
    status: 'Available',
    requestsCompleted: 18,
    transit: 'Two-Wheeler',
  },
  {
    id: 'VOL-05',
    name: 'Mahesh Acharya',
    phone: '+91 98801 65432',
    area: 'Shirva East & Mattu Cross',
    status: 'Offline',
    requestsCompleted: 15,
    transit: 'Bicycle',
  },
  {
    id: 'VOL-06',
    name: 'Rajesh Shetty',
    phone: '+91 94480 98765',
    area: 'Katapadi Junction & Sub-Ward',
    status: 'Available',
    requestsCompleted: 29,
    transit: 'Two-Wheeler',
  },
];

export const INITIAL_SENIOR_CITIZENS = [
  {
    id: 'CIT-01',
    sahayakId: '#SH-CIT-0112',
    name: 'Lakshmi Devi',
    age: 72,
    phone: '+91 98450 11928',
    area: 'Shirva Main Road',
    emergencyContact: 'Son (Suresh): +91 98451 00000',
    status: 'Active (Lives Alone)',
  },
  {
    id: 'CIT-02',
    sahayakId: '#SH-CIT-0089',
    name: 'Ramappa Gowda',
    age: 78,
    phone: '+91 94481 22910',
    area: 'Bus Stand Road',
    emergencyContact: 'Daughter (Geetha): +91 99802 33445',
    status: 'Active (Hypertension Care)',
  },
  {
    id: 'CIT-03',
    sahayakId: '#SH-CIT-0145',
    name: 'Kamala Poojary',
    age: 76,
    phone: '+91 97412 88201',
    area: 'Eshwar Nagar',
    emergencyContact: 'Neighbor (Satish): +91 98453 66778',
    status: 'Under Medical Alert',
  },
  {
    id: 'CIT-04',
    sahayakId: '#SH-CIT-0056',
    name: 'Raghavendra Rao',
    age: 71,
    phone: '+91 98440 33812',
    area: 'Car Street',
    emergencyContact: 'Brother (Gopal): +91 94483 11223',
    status: 'Active',
  },
  {
    id: 'CIT-05',
    sahayakId: '#SH-CIT-0074',
    name: "Mary D'Souza",
    age: 80,
    phone: '+91 94801 66230',
    area: 'Catholic Church Road',
    emergencyContact: 'Caretaker (Maria): +91 97310 99881',
    status: 'Active (Mobility Impaired)',
  },
  {
    id: 'CIT-06',
    sahayakId: '#SH-CIT-0188',
    name: 'Bhavani Amma',
    age: 82,
    phone: '+91 98455 44321',
    area: 'Market Yard Road',
    emergencyContact: 'Grandson (Kiran): +91 98801 22334',
    status: 'Under Police Welfare Check',
  },
];

/* ── In-Memory State Manager ─────────────────────────────────────── */
let requestsState = [...INITIAL_REQUESTS];
let volunteersState = [...INITIAL_VOLUNTEERS];
let seniorCitizensState = [...INITIAL_SENIOR_CITIZENS];

export function getRequests() {
  return requestsState;
}

export function getRequestById(id) {
  return requestsState.find((r) => r.id === id || r.numericId === id.replace('#SH', ''));
}

export function updateRequestStatus(id, newStatus, assignedVolunteer = null) {
  const req = getRequestById(id);
  if (req) {
    req.status = newStatus;
    if (assignedVolunteer) {
      req.assignedVolunteer = assignedVolunteer.name;
      req.volunteerPhone = assignedVolunteer.phone;
      req.volunteerStatus = 'Assigned by Police Desk';
    }
  }
  return req;
}

export function getVolunteers() {
  return volunteersState;
}

export function getAvailableVolunteers() {
  return volunteersState.filter((v) => v.status === 'Available');
}

export function getSeniorCitizens() {
  return seniorCitizensState;
}

export function addSeniorCitizen(citizenData) {
  const count = seniorCitizensState.length + 1;
  const newCitizen = {
    id: `CIT-${String(count).padStart(2, '0')}`,
    sahayakId: `#SH-CIT-0${200 + count}`,
    name: citizenData.name,
    age: Number(citizenData.age) || 70,
    phone: citizenData.phone,
    area: citizenData.area,
    emergencyContact: citizenData.emergencyContact,
    status: 'Active',
  };
  seniorCitizensState.unshift(newCitizen);
  return newCitizen;
}

export function getActiveEmergencies() {
  return requestsState.filter((r) => r.isEmergency || r.priority === 'EMERGENCY');
}
