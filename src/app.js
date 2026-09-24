/**
 * SAHAYAK — Official Police & Community Assistance Portal
 * Application Router & Global Controller
 * 
 * Simple, functional, accessible architecture for police and volunteer operations.
 */

import { renderTopbar }                  from './components/topbar.js';
import { renderSidebar }                 from './components/sidebar.js';
import { renderModals, buildRequestDetailsHtml } from './components/modal.js';
import { renderDashboardPage }          from './pages/dashboard.js?v=20260928';
import { renderRequestsPage }           from './pages/requests.js';
import { renderVolunteersPage }         from './pages/volunteers.js';
import { renderSeniorCitizensPage }     from './pages/seniorCitizens.js';
import { renderEmergencyPage }          from './pages/emergency.js';
import { renderSettingsPage }           from './pages/settings.js';

import {
  getRequestById,
  updateRequestStatus,
  addSeniorCitizen,
  getAvailableVolunteers,
  getRequests,
} from './data/portalData.js';

/* ── Application State ─────────────────────────────────────────── */
let currentPath = 'dashboard';
let sidebarOpen = false;
let currentRequestsFilter = 'All';
let currentRequestsSearch = '';
window.currentLanguage = 'en';

/* ── Interface Translation ─────────────────────────────────────── */
/* All interface wording stays local to the portal; no third-party translator is used. */
const UI_TRANSLATIONS = {
  kn: {
    'Dashboard':'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್','Requests':'ವಿನಂತಿಗಳು','Volunteers':'ಸ್ವಯಂಸೇವಕರು','Senior Citizens':'ಹಿರಿಯ ನಾಗರಿಕರು','Emergency':'ತುರ್ತು ಪರಿಸ್ಥಿತಿ','Settings':'ಸೆಟ್ಟಿಂಗ್‌ಗಳು','Logout':'ಲಾಗ್ ಔಟ್','Back to Public Portal':'ಸಾರ್ವಜನಿಕ ಪೋರ್ಟಲ್‌ಗೆ ಹಿಂತಿರುಗಿ',
    'Community Assistance Portal':'ಸಮುದಾಯ ಸಹಾಯ ಪೋರ್ಟಲ್','Government of Karnataka · Karnataka State Police':'ಕರ್ನಾಟಕ ಸರ್ಕಾರ · ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್','Jurisdiction':'ವ್ಯಾಪ್ತಿ','Police Station':'ಪೊಲೀಸ್ ಠಾಣೆ','Emergency 112':'ತುರ್ತು 112','Senior Helpline 14567':'ಹಿರಿಯರ ಸಹಾಯವಾಣಿ 14567','2 Emergencies':'2 ತುರ್ತುಗಳು','Notifications':'ಅಧಿಸೂಚನೆಗಳು',
    'LIVE OPERATIONS CENTRE · SHIRVA POLICE STATION':'ನೇರ ಕಾರ್ಯಾಚರಣೆ ಕೇಂದ್ರ · ಶಿರ್ವಾ ಪೊಲೀಸ್ ಠಾಣೆ','Community care, coordinated.':'ಸಮುದಾಯ ಆರೈಕೆ, ಸಮನ್ವಯದಿಂದ.','Monitor requests, protect senior citizens, and deploy verified help from one secure civic workspace.':'ವಿನಂತಿಗಳನ್ನು ಗಮನಿಸಿ, ಹಿರಿಯ ನಾಗರಿಕರನ್ನು ರಕ್ಷಿಸಿ ಮತ್ತು ಒಂದೇ ಸುರಕ್ಷಿತ ನಾಗರಿಕ ಕಾರ್ಯಕ್ಷೇತ್ರದಿಂದ ಪರಿಶೀಲಿತ ನೆರವನ್ನು ನಿಯೋಜಿಸಿ.','Review pending requests':'ಬಾಕಿ ವಿನಂತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ','Register senior citizen':'ಹಿರಿಯ ನಾಗರಿಕರನ್ನು ನೋಂದಾಯಿಸಿ','Station readiness':'ಠಾಣೆಯ ಸನ್ನದ್ಧತೆ','Operational':'ಕಾರ್ಯನಿರತ','All systems synchronised':'ಎಲ್ಲಾ ವ್ಯವಸ್ಥೆಗಳು ಸಿಂಕ್ರೊನೈಸ್ ಆಗಿವೆ',
    'Today at a glance':'ಇಂದಿನ ಸಂಕ್ಷಿಪ್ತ ನೋಟ','Prioritise care requests that need action in the Shirva jurisdiction.':'ಶಿರ್ವಾ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಕ್ರಮ ಅಗತ್ಯವಿರುವ ಆರೈಕೆ ವಿನಂತಿಗಳಿಗೆ ಆದ್ಯತೆ ನೀಡಿ.','Today, 13 September 2026':'ಇಂದು, 13 ಸೆಪ್ಟೆಂಬರ್ 2026','Key Operational Metrics':'ಪ್ರಮುಖ ಕಾರ್ಯಾಚರಣೆ ಅಂಕಿಅಂಶಗಳು','Total Requests':'ಒಟ್ಟು ವಿನಂತಿಗಳು','Pending Requests':'ಬಾಕಿ ವಿನಂತಿಗಳು','Active Volunteers':'ಸಕ್ರಿಯ ಸ್ವಯಂಸೇವಕರು','Emergency Requests':'ತುರ್ತು ವಿನಂತಿಗಳು','Logged across helpline & desk':'ಸಹಾಯವಾಣಿ ಮತ್ತು ಕೌಂಟರ್‌ನಲ್ಲಿ ದಾಖಲಿಸಲಾಗಿದೆ','Awaiting volunteer assignment':'ಸ್ವಯಂಸೇವಕರ ನಿಯೋಜನೆಗಾಗಿ ಕಾಯುತ್ತಿದೆ','Verified & on-call in sector':'ವಲಯದಲ್ಲಿ ಪರಿಶೀಲಿತ ಮತ್ತು ಸಿದ್ಧ','Immediate action required':'ತಕ್ಷಣದ ಕ್ರಮ ಅಗತ್ಯ',
    'AI Voice Helpline':'ಎಐ ಧ್ವನಿ ಸಹಾಯವಾಣಿ','AI Voice Helpline Overview':'ಎಐ ಧ್ವನಿ ಸಹಾಯವಾಣಿ ಅವಲೋಕನ','Calls Today':'ಇಂದಿನ ಕರೆಗಳು','Requests Generated':'ಸೃಷ್ಟಿಯಾದ ವಿನಂತಿಗಳು','IVR Gateway Status':'IVR ಗೇಟ್‌ವೇ ಸ್ಥಿತಿ','Online':'ಆನ್‌ಲೈನ್','View Call History':'ಕರೆ ಇತಿಹಾಸ ವೀಕ್ಷಿಸಿ','Recent Requests':'ಇತ್ತೀಚಿನ ವಿನಂತಿಗಳು','Latest incoming citizen requirements':'ಇತ್ತೀಚಿನ ನಾಗರಿಕರ ಅಗತ್ಯತೆಗಳು','View All Requests':'ಎಲ್ಲಾ ವಿನಂತಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ','Request ID':'ವಿನಂತಿ ಐಡಿ','Senior Citizen':'ಹಿರಿಯ ನಾಗರಿಕ','Request':'ವಿನಂತಿ','Location':'ಸ್ಥಳ','Priority':'ಆದ್ಯತೆ','Status':'ಸ್ಥಿತಿ','Action':'ಕ್ರಮ','View':'ವೀಕ್ಷಿಸಿ','Pending':'ಬಾಕಿ','Assigned':'ನಿಯೋಜಿಸಲಾಗಿದೆ','Completed':'ಪೂರ್ಣಗೊಂಡಿದೆ','Normal':'ಸಾಮಾನ್ಯ','High':'ಹೆಚ್ಚು','EMERGENCY':'ತುರ್ತು','Active SOS':'ಸಕ್ರಿಯ SOS','2 Active':'2 ಸಕ್ರಿಯ','View 2 Active Emergency SOS Alerts':'2 ಸಕ್ರಿಯ ತುರ್ತು SOS ಎಚ್ಚರಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ','Operational Notifications':'ಕಾರ್ಯಾಚರಣೆ ಅಧಿಸೂಚನೆಗಳು','Sign out of SAHAYAK Portal':'ಸಹಾಯಕ ಪೋರ್ಟಲ್‌ನಿಂದ ನಿರ್ಗಮಿಸಿ','Portal & Station Settings':'ಪೋರ್ಟಲ್ ಮತ್ತು ಠಾಣೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು','Sign Out':'ನಿರ್ಗಮಿಸಿ','View full request details':'ಪೂರ್ಣ ವಿನಂತಿ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ','Open today\'s helpline call logs':'ಇಂದಿನ ಸಹಾಯವಾಣಿ ಕರೆ ದಾಖಲೆಗಳನ್ನು ತೆರೆಯಿರಿ','Shirva Police Station':'ಶಿರ್ವಾ ಪೊಲೀಸ್ ಠಾಣೆ','GovNet Udupi Node #04':'ಗವ್‌ನೆಟ್ ಉಡುಪಿ ನೋಡ್ #04','Official Civic Portal — District Administration Udupi & Karnataka State Police':'ಅಧಿಕೃತ ನಾಗರಿಕ ಪೋರ್ಟಲ್ — ಉಡುಪಿ ಜಿಲ್ಲಾ ಆಡಳಿತ ಮತ್ತು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್','1L Nandini Milk (Blue Packet)':'1 ಲೀಟರ್ ನಂದಿನಿ ಹಾಲು (ನೀಲಿ ಪ್ಯಾಕೆಟ್)','Severe Breathing Difficulty & Oxygen Assist':'ತೀವ್ರ ಉಸಿರಾಟದ ತೊಂದರೆ ಮತ್ತು ಆಮ್ಲಜನಕ ನೆರವು','LPG Cooking Gas Connection':'LPG ಅಡುಗೆ ಅನಿಲ ಸಂಪರ್ಕ','Post Office Pension Escort':'ಅಂಚೆ ಕಚೇರಿ ಪಿಂಚಣಿ ಸಹಾಯ',
    'Assistance Requests':'ಸಹಾಯ ವಿನಂತಿಗಳು','Track, filter, and dispatch volunteer assistance to registered senior citizens.':'ನೋಂದಾಯಿತ ಹಿರಿಯ ನಾಗರಿಕರಿಗಾಗಿ ಸ್ವಯಂಸೇವಕ ಸಹಾಯವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ, ಫಿಲ್ಟರ್ ಮಾಡಿ ಮತ್ತು ನಿಯೋಜಿಸಿ.','Showing 6 of 6 Requests':'6 ರಲ್ಲಿ 6 ವಿನಂತಿಗಳು ತೋರಿಸಲಾಗುತ್ತಿದೆ','All':'ಎಲ್ಲಾ','Cards':'ಕಾರ್ಡ್‌ಗಳು','Table':'ಕೋಷ್ಟಕ','Search requests':'ವಿನಂತಿಗಳನ್ನು ಹುಡುಕಿ','Manual Citizen Intake':'ನಾಗರಿಕರ ಕೈಯಾರೆ ದಾಖಲಾತಿ','Sync Direct Dial (14567)':'ನೇರ ಡಯಲ್ ಸಿಂಕ್ ಮಾಡಿ (14567)','Emergency SOS':'ತುರ್ತು SOS','View Details & Dispatch':'ವಿವರಗಳು ಮತ್ತು ನಿಯೋಜನೆ ವೀಕ್ಷಿಸಿ','Call Citizen':'ನಾಗರಿಕರಿಗೆ ಕರೆ ಮಾಡಿ',
    'Register Senior Citizen':'ಹಿರಿಯ ನಾಗರಿಕರನ್ನು ನೋಂದಾಯಿಸಿ','Full Name *':'ಪೂರ್ಣ ಹೆಸರು *','Age *':'ವಯಸ್ಸು *','Phone Number *':'ದೂರವಾಣಿ ಸಂಖ್ಯೆ *','Area / Address *':'ಪ್ರದೇಶ / ವಿಳಾಸ *','Emergency Contact (Relation & Phone) *':'ತುರ್ತು ಸಂಪರ್ಕ (ಸಂಬಂಧ ಮತ್ತು ದೂರವಾಣಿ) *','Special Notes (Living Alone, Medical, Mobility)':'ವಿಶೇಷ ಟಿಪ್ಪಣಿಗಳು (ಏಕಾಂಗಿಯಾಗಿ, ವೈದ್ಯಕೀಯ, ಚಲನಶೀಲತೆ)','Cancel':'ರದ್ದುಮಾಡಿ','Register Citizen':'ನಾಗರಿಕರನ್ನು ನೋಂದಾಯಿಸಿ','Close dialog':'ಸಂವಾದ ಮುಚ್ಚಿ',
    'Language Switched':'ಭಾಷೆ ಬದಲಾಯಿಸಲಾಗಿದೆ','Interface updated to Kannada.':'ಇಂಟರ್‌ಫೇಸ್ ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.','Interface updated to Hindi.':'ಇಂಟರ್‌ಫೇಸ್ ಹಿಂದಿಗೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.','Interface updated to English.':'ಇಂಟರ್‌ಫೇಸ್ ಇಂಗ್ಲಿಷ್‌ಗೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.'
  },
  hi: {
    'Dashboard':'डैशबोर्ड','Requests':'अनुरोध','Volunteers':'स्वयंसेवक','Senior Citizens':'वरिष्ठ नागरिक','Emergency':'आपातकाल','Settings':'सेटिंग्स','Logout':'लॉग आउट','Back to Public Portal':'सार्वजनिक पोर्टल पर वापस जाएँ',
    'Community Assistance Portal':'सामुदायिक सहायता पोर्टल','Government of Karnataka · Karnataka State Police':'कर्नाटक सरकार · कर्नाटक राज्य पुलिस','Jurisdiction':'कार्यक्षेत्र','Police Station':'पुलिस थाना','Emergency 112':'आपातकाल 112','Senior Helpline 14567':'वरिष्ठ सहायता लाइन 14567','2 Emergencies':'2 आपात स्थितियाँ','Notifications':'सूचनाएँ',
    'LIVE OPERATIONS CENTRE · SHIRVA POLICE STATION':'लाइव संचालन केंद्र · शिरवा पुलिस थाना','Community care, coordinated.':'समुदाय देखभाल, समन्वय के साथ।','Monitor requests, protect senior citizens, and deploy verified help from one secure civic workspace.':'अनुरोधों की निगरानी करें, वरिष्ठ नागरिकों की रक्षा करें और एक सुरक्षित नागरिक कार्यक्षेत्र से सत्यापित सहायता भेजें।','Review pending requests':'लंबित अनुरोध देखें','Register senior citizen':'वरिष्ठ नागरिक पंजीकृत करें','Station readiness':'थाना तैयारी','Operational':'सक्रिय','All systems synchronised':'सभी सिस्टम समन्वित हैं',
    'Today at a glance':'आज एक नज़र में','Prioritise care requests that need action in the Shirva jurisdiction.':'शिरवा कार्यक्षेत्र में कार्रवाई की जरूरत वाले देखभाल अनुरोधों को प्राथमिकता दें।','Today, 13 September 2026':'आज, 13 सितंबर 2026','Key Operational Metrics':'मुख्य संचालन आँकड़े','Total Requests':'कुल अनुरोध','Pending Requests':'लंबित अनुरोध','Active Volunteers':'सक्रिय स्वयंसेवक','Emergency Requests':'आपात अनुरोध','Logged across helpline & desk':'हेल्पलाइन और डेस्क पर दर्ज','Awaiting volunteer assignment':'स्वयंसेवक आवंटन की प्रतीक्षा में','Verified & on-call in sector':'क्षेत्र में सत्यापित और उपलब्ध','Immediate action required':'तत्काल कार्रवाई आवश्यक',
    'AI Voice Helpline':'एआई वॉइस हेल्पलाइन','AI Voice Helpline Overview':'एआई वॉइस हेल्पलाइन अवलोकन','Calls Today':'आज की कॉल','Requests Generated':'बनाए गए अनुरोध','IVR Gateway Status':'आईवीआर गेटवे स्थिति','Online':'ऑनलाइन','View Call History':'कॉल इतिहास देखें','Recent Requests':'हाल के अनुरोध','Latest incoming citizen requirements':'नागरिकों की नवीनतम आवश्यकताएँ','View All Requests':'सभी अनुरोध देखें','Request ID':'अनुरोध आईडी','Senior Citizen':'वरिष्ठ नागरिक','Request':'अनुरोध','Location':'स्थान','Priority':'प्राथमिकता','Status':'स्थिति','Action':'कार्रवाई','View':'देखें','Pending':'लंबित','Assigned':'आवंटित','Completed':'पूर्ण','Normal':'सामान्य','High':'उच्च','EMERGENCY':'आपातकाल','Active SOS':'सक्रिय एसओएस','2 Active':'2 सक्रिय','View 2 Active Emergency SOS Alerts':'2 सक्रिय आपात एसओएस अलर्ट देखें','Operational Notifications':'संचालन सूचनाएँ','Sign out of SAHAYAK Portal':'सहायक पोर्टल से बाहर निकलें','Portal & Station Settings':'पोर्टल और थाना सेटिंग्स','Sign Out':'बाहर निकलें','View full request details':'पूर्ण अनुरोध विवरण देखें','Open today\'s helpline call logs':'आज के हेल्पलाइन कॉल लॉग खोलें','Shirva Police Station':'शिरवा पुलिस थाना','GovNet Udupi Node #04':'गवनेट उडुपी नोड #04','Official Civic Portal — District Administration Udupi & Karnataka State Police':'आधिकारिक नागरिक पोर्टल — उडुपी जिला प्रशासन और कर्नाटक राज्य पुलिस','1L Nandini Milk (Blue Packet)':'1 लीटर नंदिनी दूध (नीला पैकेट)','Severe Breathing Difficulty & Oxygen Assist':'गंभीर साँस लेने में कठिनाई और ऑक्सीजन सहायता','LPG Cooking Gas Connection':'एलपीजी खाना पकाने की गैस कनेक्शन','Post Office Pension Escort':'डाकघर पेंशन सहायता',
    'Assistance Requests':'सहायता अनुरोध','Track, filter, and dispatch volunteer assistance to registered senior citizens.':'पंजीकृत वरिष्ठ नागरिकों के लिए स्वयंसेवक सहायता को ट्रैक, फ़िल्टर और भेजें।','Showing 6 of 6 Requests':'6 में से 6 अनुरोध दिखाए जा रहे हैं','All':'सभी','Cards':'कार्ड','Table':'तालिका','Search requests':'अनुरोध खोजें','Manual Citizen Intake':'नागरिक मैन्युअल प्रविष्टि','Sync Direct Dial (14567)':'डायरेक्ट डायल सिंक करें (14567)','Emergency SOS':'आपात एसओएस','View Details & Dispatch':'विवरण और भेजना देखें','Call Citizen':'नागरिक को कॉल करें',
    'Register Senior Citizen':'वरिष्ठ नागरिक पंजीकृत करें','Full Name *':'पूरा नाम *','Age *':'आयु *','Phone Number *':'फ़ोन नंबर *','Area / Address *':'क्षेत्र / पता *','Emergency Contact (Relation & Phone) *':'आपात संपर्क (संबंध और फ़ोन) *','Special Notes (Living Alone, Medical, Mobility)':'विशेष नोट्स (अकेले रहना, चिकित्सा, गतिशीलता)','Cancel':'रद्द करें','Register Citizen':'नागरिक पंजीकृत करें','Close dialog':'डायलॉग बंद करें',
    'Language Switched':'भाषा बदली गई','Interface updated to Kannada.':'इंटरफ़ेस कन्नड़ में बदला गया।','Interface updated to Hindi.':'इंटरफ़ेस हिंदी में बदला गया।','Interface updated to English.':'इंटरफ़ेस अंग्रेज़ी में बदला गया।'
  }
};

