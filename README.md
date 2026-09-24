🛡️ SAHAYAK

AI-Assisted Senior Citizen Assistance & Civic Support Platform

«A frontend prototype designed to demonstrate a technology-enabled assistance system for senior citizens, connecting them with authorized civic/police personnel and verified volunteers.»

---

📌 Project Overview

SAHAYAK is a proposed digital assistance platform designed primarily for senior citizens who may live alone or face difficulties performing everyday tasks or accessing digital services.

The core idea is to provide senior citizens with a simple voice-based way to request assistance, instead of requiring them to operate complicated mobile applications.

The assistance request can then be handled through a dedicated Civic/Police Operations Portal, where authorized personnel can view requests and coordinate with verified volunteers.

The project combines:

- 👴 Senior Citizen Assistance
- 📞 AI-Assisted Voice Helpline
- 👮 Civic / Police Operations
- 🤝 Volunteer Coordination
- 🚨 Emergency Assistance
- 🛒 Essential Item Assistance
- 💊 Medicine Assistance
- 📍 Location-Based Assistance
- 🌐 Multilingual Support

⚠️ Important Project Status

This GitHub repository contains ONLY THE FRONTEND PROTOTYPE.

The current project is intended for UI demonstration, workflow demonstration, project presentation, and prototype evaluation.

It does not currently contain a production backend or live service integrations.

---

🎯 Problem Statement

Many senior citizens, particularly those who live alone, may need help with simple but important tasks such as:

- Getting groceries
- Purchasing medicines
- Getting essential household items
- LPG-related assistance
- Attending appointments
- Getting help during emergencies
- Accessing civic services

Although many online services already exist, they often require users to:

- Own a smartphone
- Install applications
- Create accounts
- Navigate multiple screens
- Enter information manually
- Understand digital interfaces

This can create an additional barrier for elderly users.

SAHAYAK's proposed solution

Instead of making the senior citizen learn a complicated application, SAHAYAK proposes a voice-first assistance system.

Senior Citizen
      │
      │ Phone Call
      ▼
AI Voice Helpline
      │
      │ Understands Request
      ▼
Assistance Request
      │
      ▼
Civic / Police Portal
      │
      ├──────────────► Emergency Services
      │
      ▼
Verified Volunteer
      │
      ▼
Assistance Provided
      │
      ▼
Request Completed

---

👥 Target Users

1. 👴 Senior Citizens

Senior citizens are the primary beneficiaries of the proposed system.

They should not be required to operate the main web portal.

Instead, the proposed system provides a phone-based voice interaction for requesting assistance.

---

2. 👮 Civic / Police Personnel

Authorized personnel can use the operations portal to:

- Monitor requests
- View senior citizen profiles
- Monitor emergency cases
- Manage volunteers
- Assign assistance requests
- Track request status
- Coordinate community support

---

3. 🤝 Verified Volunteers

Volunteers can assist senior citizens with requests such as:

- Grocery collection
- Medicine collection
- Essential item delivery
- Local assistance
- Other approved support activities

---

📞 AI Voice Helpline

One of the main concepts of SAHAYAK is an AI-assisted voice helpline for senior citizens.

A senior citizen can call the designated helpline and explain their requirement naturally.

Example

«"I need some medicine from the nearby medical shop, but I cannot go there."»

The proposed AI system could:

1. Receive the call.
2. Understand the senior citizen's speech.
3. Identify the required assistance.
4. Identify whether the request is urgent.
5. Create a structured assistance request.
6. Forward the request to the operations portal.
7. Allow an authorized person to coordinate assistance.

---

🌐 Multilingual Support

The proposed AI helpline is intended to support multiple languages, making the service easier for elderly citizens who may not be comfortable communicating in English.

The frontend interface includes support/design considerations for:

- English
- Kannada

Additional regional languages can be integrated into the future AI voice system.

---

🆔 SAHAYAK Unique ID System

The proposed system includes a unique identification mechanism.

👴 Senior Citizen SAHAYAK ID

When a senior citizen registers for the first time, the system can generate a unique SAHAYAK ID.

This ID can be used for future identification instead of repeatedly entering personal information.

Example

SAHAYAK-SC-2026-XXXX

The exact ID format can be implemented by the future backend.

---

🤝 Volunteer Unique ID

Similarly, each registered volunteer can receive a unique Volunteer SAHAYAK ID.

The ID can be used for:

- Volunteer identification
- Login
- Assignment tracking
- Verification
- Assistance history

---

🔐 Login & Access Concept

The proposed platform contains different access categories.

                    SAHAYAK
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       Portal       Volunteer    Senior Citizen
        User           │              │
          │            │              │
          ▼            ▼              ▼
     Operations     Volunteer      Profile /
       Portal        Profile       Voice Access

Portal User

Authorized personnel can access the complete operational dashboard.

Volunteer

Volunteers can access their profile and assigned assistance information.

Senior Citizen

The senior citizen experience is intended to remain primarily voice-based, rather than requiring them to navigate a complex website.

---

🖥️ Frontend Portal

The current repository demonstrates the Civic/Police Operations Portal.