/* Remaining page copy is kept here so every portal section uses the same local translation source. */
Object.assign(UI_TRANSLATIONS.kn, {
  'Civic Volunteer Network':'ನಾಗರಿಕ ಸ್ವಯಂಸೇವಕ ಜಾಲ','Verified community volunteers registered with Shirva Police Station Sector.':'ಶಿರ್ವಾ ಪೊಲೀಸ್ ಠಾಣೆ ವಲಯದಲ್ಲಿ ನೋಂದಾಯಿತ ಪರಿಶೀಲಿತ ಸಮುದಾಯ ಸ್ವಯಂಸೇವಕರು.','Active & Ready on Field':'ಸಕ್ರಿಯ ಮತ್ತು ಕ್ಷೇತ್ರದಲ್ಲಿ ಸಿದ್ಧ','Total Registered Cadre':'ಒಟ್ಟು ನೋಂದಾಯಿತ ಪಡೆ','Police Background Checked':'ಪೊಲೀಸ್ ಹಿನ್ನೆಲೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ','Available On-Call':'ಕರೆಯಲ್ಲಿ ಲಭ್ಯ','Avg dispatch time: 4.2m':'ಸರಾಸರಿ ನಿಯೋಜನೆ ಸಮಯ: 4.2 ನಿ.','On Active Run':'ಸಕ್ರಿಯ ಕಾರ್ಯದಲ್ಲಿ','Delivering aid or medicine':'ನೆರವು ಅಥವಾ ಔಷಧ ವಿತರಣೆ','Off-Duty Cadre':'ಕರ್ತವ್ಯೇತರ ಪಡೆ','Resting / Night shift':'ವಿಶ್ರಾಂತಿ / ರಾತ್ರಿ ಪಾಳಿ','Registered Volunteer Network':'ನೋಂದಾಯಿತ ಸ್ವಯಂಸೇವಕ ಜಾಲ','Karnataka Police Civic Volunteer Cadre — Zone 4 Roster':'ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ನಾಗರಿಕ ಸ್ವಯಂಸೇವಕ ಪಡೆ — ವಲಯ 4 ಪಟ್ಟಿ','Volunteer Name':'ಸ್ವಯಂಸೇವಕರ ಹೆಸರು','Phone':'ದೂರವಾಣಿ','Assigned Area':'ನಿಯೋಜಿತ ಪ್ರದೇಶ','Current Status':'ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ','Missions Completed':'ಪೂರ್ಣಗೊಂಡ ಕಾರ್ಯಗಳು','Dispatch Action':'ನಿಯೋಜನೆ ಕ್ರಮ','Available on Field':'ಕ್ಷೇತ್ರದಲ್ಲಿ ಲಭ್ಯ','Off-Duty':'ಕರ್ತವ್ಯೇತರ','Tasks':'ಕಾರ್ಯಗಳು','View Profile':'ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಿ','Assign':'ನಿಯೋಜಿಸಿ','Civic Volunteer':'ನಾಗರಿಕ ಸ್ವಯಂಸೇವಕ','View volunteer details':'ಸ್ವಯಂಸೇವಕರ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ','Assign an open request to this volunteer':'ಈ ಸ್ವಯಂಸೇವಕರಿಗೆ ಮುಕ್ತ ವಿನಂತಿಯನ್ನು ನಿಯೋಜಿಸಿ',
  'Senior Citizens Registry':'ಹಿರಿಯ ನಾಗರಿಕರ ನೋಂದಣಿ','Verified senior citizens enrolled under Shirva Police Station Community Care Network.':'ಶಿರ್ವಾ ಪೊಲೀಸ್ ಠಾಣೆ ಸಮುದಾಯ ಆರೈಕೆ ಜಾಲದ ಅಡಿಯಲ್ಲಿ ನೋಂದಾಯಿತ ಪರಿಶೀಲಿತ ಹಿರಿಯ ನಾಗರಿಕರು.','Add Senior Citizen':'ಹಿರಿಯ ನಾಗರಿಕರನ್ನು ಸೇರಿಸಿ','Enrolled Citizens':'ನೋಂದಾಯಿತ ನಾಗರಿಕರು','Active Normal Care':'ಸಕ್ರಿಯ ಸಾಮಾನ್ಯ ಆರೈಕೆ','Priority Welfare Follow-ups':'ಆದ್ಯತೆಯ ಕಲ್ಯಾಣ ಅನುಸರಣೆ','SOS Panic Monitored':'SOS ತುರ್ತು ಮೇಲ್ವಿಚಾರಣೆ','Registered Beneficiaries':'ನೋಂದಾಯಿತ ಫಲಾನುಭವಿಗಳು','Priority assistance & daily welfare check registry':'ಆದ್ಯತೆಯ ನೆರವು ಮತ್ತು ದೈನಂದಿನ ಕಲ್ಯಾಣ ಪರಿಶೀಲನೆ ನೋಂದಣಿ','Name & Age':'ಹೆಸರು ಮತ್ತು ವಯಸ್ಸು','Area':'ಪ್ರದೇಶ','Sahayak ID':'ಸಹಾಯಕ ಐಡಿ','Emergency Contact':'ತುರ್ತು ಸಂಪರ್ಕ','Active Care':'ಸಕ್ರಿಯ ಆರೈಕೆ','Call':'ಕರೆ ಮಾಡಿ','Add a new senior citizen to the registry':'ನೋಂದಣಿಗೆ ಹೊಸ ಹಿರಿಯ ನಾಗರಿಕರನ್ನು ಸೇರಿಸಿ',
  'Emergency Assistance':'ತುರ್ತು ನೆರವು','Immediate response dashboard for high-urgency medical, fall, and distress SOS incidents.':'ತುರ್ತು ವೈದ್ಯಕೀಯ, ಬಿದ್ದು ಗಾಯವಾಗುವಿಕೆ ಮತ್ತು ಆತಂಕದ SOS ಘಟನೆಗಳಿಗೆ ತಕ್ಷಣದ ಪ್ರತಿಕ್ರಿಯೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್.','Active Emergencies':'ಸಕ್ರಿಯ ತುರ್ತುಗಳು','Active Emergencies Requiring Response':'ಪ್ರತಿಕ್ರಿಯೆ ಅಗತ್ಯವಿರುವ ಸಕ್ರಿಯ ತುರ್ತುಗಳು','ACTIVE EMERGENCY':'ಸಕ್ರಿಯ ತುರ್ತು','Logged':'ದಾಖಲಿಸಲಾಗಿದೆ','Emergency Type':'ತುರ್ತು ಪ್ರಕಾರ','Assigned Officer / Volunteer':'ನಿಯೋಜಿತ ಅಧಿಕಾರಿ / ಸ್ವಯಂಸೇವಕ','AI Helpline Audio Distress Log:':'ಎಐ ಸಹಾಯವಾಣಿ ಧ್ವನಿ ಆತಂಕ ದಾಖಲೆ:','View Location':'ಸ್ಥಳ ವೀಕ್ಷಿಸಿ','Mark Resolved':'ಪರಿಹರಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ','No Active Emergencies':'ಯಾವುದೇ ಸಕ್ರಿಯ ತುರ್ತುಗಳಿಲ್ಲ','All senior citizen SOS alerts and critical medical calls have been attended to and marked resolved.':'ಎಲ್ಲಾ ಹಿರಿಯ ನಾಗರಿಕರ SOS ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಗಂಭೀರ ವೈದ್ಯಕೀಯ ಕರೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಪರಿಹರಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಲಾಗಿದೆ.','View GPS address and vicinity map':'GPS ವಿಳಾಸ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ನಕ್ಷೆಯನ್ನು ವೀಕ್ಷಿಸಿ','Direct call to citizen':'ನಾಗರಿಕರಿಗೆ ನೇರ ಕರೆ','Assign police patrol or nearest volunteer':'ಪೊಲೀಸ್ ಗಸ್ತು ಅಥವಾ ಸಮೀಪದ ಸ್ವಯಂಸೇವಕರನ್ನು ನಿಯೋಜಿಸಿ','Mark emergency as resolved and log resolution':'ತುರ್ತು ಪರಿಸ್ಥಿತಿಯನ್ನು ಪರಿಹರಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ ಮತ್ತು ದಾಖಲಿಸಿ',
  'Portal Settings':'ಪೋರ್ಟಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು','Configure police station node, helpline routing, and emergency alert protocols.':'ಪೊಲೀಸ್ ಠಾಣೆ ನೋಡ್, ಸಹಾಯವಾಣಿ ಮಾರ್ಗನಿರ್ದೇಶನ ಮತ್ತು ತುರ್ತು ಎಚ್ಚರಿಕೆ ನಿಯಮಾವಳಿಗಳನ್ನು ಹೊಂದಿಸಿ.','Police Station Node Configuration':'ಪೊಲೀಸ್ ಠಾಣೆ ನೋಡ್ ಸಂರಚನೆ','Station Name':'ಠಾಣೆಯ ಹೆಸರು','Node Identifier':'ನೋಡ್ ಗುರುತಿನ ಸಂಖ್ಯೆ','Station Landline / Control Room':'ಠಾಣೆ ಲ್ಯಾಂಡ್‌ಲೈನ್ / ನಿಯಂತ್ರಣ ಕೊಠಡಿ','Station Officer-in-Charge':'ಠಾಣೆ ಪ್ರಭಾರಿ ಅಧಿಕಾರಿ','Emergency & Helpline Operational Settings':'ತುರ್ತು ಮತ್ತು ಸಹಾಯವಾಣಿ ಕಾರ್ಯಾಚರಣೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು','Audible Siren Alert on New SOS / Emergency Ingestion':'ಹೊಸ SOS / ತುರ್ತು ಸ್ವೀಕಾರಕ್ಕೆ ಶ್ರವ್ಯ ಸೈರನ್ ಎಚ್ಚರಿಕೆ','Automatic Volunteer WhatsApp Broadcast upon Emergency Ingestion':'ತುರ್ತು ಸ್ವೀಕಾರದ ನಂತರ ಸ್ವಯಂಚಾಲಿತ ಸ್ವಯಂಸೇವಕ ವಾಟ್ಸಾಪ್ ಪ್ರಸಾರ','High-Contrast Accessibility Mode (Complies with Govt of India Web Guidelines GIGW)':'ಹೆಚ್ಚಿನ ವ್ಯತ್ಯಾಸದ ಪ್ರವೇಶಸಾಧ್ಯತಾ ಮೋಡ್ (ಭಾರತ ಸರ್ಕಾರದ GIGW ವೆಬ್ ಮಾರ್ಗಸೂಚಿಗಳಿಗೆ ಅನುಗುಣ)','Save Settings':'ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಿ','Settings saved successfully.':'ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ.',
  'Official Civic Portal — District Administration Udupi & Karnataka State Police':'ಅಧಿಕೃತ ನಾಗರಿಕ ಪೋರ್ಟಲ್ — ಉಡುಪಿ ಜಿಲ್ಲಾ ಆಡಳಿತ ಮತ್ತು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್','Emergency Services Advisory: Dial 112 (Police / Unified SOS) | Dial 108 (Ambulance) | Senior Citizen Helpline: 14567.':'ತುರ್ತು ಸೇವೆಗಳ ಸಲಹೆ: 112 ಡಯಲ್ ಮಾಡಿ (ಪೊಲೀಸ್ / ಏಕೀಕೃತ SOS) | 108 ಡಯಲ್ ಮಾಡಿ (ಆಂಬ್ಯುಲೆನ್ಸ್) | ಹಿರಿಯ ನಾಗರಿಕರ ಸಹಾಯವಾಣಿ: 14567.','All dispatches logged under Sec 43/66 IT Act.':'ಎಲ್ಲಾ ನಿಯೋಜನೆಗಳು ಐಟಿ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 43/66 ಅಡಿಯಲ್ಲಿ ದಾಖಲಾಗುತ್ತವೆ.','Secured GovNet Tier-3 System':'ಸುರಕ್ಷಿತ ಗವ್‌ನೆಟ್ ಟಿಯರ್-3 ವ್ಯವಸ್ಥೆ','Incident Audio & GPS Audited':'ಘಟನೆ ಧ್ವನಿ ಮತ್ತು GPS ಪರಿಶೀಲಿಸಲಾಗಿದೆ'
});
Object.assign(UI_TRANSLATIONS.hi, {
  'Civic Volunteer Network':'नागरिक स्वयंसेवक नेटवर्क','Verified community volunteers registered with Shirva Police Station Sector.':'शिरवा पुलिस थाना क्षेत्र में पंजीकृत सत्यापित सामुदायिक स्वयंसेवक।','Active & Ready on Field':'सक्रिय और क्षेत्र में तैयार','Total Registered Cadre':'कुल पंजीकृत दल','Police Background Checked':'पुलिस पृष्ठभूमि सत्यापित','Available On-Call':'कॉल पर उपलब्ध','Avg dispatch time: 4.2m':'औसत भेजने का समय: 4.2 मिनट','On Active Run':'सक्रिय कार्य पर','Delivering aid or medicine':'सहायता या दवा पहुँचा रहे हैं','Off-Duty Cadre':'ड्यूटी से बाहर दल','Resting / Night shift':'आराम / रात्रि पाली','Registered Volunteer Network':'पंजीकृत स्वयंसेवक नेटवर्क','Karnataka Police Civic Volunteer Cadre — Zone 4 Roster':'कर्नाटक पुलिस नागरिक स्वयंसेवक दल — क्षेत्र 4 सूची','Volunteer Name':'स्वयंसेवक का नाम','Phone':'फ़ोन','Assigned Area':'आवंटित क्षेत्र','Current Status':'वर्तमान स्थिति','Missions Completed':'पूर्ण कार्य','Dispatch Action':'भेजने की कार्रवाई','Available on Field':'क्षेत्र में उपलब्ध','Off-Duty':'ड्यूटी से बाहर','Tasks':'कार्य','View Profile':'प्रोफ़ाइल देखें','Assign':'आवंटित करें','Civic Volunteer':'नागरिक स्वयंसेवक','View volunteer details':'स्वयंसेवक विवरण देखें','Assign an open request to this volunteer':'इस स्वयंसेवक को खुला अनुरोध आवंटित करें',
  'Senior Citizens Registry':'वरिष्ठ नागरिक रजिस्ट्री','Verified senior citizens enrolled under Shirva Police Station Community Care Network.':'शिरवा पुलिस थाना सामुदायिक देखभाल नेटवर्क के अंतर्गत पंजीकृत सत्यापित वरिष्ठ नागरिक।','Add Senior Citizen':'वरिष्ठ नागरिक जोड़ें','Enrolled Citizens':'पंजीकृत नागरिक','Active Normal Care':'सक्रिय सामान्य देखभाल','Priority Welfare Follow-ups':'प्राथमिक कल्याण अनुवर्ती','SOS Panic Monitored':'एसओएस आपात निगरानी','Registered Beneficiaries':'पंजीकृत लाभार्थी','Priority assistance & daily welfare check registry':'प्राथमिक सहायता और दैनिक कल्याण जाँच रजिस्ट्री','Name & Age':'नाम और आयु','Area':'क्षेत्र','Sahayak ID':'सहायक आईडी','Emergency Contact':'आपात संपर्क','Active Care':'सक्रिय देखभाल','Call':'कॉल करें','Add a new senior citizen to the registry':'रजिस्ट्री में नया वरिष्ठ नागरिक जोड़ें',
  'Emergency Assistance':'आपात सहायता','Immediate response dashboard for high-urgency medical, fall, and distress SOS incidents.':'गंभीर चिकित्सा, गिरने और संकट एसओएस घटनाओं के लिए तत्काल प्रतिक्रिया डैशबोर्ड।','Active Emergencies':'सक्रिय आपात स्थितियाँ','Active Emergencies Requiring Response':'प्रतिक्रिया आवश्यक सक्रिय आपात स्थितियाँ','ACTIVE EMERGENCY':'सक्रिय आपातकाल','Logged':'दर्ज','Emergency Type':'आपात प्रकार','Assigned Officer / Volunteer':'आवंटित अधिकारी / स्वयंसेवक','AI Helpline Audio Distress Log:':'एआई हेल्पलाइन ऑडियो संकट लॉग:','View Location':'स्थान देखें','Mark Resolved':'हल हुआ चिह्नित करें','No Active Emergencies':'कोई सक्रिय आपात स्थिति नहीं','All senior citizen SOS alerts and critical medical calls have been attended to and marked resolved.':'सभी वरिष्ठ नागरिक एसओएस अलर्ट और गंभीर चिकित्सा कॉल पर कार्रवाई कर उन्हें हल किया गया है।','View GPS address and vicinity map':'जीपीएस पता और आसपास का नक्शा देखें','Direct call to citizen':'नागरिक को सीधी कॉल','Assign police patrol or nearest volunteer':'पुलिस गश्त या निकटतम स्वयंसेवक आवंटित करें','Mark emergency as resolved and log resolution':'आपात स्थिति को हल हुआ चिह्नित करें और समाधान दर्ज करें',
  'Portal Settings':'पोर्टल सेटिंग्स','Configure police station node, helpline routing, and emergency alert protocols.':'पुलिस थाना नोड, हेल्पलाइन रूटिंग और आपात चेतावनी प्रोटोकॉल कॉन्फ़िगर करें।','Police Station Node Configuration':'पुलिस थाना नोड कॉन्फ़िगरेशन','Station Name':'थाना नाम','Node Identifier':'नोड पहचानकर्ता','Station Landline / Control Room':'थाना लैंडलाइन / नियंत्रण कक्ष','Station Officer-in-Charge':'थाना प्रभारी अधिकारी','Emergency & Helpline Operational Settings':'आपात और हेल्पलाइन संचालन सेटिंग्स','Audible Siren Alert on New SOS / Emergency Ingestion':'नए एसओएस / आपात प्राप्ति पर श्रव्य सायरन चेतावनी','Automatic Volunteer WhatsApp Broadcast upon Emergency Ingestion':'आपात प्राप्ति पर स्वचालित स्वयंसेवक व्हाट्सऐप प्रसारण','High-Contrast Accessibility Mode (Complies with Govt of India Web Guidelines GIGW)':'उच्च-कॉन्ट्रास्ट पहुँच मोड (भारत सरकार की GIGW वेब गाइडलाइन के अनुरूप)','Save Settings':'सेटिंग्स सहेजें','Settings saved successfully.':'सेटिंग्स सफलतापूर्वक सहेजी गईं।',
  'Official Civic Portal — District Administration Udupi & Karnataka State Police':'आधिकारिक नागरिक पोर्टल — उडुपी जिला प्रशासन और कर्नाटक राज्य पुलिस','Emergency Services Advisory: Dial 112 (Police / Unified SOS) | Dial 108 (Ambulance) | Senior Citizen Helpline: 14567.':'आपात सेवा सलाह: 112 डायल करें (पुलिस / एकीकृत एसओएस) | 108 डायल करें (एम्बुलेंस) | वरिष्ठ नागरिक हेल्पलाइन: 14567.','All dispatches logged under Sec 43/66 IT Act.':'सभी भेजने की कार्रवाइयाँ आईटी अधिनियम की धारा 43/66 के अंतर्गत दर्ज हैं।','Secured GovNet Tier-3 System':'सुरक्षित गवनेट टियर-3 सिस्टम','Incident Audio & GPS Audited':'घटना ऑडियो और जीपीएस ऑडिट किया गया'
});

function translateInterface(root = document) {
  const dictionary = UI_TRANSLATIONS[window.currentLanguage];
  if (!dictionary) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const original = node.nodeValue;
    const key = original.trim();
    if (dictionary[key]) node.nodeValue = original.replace(key, dictionary[key]);
  });
  root.querySelectorAll?.('[title],[aria-label],[placeholder]').forEach((element) => {
    ['title', 'aria-label', 'placeholder'].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value && dictionary[value]) element.setAttribute(attribute, dictionary[value]);
    });
  });
}

/* ── Route Resolver ────────────────────────────────────────────── */
function getPageContent(path) {
  switch (path) {
    case 'dashboard':
      return renderDashboardPage();
    case 'requests':
    case 'assistance-requests':
      return renderRequestsPage(currentRequestsFilter, currentRequestsSearch);
    case 'volunteers':
      return renderVolunteersPage();
    case 'senior-citizens':
      return renderSeniorCitizensPage();
    case 'emergency':
    case 'emergency-requests':
      return renderEmergencyPage();
    case 'settings':
      return renderSettingsPage();
    default:
      return renderDashboardPage();
  }
}

/* ── High-Performance Top Route Loading Bar ─────────────────────── */
function triggerTopLoader() {
  const loader = document.getElementById('portal-top-loader');
  if (!loader) return;
  loader.classList.remove('loading');
  loader.style.width = '0%';
  loader.style.opacity = '1';
  void loader.offsetWidth; // force reflow
  loader.classList.add('loading');
  loader.style.width = '70%';
  setTimeout(() => {
    loader.style.width = '100%';
    setTimeout(() => {
      loader.classList.remove('loading');
      loader.style.opacity = '0';
      setTimeout(() => {
        if (loader) loader.style.width = '0%';
      }, 250);
    }, 180);
  }, 160);
}