The portal is designed with a simple, professional, government-oriented interface.

---

📊 Dashboard

The dashboard provides an operational overview.

Possible dashboard information includes:

- Total requests
- Pending requests
- Active requests
- Completed requests
- Emergency requests
- Active volunteers
- Senior citizen count
- Recent activities

The current displayed information is prototype/demo data.

---

📋 Assistance Requests

The Requests section demonstrates how operators can manage assistance requests.

A request can contain:

- Request ID
- Senior citizen
- SAHAYAK ID
- Request category
- Description
- Location
- Priority
- Status
- Assigned volunteer
- Request time
- AI-generated summary

Request lifecycle

New
 ↓
Verification
 ↓
Volunteer Assignment
 ↓
Accepted
 ↓
Volunteer En Route
 ↓
Assistance Provided
 ↓
Completed

---

🚨 Emergency Management

The Emergency section provides a dedicated interface for urgent cases.

Potential emergency categories include:

- Medical emergency
- Fall-related emergency
- Immediate assistance
- SOS request
- Other urgent situations

Emergency requests can be highlighted for faster attention.

Important

The current emergency section is only a frontend demonstration.

It is not currently connected to:

- Police emergency systems
- Ambulance systems
- Live SOS infrastructure
- Government APIs
- Real-time emergency services

---

👴 Senior Citizen Management

The portal provides a dedicated senior citizen section.

Authorized personnel can potentially view:

- Senior Citizen SAHAYAK ID
- Name
- Contact details
- Address/location
- Emergency contact
- Assistance history
- Current requests
- Profile information

The current implementation demonstrates the interface using prototype data.

---

🤝 Volunteer Management

The Volunteers section allows operators to view volunteer information.

Potential information includes:

- Volunteer ID
- Volunteer name
- Contact information
- Availability
- Location
- Current assignment
- Verification status
- Assistance history

The proposed system can eventually use volunteer availability and location to help assign suitable volunteers.

---

📍 Location-Based Assistance

A future backend implementation can integrate location services to support:

- Nearby volunteer identification
- Volunteer-to-request matching
- Location-based assignment
- Route information
- Emergency response coordination

The current repository does not contain live GPS functionality.

---

🔔 Notifications

Future versions can integrate:

- SMS notifications
- Voice notifications
- WhatsApp notifications
- Push notifications
- Emergency alerts

These features are not part of the current frontend-only implementation.

---

🏛️ Government / Civic Website Design

The frontend follows a professional civic/government-oriented visual approach.

Design goals include:

- Simple navigation
- Clear information hierarchy
- Professional appearance
- Easy-to-understand dashboards
- Accessibility-focused interface
- Consistent layouts
- Clear status indicators
- Responsive design

The intention is to make the portal suitable for demonstrating how a civic assistance control center could operate.

---

🧩 Frontend Modules

The current frontend contains interfaces for:

🔐 Login

Authentication interface prototype.

📊 Dashboard

Overall operational overview.

📋 Requests

Assistance request management.

🤝 Volunteers

Volunteer management interface.

👴 Senior Citizens

Senior citizen information and profiles.

🚨 Emergency

Emergency request monitoring.

⚙️ Settings

Portal configuration interface.

👤 Profiles

Volunteer and senior citizen profile interfaces.

---

🏗️ Technology Stack

The current project is a frontend web application.

Technologies

- HTML5
- CSS3
- JavaScript
- ES Modules
- Responsive Web Design

Current Architecture

HTML
 │
 ├── Pages
 │
 └── JavaScript
       │
       ├── Components
       ├── Pages
       ├── Data
       └── Application Router
              │
              └── UI

---

📁 Project Structure

SAHAYAK/
│
├── index.html
├── login.html
├── portal.html
├── senior.html
├── volunteer.html
│
├── src/
│   │
│   ├── app.js
│   │
│   ├── components/
│   │   ├── modal.js
│   │   ├── sidebar.js
│   │   └── topbar.js
│   │
│   ├── data/
│   │   ├── portalData.js
│   │   └── requests.js
│   │
│   ├── pages/
│   │   ├── dashboard.js
│   │   ├── requests.js
│   │   ├── volunteers.js
│   │   ├── seniorCitizens.js
│   │   ├── emergency.js
│   │   ├── settings.js
│   │   ├── login.js
│   │   └── placeholder.js
│   │
│   └── styles/
│       ├── animations.css
│       ├── components.css
│       ├── global.css
│       ├── layout.css
│       └── tokens.css
│
├── assets/
│
├── vercel.json
├── netlify.toml
└── _redirects

---

▶️ Running the Frontend Locally

Because the project uses JavaScript modules, it should be opened through a local development server.

Using VS Code + Live Server

Step 1

Clone or download the repository.

Step 2

Open the complete project folder in VS Code.

Step 3

Install the Live Server extension if it is not already installed.

Step 4

Open:

index.html

Step 5

Right-click "index.html".

Select:

Open with Live Server

⚠️ Important

Do not open "portal.html" directly from File Explorer.

The application depends on the "src/" directory and JavaScript modules.