/* ── Global HUD Toast Notification System ──────────────────────── */
window.showToast = function({ title, message, type = 'info', duration = 3800 }) {
  let container = document.getElementById('gov-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'gov-toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `gov-toast gov-toast--${type}`;

  const iconMap = {
    success: 'check_circle',
    emergency: 'emergency',
    info: 'notifications_active',
  };
  const icon = iconMap[type] || 'info';

  toast.innerHTML = `
    <div class="gov-toast__icon-wrap">
      <span class="material-symbols-outlined" style="font-size:20px;">${icon}</span>
    </div>
    <div class="gov-toast__content">
      <span class="gov-toast__title">${title}</span>
      <span class="gov-toast__message">${message}</span>
    </div>
    <button type="button" class="gov-toast__close" aria-label="Dismiss notification">
      <span class="material-symbols-outlined" style="font-size:18px;">close</span>
    </button>
    <div class="gov-toast__progress" style="animation-duration:${duration}ms;"></div>
  `;

  const closeBtn = toast.querySelector('.gov-toast__close');
  let dismissTimeout;

  const dismiss = () => {
    clearTimeout(dismissTimeout);
    toast.classList.add('toast-exit');
    setTimeout(() => {
      toast.remove();
    }, 300);
  };

  closeBtn.addEventListener('click', dismiss);
  dismissTimeout = setTimeout(dismiss, duration);

  container.appendChild(toast);
};

/* ── Modal Animation Helpers ───────────────────────────────────── */
function openModalAnimated(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.removeAttribute('hidden');
  const dialog = modal.querySelector('.gov-modal');
  if (dialog) {
    dialog.style.animation = 'modalSpringUp 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards';
  }
  modal.style.animation = 'backdropFadeIn 0.25s ease-out forwards';
}

function closeModalAnimated(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal || modal.hasAttribute('hidden')) return;
  const dialog = modal.querySelector('.gov-modal');
  if (dialog) {
    dialog.style.animation = 'modalSpringUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards';
  }
  modal.style.animation = 'backdropFadeIn 0.2s ease-out reverse forwards';
  setTimeout(() => {
    modal.setAttribute('hidden', '');
    if (dialog) dialog.style.animation = '';
    modal.style.animation = '';
  }, 190);
}

/* ── Master Render Function ────────────────────────────────────── */
function render(path) {
  // Trigger top route loading animation
  triggerTopLoader();

  // Normalize legacy or alias paths
  if (path === 'assistance-requests') path = 'requests';
  if (path === 'emergency-requests') path = 'emergency';
  if (!path) path = 'dashboard';

  currentPath = path;

  // Render Shell
  const topbarRoot = document.getElementById('topbar-root');
  const sidebarRoot = document.getElementById('sidebar-root');
  const pageContent = document.getElementById('page-content');
  const modalRoot = document.getElementById('modal-root');

  if (topbarRoot) topbarRoot.innerHTML = renderTopbar();
  if (sidebarRoot) sidebarRoot.innerHTML = renderSidebar(path);
  
  if (pageContent) {
    pageContent.classList.remove('page-enter');
    pageContent.innerHTML = getPageContent(path);
    void pageContent.offsetWidth; // force DOM reflow for crisp animation replay
    pageContent.classList.add('page-enter');
  }

  if (modalRoot && !modalRoot.hasChildNodes()) {
    modalRoot.innerHTML = renderModals();
  }

  translateInterface(document);

  // Update Page Title
  document.title = `${formatTitle(path)} — SAHAYAK Police & Community Assistance Portal`;

  // Update URL hash without causing a page jump
  history.replaceState(null, '', `#${path}`);
}