---

🌍 Deployment

The frontend can be deployed using static hosting platforms such as:

- Vercel
- Netlify
- GitHub Pages
- Other static hosting services

The repository already contains deployment-related configuration files.

vercel.json
netlify.toml
_redirects

Vercel

The project can be imported directly from GitHub into Vercel.

Make sure the selected project/root directory contains:

index.html
src/
assets/

---

⚠️ Current Limitations

This repository is NOT a complete production system.

It currently does not contain:

- ❌ Backend server
- ❌ Production database
- ❌ Real authentication
- ❌ Real user registration
- ❌ Real SAHAYAK ID generation backend
- ❌ AI voice calling system
- ❌ Speech-to-text backend
- ❌ Text-to-speech backend
- ❌ Live GPS tracking
- ❌ Real-time volunteer tracking
- ❌ Police API integration
- ❌ Ambulance API integration
- ❌ Government API integration
- ❌ SMS gateway
- ❌ WhatsApp API
- ❌ Production notification system
- ❌ Real emergency dispatch system

All data displayed in the current frontend is intended for prototype and demonstration purposes.

---

🔮 Future Scope

The frontend can be connected to a complete backend system in future development.

1. Backend

A backend can manage:

- Users
- Senior citizens
- Volunteers
- Requests
- Emergency cases
- Authentication
- Notifications
- Assistance history

---

2. Database

A production database can store:

Senior Citizens
Volunteers
Portal Users
Requests
Emergency Records
Locations
Assignments
Notifications
Activity Logs

---

3. AI Voice Agent

The proposed AI system can:

- Receive calls
- Understand speech
- Support regional languages
- Identify requests
- Detect emergency situations
- Generate structured requests
- Communicate with the backend
- Notify authorized personnel

---

4. Smart Volunteer Assignment

A future system can automatically identify suitable volunteers based on:

- Location
- Availability
- Request category
- Distance
- Volunteer verification
- Current workload

---

5. Emergency Integration

Future integration can connect the system with appropriate emergency services.

Potential functionality:

Emergency Detected
       ↓
Priority Request
       ↓
Operator Notification
       ↓
Emergency Service / Volunteer
       ↓
Response Tracking

---

6. Communication

Future versions can integrate:

- Phone calls
- SMS
- WhatsApp
- Push notifications
- Automated voice notifications

---

🔒 Security Considerations

A production implementation should include:

- Secure authentication
- Role-based access control
- Encrypted communication
- Secure database storage
- API authentication
- Data minimization
- Activity logging
- Secure handling of emergency information
- Privacy protection for senior citizens

---

🧑‍💻 Development Philosophy

SAHAYAK follows a voice-first approach for senior citizens and an operations-first approach for authorized personnel.

The idea is:

«The technology should adapt to the senior citizen, rather than forcing the senior citizen to adapt to complicated technology.»

---

🌟 Key Innovation

The key concept behind SAHAYAK is not simply another senior-citizen application.

Instead, it proposes a combination of:

Voice Accessibility
        +
AI Assistance
        +
Civic / Police Coordination
        +
Verified Volunteers
        +
Emergency Support

This creates a potential bridge between senior citizens who need help and people who can provide that help.

---

🎓 Project Context

Project Name: SAHAYAK

Project Type: Frontend Prototype / UI Demonstration

Domain:

- Civic Technology
- Social Impact
- Senior Citizen Assistance
- AI-Assisted Services
- Emergency Support
- Community Volunteering

Primary Beneficiaries: Senior Citizens

Operational Users: Authorized Civic/Police Personnel and Verified Volunteers

---

📌 Prototype Disclaimer

«SAHAYAK is currently a frontend prototype created to demonstrate the proposed system, interface, workflow, and user experience.

The information, requests, profiles, volunteers, statistics, and emergency cases shown in the interface are demonstration data.

The frontend is not currently connected to a live backend, database, AI voice system, police infrastructure, emergency services, or other production systems.»

---

🚀 Future Vision

SAHAYAK aims to evolve into a complete community assistance ecosystem where a senior citizen can simply make a phone call and ask for help, while the technology handles the complexity behind the scenes.

             ┌──────────────────────┐
             │    SENIOR CITIZEN    │
             └──────────┬───────────┘
                        │
                     Phone Call
                        │
                        ▼
             ┌──────────────────────┐
             │   AI VOICE AGENT     │
             └──────────┬───────────┘
                        │
                 Request Created
                        │
                        ▼
             ┌──────────────────────┐
             │ CIVIC / POLICE       │
             │ OPERATIONS PORTAL    │
             └──────────┬───────────┘
                        │
                 Assign Assistance
                        │
                        ▼
             ┌──────────────────────┐
             │ VERIFIED VOLUNTEER   │
             └──────────┬───────────┘
                        │
                        ▼
                 HELP PROVIDED
                        │
                        ▼
                  CASE CLOSED

---

❤️ SAHAYAK

«"A helping hand when it matters."»

SAHAYAK envisions a future where senior citizens can access assistance without needing to understand complicated technology — simply by asking for help.