function formatTitle(path) {
  return path.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ── Navigation ────────────────────────────────────────────────── */
window.navigate = function(path) {
  if (path === currentPath) return;
  render(path);
  if (sidebarOpen) toggleSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* ── Sidebar Mobile Toggle ─────────────────────────────────────── */
window.toggleSidebar = function() {
  sidebarOpen = !sidebarOpen;
  const sidebar = document.getElementById('main-sidebar');
  if (sidebar) {
    sidebar.classList.toggle('sidebar--open', sidebarOpen);
  }
};

/* ── Language Switcher (English | ಕನ್ನಡ | हिंदी) ────────────────── */
window.setLang = function(lang) {
  window.currentLanguage = lang;
  render(currentPath);
  const messages = { en: 'Interface updated to English.', kn: 'Interface updated to Kannada.', hi: 'Interface updated to Hindi.' };
  window.showToast({
    title: UI_TRANSLATIONS[lang]?.['Language Switched'] || 'Language Switched',
    message: UI_TRANSLATIONS[lang]?.[messages[lang]] || messages[lang] || messages.en,
    type: 'info',
    duration: 3500
  });
};

/* ── Logout Handler ────────────────────────────────────────────── */
window.handleLogout = function() {
  if (!confirm('Are you sure you want to log out of the SAHAYAK portal?')) return;
  sessionStorage.removeItem('loggedIn');
  sessionStorage.removeItem('userRole');

  const loginEl = document.getElementById('login-root');
  const appEl = document.getElementById('app-shell');
  if (loginEl && appEl) {
    loginEl.classList.add('visible');
    appEl.classList.remove('visible');
    document.title = 'Sign In — SAHAYAK Community Assistance Portal';
    history.replaceState(null, '', window.location.pathname);
  } else {
    window.location.reload();
  }
};

/* ── Request Details Modal Handlers ────────────────────────────── */
window.openRequestDetails = function(requestId) {
  const req = getRequestById(requestId);
  if (!req) {
    window.showToast({ title: 'Not Found', message: `Request ${requestId} not found.`, type: 'emergency' });
    return;
  }

  const bodyEl = document.getElementById('reqModalBody');
  const footerEl = document.getElementById('reqModalFooter');
  const titleEl = document.getElementById('reqModalTitle');

  if (titleEl) titleEl.textContent = `Request ${req.id} — ${req.seniorCitizen}`;

  const { bodyHtml, footerHtml } = buildRequestDetailsHtml(req);
  if (bodyEl) bodyEl.innerHTML = bodyHtml;
  if (footerEl) footerEl.innerHTML = footerHtml;

  translateInterface(document.getElementById('requestDetailsModal'));
  openModalAnimated('requestDetailsModal');
};

window.closeRequestDetailsModal = function() {
  closeModalAnimated('requestDetailsModal');
};

/* ── AI Voice Call History Modal Handlers ──────────────────────── */
window.openCallHistoryModal = function() {
  translateInterface(document.getElementById('callHistoryModal'));
  openModalAnimated('callHistoryModal');
};

window.closeCallHistoryModal = function() {
  closeModalAnimated('callHistoryModal');
};

/* ── Register Senior Citizen Modal Handlers ────────────────────── */
window.openRegisterCitizenModal = function() {
  document.getElementById('registerCitizenForm')?.reset();
  translateInterface(document.getElementById('registerCitizenModal'));
  openModalAnimated('registerCitizenModal');
};

window.closeRegisterCitizenModal = function() {
  closeModalAnimated('registerCitizenModal');
};

window.handleCitizenFormSubmit = function(event) {
  event.preventDefault();
  const name = document.getElementById('citizenName')?.value.trim();
  const age = document.getElementById('citizenAge')?.value.trim();
  const phone = document.getElementById('citizenPhone')?.value.trim();
  const area = document.getElementById('citizenArea')?.value.trim();
  const emergencyContact = document.getElementById('citizenContact')?.value.trim();
  const notes = document.getElementById('citizenNotes')?.value.trim();

  if (!name || !phone || !area) {
    window.showToast({ title: 'Missing Information', message: 'Please fill in all mandatory fields.', type: 'emergency' });
    return;
  }

  const newCitizen = addSeniorCitizen({ name, age, phone, area, emergencyContact, notes });
  closeRegisterCitizenModal();
  window.showToast({
    title: 'Senior Citizen Registered',
    message: `${newCitizen.name} enrolled with Sahayak ID ${newCitizen.sahayakId} (${newCitizen.area}).`,
    type: 'success',
    duration: 4500
  });
  render(currentPath);
};

/* ── Request Actions ───────────────────────────────────────────── */
window.callSeniorCitizen = function(phone, name) {
  const confirmCall = confirm(`Initiate direct call to Senior Citizen:\n\nName: ${name}\nPhone: ${phone}\n\nCall now?`);
  if (confirmCall) {
    window.location.href = `tel:${phone}`;
  }
};

window.promptAssignVolunteer = function(requestId) {
  const available = getAvailableVolunteers();
  const volunteerNames = available.map((v, i) => `${i + 1}. ${v.name} (${v.area}, ${v.phone})`).join('\n');
  const promptMsg = available.length > 0
    ? `Assign Volunteer to Request ${requestId}:\n\nAvailable Volunteers:\n${volunteerNames}\n\nEnter the number of the volunteer to assign (1 to ${available.length}):`
    : `No volunteers currently marked Available.\n\nAssign anyway? Type volunteer name:`;

  const response = prompt(promptMsg, '1');
  if (response !== null && response.trim() !== '') {
    let chosenVolunteer = null;
    const index = parseInt(response.trim(), 10) - 1;
    if (!isNaN(index) && available[index]) {
      chosenVolunteer = available[index];
    } else {
      chosenVolunteer = { name: response.trim(), phone: '+91 98860 00000' };
    }

    updateRequestStatus(requestId, 'Assigned', chosenVolunteer);
    closeRequestDetailsModal();
    window.showToast({
      title: 'Volunteer Dispatched',
      message: `${chosenVolunteer.name} assigned to Request ${requestId}. SMS & IVR alert dispatched.`,
      type: 'success',
      duration: 4000
    });
    render(currentPath);
  }
};

window.markRequestCompleted = function(requestId) {
  if (confirm(`Mark request ${requestId} as COMPLETED?\n\nThis will record delivery/fulfillment in station logs and notify the senior citizen.`)) {
    updateRequestStatus(requestId, 'Completed');
    closeRequestDetailsModal();
    window.showToast({
      title: 'Request Completed',
      message: `Request ${requestId} resolved and logged in station records.`,
      type: 'success',
      duration: 3800
    });
    render(currentPath);
  }
};

/* ── Volunteers Page Actions ───────────────────────────────────── */
window.viewVolunteerProfile = function(name, phone, area, status, completed) {
  window.showToast({
    title: `Volunteer: ${name}`,
    message: `${phone} | ${area} | Status: ${status} | ${completed} completed | Police Verified`,
    type: 'info',
    duration: 5000
  });
};

window.assignRequestToVolunteer = function(volunteerName) {
  const pendingRequests = getRequests().filter((r) => r.status === 'Pending');
  if (pendingRequests.length === 0) {
    window.showToast({
      title: 'No Pending Requests',
      message: `No pending requests available to assign to ${volunteerName}.`,
      type: 'info',
      duration: 3500
    });
    return;
  }

  const list = pendingRequests.map((r, i) => `${i + 1}. ${r.id} — ${r.seniorCitizen} (${r.request})`).join('\n');
  const choice = prompt(`Select a pending request to assign to ${volunteerName}:\n\n${list}\n\nEnter number (1 to ${pendingRequests.length}):`, '1');
  if (choice !== null) {
    const idx = parseInt(choice.trim(), 10) - 1;
    if (!isNaN(idx) && pendingRequests[idx]) {
      const selectedReq = pendingRequests[idx];
      updateRequestStatus(selectedReq.id, 'Assigned', { name: volunteerName, phone: '+91 98863 00000' });
      window.showToast({
        title: 'Task Assigned',
        message: `${selectedReq.id} assigned to ${volunteerName}.`,
        type: 'success',
        duration: 3800
      });
      render(currentPath);
    }
  }
};

/* ── Emergency Actions ─────────────────────────────────────────── */
window.viewEmergencyLocation = function(id, location) {
  window.showToast({
    title: `GPS Dispatched — Emergency ${id}`,
    message: `${location} — Jurisdiction: Shirva Beat #3. Nearest patrol: 0.8 km.`,
    type: 'emergency',
    duration: 5500
  });
};

window.markEmergencyResolved = function(id) {
  if (confirm(`Confirm emergency ${id} resolved?\n\nMedical / Police welfare report will be logged.`)) {
    updateRequestStatus(id, 'Completed');
    window.showToast({
      title: 'Emergency Resolved',
      message: `Emergency ${id} marked as resolved. Police incident log updated.`,
      type: 'success',
      duration: 4500
    });
    render(currentPath);
  }
};

/* ── Requests Page Filter, Search & View Mode ──────────────────── */
window.setRequestsFilter = function(filter) {
  currentRequestsFilter = filter;
  render('requests');
};

window.handleRequestsSearch = function(query) {
  currentRequestsSearch = query;
  render('requests');
};

window.setRequestsViewMode = function(mode) {
  window.requestsViewMode = mode;
  render('requests');
};

/* ── Backdrop click to close modals ────────────────────────────── */
document.addEventListener('click', (e) => {
  const reqModal = document.getElementById('requestDetailsModal');
  if (reqModal && !reqModal.hasAttribute('hidden') && e.target === reqModal) {
    closeRequestDetailsModal();
  }
  const callModal = document.getElementById('callHistoryModal');
  if (callModal && !callModal.hasAttribute('hidden') && e.target === callModal) {
    closeCallHistoryModal();
  }
  const regModal = document.getElementById('registerCitizenModal');
  if (regModal && !regModal.hasAttribute('hidden') && e.target === regModal) {
    closeRegisterCitizenModal();
  }
});

/* ── Keyboard Esc key to close modals ──────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeRequestDetailsModal();
    closeCallHistoryModal();
    closeRegisterCitizenModal();
  }
});

/* ── Boot Process ──────────────────────────────────────────────── */
(function boot() {
  const hash = window.location.hash.slice(1);
  const initialPath = hash || 'dashboard';
  render(initialPath);
})();
