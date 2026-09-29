# Django + React Standard Project Development Manual

## A Practical Development Order for Professional Full-Stack Systems

### Purpose

This manual defines the recommended order for building a professional Django REST Framework + React + PostgreSQL application.

The goal is to prevent random development, repeated work, missing architecture, and frontend/backend confusion.

Use this workflow for systems such as:

* Identity management systems
* School management systems
* Hospital systems
* Banking or financial platforms
* E-commerce systems
* Government platforms
* Business management systems
* Authentication platforms
* Verification systems

The exact features will change from project to project, but the **development order should remain largely consistent**.

---

# PHASE 1 — UNDERSTAND THE SYSTEM

Do not start coding immediately.

Before creating Django models or React components, understand what the system is supposed to accomplish.

## Step 1 — Define the Problem

Write down:

* What problem does the system solve?
* Who uses it?
* Why does it exist?
* What process is currently difficult?
* What will the system improve?

Example:

```text
KNOWN solves the problem of securely verifying
the identity of registered individuals using
digital identity credentials and verification methods.
```

---

## Step 2 — Identify the Users

Determine the different types of people who will use the system.

Example:

```text
Administrator
Verification Officer
Registered User
System Auditor
```

For each user type, determine:

* What can they see?
* What can they create?
* What can they edit?
* What can they delete?
* What can they verify?
* What should they not be allowed to access?

This later becomes the basis for permissions.

---

## Step 3 — Define Core Features

Separate features into functional areas.

Example for KNOWN:

```text
Authentication
Identity Management
Identity Verification
Face Verification
QR Verification
User Management
Verification Logs
QR Credential Management
Audit Logs
System Settings
```

Do not implement everything at once.

Create a feature list first.

---

# PHASE 2 — DOCUMENTATION

Before serious development, create your documentation structure.

A professional project should not exist only inside source code.

Recommended structure:

```text
Project/
│
├── Frontend/
├── Backend/
├── Documentation/
├── Design/
├── Requirements/
├── Research/
├── Testing/
└── README.md
```

Useful documentation files:

```text
Documentation/
├── system_purpose.md
├── architecture.md
├── api_documentation.md
├── database.md
├── authentication.md
└── deployment.md

Requirements/
├── functional_requirements.md
├── non_functional_requirements.md
└── user_roles.md

Research/
├── technology_research.md
└── security_research.md
```

---

# PHASE 3 — DESIGN THE SYSTEM

Before implementation, design the architecture.

## Step 4 — Design the System Architecture

Think about the major layers:

```text
React Frontend
       ↓
REST API
       ↓
Django REST Framework
       ↓
Business Logic
       ↓
PostgreSQL
```

Additional services may exist:

```text
React
  ↓
Django REST API
  ↓
PostgreSQL

External services:
├── Email
├── File Storage
├── Face Recognition
├── QR Generation
└── Notifications
```

---

## Step 5 — Design the Database

Determine your entities before writing models.

For example:

```text
User
   │
   └── Identity
          │
          ├── FaceCredential
          ├── QRCode
          └── Verification

Verification
   │
   └── AuditLog
```

For every entity determine:

* Fields
* Data types
* Relationships
* Required fields
* Optional fields
* Unique fields
* Status fields
* Timestamps

Then create the Django models.

---

# PHASE 4 — CREATE THE BACKEND

Now begin Django development.

## Step 6 — Create the Django Project

Create the virtual environment first.

```bash
python -m venv venv
```

Activate it.

Then install your core packages.

Typical stack:

```text
Django
Django REST Framework
django-cors-headers
djangorestframework-simplejwt
psycopg
```

---

## Step 7 — Create the Django Project

Example:

```bash
django-admin startproject config .
```

The project should have a clear project configuration package.

Example:

```text
Backend/
│
├── manage.py
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
└── apps/
```

---

# PHASE 5 — CONFIGURE DJANGO

## Step 8 — Configure `settings.py`

Treat `settings.py` as the configuration center.

Configure:

```text
INSTALLED_APPS
DATABASES
MIDDLEWARE
CORS
REST_FRAMEWORK
AUTH_USER_MODEL
STATIC FILES
MEDIA FILES
JWT
```

Understand each configuration instead of blindly copying it.

---

# PHASE 6 — CUSTOM USER AND AUTHENTICATION

## Step 9 — Create the User System Early

If your project requires authentication, decide this **before creating dependent models**.

For professional systems, determine whether the default Django User is sufficient.

If not, create:

```python
class User(AbstractUser):
    email = models.EmailField(unique=True)
```

Then configure:

```python
AUTH_USER_MODEL = "accounts.User"
```

Do this early because many other models may depend on the user model.

---

## Step 10 — Run Initial Migrations

Use:

```bash
python manage.py makemigrations
python manage.py migrate
```

Understand the difference:

```text
makemigrations
    ↓
Creates migration instructions

migrate
    ↓
Applies those instructions to the database
```

---

## Step 11 — Create the Admin User

Create a superuser:

```bash
python manage.py createsuperuser
```

Then test:

```text
Django Admin
```

before moving too far.

---

# PHASE 7 — BUILD THE CORE DATA MODELS

## Step 12 — Implement Your Domain Models

Now implement the actual system entities.

For KNOWN:

```text
User
Identity
FaceCredential
QRCode
Verification
AuditLog
```

Use proper relationships:

```text
OneToOne
ForeignKey
ManyToMany
```

Use:

```text
unique=True
choices=
null=
blank=
default=
```

where appropriate.

---

## Step 13 — Migrate After Model Changes

Whenever models change:

```bash
python manage.py makemigrations
python manage.py migrate
```

Do not manually manipulate the database unless you understand exactly why.

---

# PHASE 8 — BUILD THE API

## Step 14 — Create Serializers

Serializers translate between:

```text
Django Models
       ↕
JSON
```

For example:

```text
Identity
   ↓
IdentitySerializer
   ↓
JSON
```

Define what users are allowed to read and write.

---

## Step 15 — Create API Views

Implement endpoints for your major resources.

Example:

```text
/api/identities/
/api/verifications/
/api/users/
/api/qr/
/api/audit-logs/
```

Start with simple CRUD where appropriate.

Understand:

```text
GET
POST
PUT/PATCH
DELETE
```

---

## Step 16 — Create API URLs

Keep URL routing organized.

Example:

```text
config/urls.py
      ↓
api/
      ↓
identity/urls.py
      ↓
views
```

A clean structure prevents one giant `urls.py`.

---

# PHASE 9 — API SECURITY

## Step 17 — Implement JWT Authentication

Configure:

```text
Access Token
Refresh Token
```

Typical endpoints:

```text
/api/token/
/api/token/refresh/
```

Understand:

```text
Access token
    ↓
Used for API requests

Refresh token
    ↓
Used to obtain a new access token
```

---

## Step 18 — Protect Backend Endpoints

Authentication answers:

> Who are you?

Permissions answer:

> What are you allowed to do?

Implement both.

Example:

```text
Authenticated user
Administrator
Verification officer
Auditor
```

Do not rely only on React route protection.

The backend must enforce security.

---

# PHASE 10 — TEST THE BACKEND BEFORE REACT

This is one of the most important stages.

Use:

```text
Postman
```

or another API testing tool.

Test:

```text
Registration
Login
Token refresh
Identity creation
Identity retrieval
Identity update
Identity deletion
Verification
QR operations
Permissions
Invalid requests
Unauthorized requests
```

Expected examples:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
```

Do not proceed while the core API is fundamentally broken.

---

# PHASE 11 — CREATE THE REACT FRONTEND

Now start the frontend.

Create the React/Vite application.

Typical structure:

```text
src/
│
├── assets/
│
├── components/
│   ├── common/
│   ├── ui/
│   └── ...
│
├── features/
│   ├── auth/
│   ├── identities/
│   ├── verification/
│   └── qr/
│
├── pages/
│
├── routes/
│
├── services/
│
├── styles/
│
├── App.jsx
└── main.jsx
```

---

# PHASE 12 — PLAN THE FRONTEND BEFORE CODING

## Step 19 — Define Pages

Determine which screens the user needs.

Example:

```text
Login
Dashboard
Users
Verify Identity
Verification Logs
QR Generator
Settings
```

---

## Step 20 — Define Components

Break pages into reusable components.

Example:

```text
Dashboard
├── StatsCard
├── VerificationTable
├── ActivityList
└── MethodCard
```

Do not put the entire application into `App.jsx`.

Keep:

```text
App.jsx
```

as a small application entry/anchor point.

---

# PHASE 13 — BUILD THE FRONTEND SHELL

## Step 21 — Implement Routing

Use React Router.

Create:

```text
routes/
└── Routes.jsx
```

Separate public and protected routes.

Example:

```text
Public
└── Login

Protected
├── Dashboard
├── Users
├── Verify
├── Verification
├── QR Generator
└── Settings
```

---

## Step 22 — Build the Layout

Create the shared application structure:

```text
Layout
├── Sidebar
├── Header
└── Outlet
```

`Outlet` is where the active child route appears.

This means the sidebar can remain while the page content changes.

---

# PHASE 14 — BUILD THE UI

## Step 23 — Build Pages Using Static Data First

Before connecting APIs, make sure the UI works.

Build:

```text
Dashboard
Users
Verification
QR Generator
Settings
```

Use temporary/static data initially.

This lets you solve:

```text
Layout
Spacing
Colors
Typography
Responsive design
Navigation
Components
```

without simultaneously debugging API problems.

---

## Step 24 — Keep CSS Independent

For larger projects, avoid one enormous stylesheet.

Example:

```text
styles/
├── login.css
├── dashboard.css
├── users.css
├── verification.css
├── qr-generator.css
├── settings.css
├── sidebar.css
└── layout.css
```

---

# PHASE 15 — CONNECT AUTHENTICATION

## Step 25 — Create an Authentication Service

Do not place all API logic inside page components.

Example:

```text
features/
└── auth/
    └── authService.js
```

Responsibilities:

```text
Login
Logout
Token storage
Token refresh
Authentication state
```

---

## Step 26 — Connect React Login to Django

Flow:

```text
Login Form
     ↓
authService
     ↓
Django JWT API
     ↓
Access + Refresh Token
     ↓
Token Storage
     ↓
Dashboard
```

---

## Step 27 — Protect React Routes

Create:

```text
ProtectedRoute
```

It should prevent unauthenticated users from accessing application pages.

But remember:

> React protection improves the user experience; Django permissions provide the actual security boundary.

---

## Step 28 — Implement Logout

Logout should:

```text
Remove access token
Remove refresh token
Clear authentication state
Redirect to Login
```

---

# PHASE 16 — CREATE THE API SERVICE LAYER

Do not let every component write its own Axios requests.

Example:

```text
features/
├── auth/
│   └── authService.js
│
├── identities/
│   └── identityService.js
│
├── verification/
│   └── verificationService.js
│
└── qr/
    └── qrService.js
```

This creates separation:

```text
Page
 ↓
Feature Service
 ↓
API
 ↓
Django
```

---

# PHASE 17 — CONNECT REAL DATA

Now replace static data.

Example:

```text
Dashboard
     ↓
GET /api/identities/
     ↓
Django
     ↓
PostgreSQL
     ↓
JSON
     ↓
React
     ↓
Dashboard
```

Do this feature by feature.

Recommended order:

```text
Authentication
        ↓
Users / Identities
        ↓
Dashboard
        ↓
Verification
        ↓
QR
        ↓
Audit Logs
```

---

# PHASE 18 — HANDLE API STATES

Every API-driven page should consider:

```text
Loading
Success
Empty
Error
Unauthorized
Forbidden
```

Example:

```text
Loading identities...

No identities found.

Failed to load identities.

Identities loaded.
```

Professional applications should never leave users staring at a blank page.

---

# PHASE 19 — IMPLEMENT REAL BUSINESS FEATURES

Now replace UI placeholders with real functionality.

For KNOWN:

## QR

Move from:

```text
Fake QR pattern
```

to:

```text
Real QR generation
       ↓
QRCode model
       ↓
Secure credential
       ↓
QR scanner
       ↓
Verification API
```

---

## Face Verification

Move from:

```text
Camera placeholder
```

to:

```text
Camera
   ↓
Face capture
   ↓
Face processing
   ↓
Identity matching
   ↓
Verification result
   ↓
Audit log
```

The exact biometric technology should be selected based on security, privacy, accuracy, deployment environment, and legal requirements.

---

# PHASE 20 — AUDIT AND SECURITY

A serious identity system needs traceability.

Record important actions:

```text
Login
Logout
Identity created
Identity updated
Identity suspended
Verification attempted
Verification succeeded
Verification failed
QR generated
QR revoked
Administrative changes
```

Example:

```text
AuditLog
├── user
├── action
├── timestamp
├── IP address
├── result
└── metadata
```

Also consider:

```text
Rate limiting
Password security
Token expiration
Permission checks
Input validation
CSRF considerations
CORS configuration
Secure cookies/storage strategy
HTTPS
Secret management
Database backups
```

---

# PHASE 21 — VALIDATION

Validate data on both sides.

Frontend:

```text
Required fields
Email format
Password rules
Input formats
```

Backend:

```text
Serializer validation
Model constraints
Permission checks
Business rules
```

Never trust frontend validation alone.

---

# PHASE 22 — ERROR HANDLING

Create consistent error handling.

Backend:

```text
400 → Invalid request
401 → Authentication required
403 → Permission denied
404 → Resource not found
409 → Conflict
500 → Server error
```

Frontend should translate these into understandable messages.

---

# PHASE 23 — RESPONSIVE DESIGN

Test:

```text
Desktop
Laptop
Tablet
Mobile
```

Check:

```text
Sidebar
Tables
Forms
Cards
Buttons
Navigation
Modals
Camera interface
QR interface
```

Do not leave responsiveness until deployment day.

---

# PHASE 24 — TESTING

Test at multiple levels.

## Backend

```text
Model tests
Serializer tests
API tests
Authentication tests
Permission tests
```

## Frontend

```text
Component tests
Form tests
Navigation tests
Authentication tests
API error tests
```

## System

Test complete workflows.

Example:

```text
Login
 ↓
Create identity
 ↓
Generate QR
 ↓
Verify QR
 ↓
Create verification record
 ↓
View verification log
 ↓
Logout
```

---

# PHASE 25 — SECURITY REVIEW

Before deployment, ask:

### Authentication

* Can an unauthenticated user access protected APIs?
* Can an expired token be used?
* Can users access another user's data?

### Authorization

* Are admin-only operations protected?
* Can normal users perform administrative actions?

### Input

* Are inputs validated?
* Can malicious data be submitted?

### Database

* Are sensitive fields protected?
* Are secrets outside source code?

### API

* Is CORS configured correctly?
* Is HTTPS used in production?
* Are debug settings disabled?

---

# PHASE 26 — PERFORMANCE

Check:

```text
Database queries
API response times
Frontend bundle size
Images
Caching
Pagination
Lazy loading
```

For large datasets, don't load everything at once.

Use:

```text
Pagination
Filtering
Searching
Sorting
```

---

# PHASE 27 — ENVIRONMENT CONFIGURATION

Do not hard-code production secrets.

Use environment variables.

Example:

```text
.env
```

for local development.

Store things such as:

```text
DATABASE_URL
SECRET_KEY
API_URL
JWT settings
External service keys
```

Never commit sensitive `.env` files to Git.

---

# PHASE 28 — VERSION CONTROL

Initialize Git early.

Commit meaningful stages.

Example:

```text
Initial Django setup
Create custom user
Create identity models
Build authentication API
Complete API CRUD
Create React application
Implement routing
Build dashboard
Implement login
Connect JWT authentication
Connect identity API
Implement QR verification
Add audit logging
Responsive design
Production preparation
```

Avoid one massive commit at the end.

---

# PHASE 29 — DOCUMENT THE API

Document:

```text
Endpoint
Method
Authentication
Request body
Response
Status codes
Errors
Permissions
```

Example:

```text
POST /api/identities/

Authentication:
Bearer JWT

Request:
{
    "full_name": "...",
    "date_of_birth": "...",
    "nationality": "..."
}

Response:
201 Created
```

---

# PHASE 30 — DEPLOYMENT

Separate environments:

```text
Development
      ↓
Testing / Staging
      ↓
Production
```

Production checklist:

```text
DEBUG = False
Secure SECRET_KEY
Production database
HTTPS
Allowed hosts
CORS configuration
Static files
Media storage
Environment variables
Database backups
Logging
Error monitoring
```

---

# PHASE 31 — FINAL SYSTEM TEST

Perform a complete end-to-end test.

Example:

```text
1. Open application
2. Login
3. Reach dashboard
4. Create identity
5. View identity
6. Update identity
7. Generate credential
8. Perform verification
9. Check verification result
10. Check audit log
11. Logout
12. Attempt protected URL
13. Confirm redirect to login
14. Test API permissions
15. Test invalid data
16. Test expired authentication
```

Only after this should you consider the first production version complete.

---

# THE STANDARD DEVELOPMENT ORDER

For quick reference, follow this order:

```text
1. Understand the problem
        ↓
2. Identify users
        ↓
3. Define requirements
        ↓
4. Define features
        ↓
5. Design database
        ↓
6. Design architecture
        ↓
7. Create Django project
        ↓
8. Configure settings
        ↓
9. Create custom user
        ↓
10. Configure PostgreSQL
        ↓
11. Create models
        ↓
12. Run migrations
        ↓
13. Create serializers
        ↓
14. Create API views
        ↓
15. Create API URLs
        ↓
16. Implement JWT
        ↓
17. Implement permissions
        ↓
18. Test API with Postman
        ↓
19. Create React/Vite project
        ↓
20. Design frontend structure
        ↓
21. Create routes
        ↓
22. Create Layout
        ↓
23. Create sidebar/navigation
        ↓
24. Build pages
        ↓
25. Build independent CSS
        ↓
26. Build Login UI
        ↓
27. Connect JWT login
        ↓
28. Protect React routes
        ↓
29. Create API/service layer
        ↓
30. Connect real backend data
        ↓
31. Handle loading/errors/empty states
        ↓
32. Implement business features
        ↓
33. Implement audit/security
        ↓
34. Responsive design
        ↓
35. Automated/manual testing
        ↓
36. Security review
        ↓
37. Performance optimization
        ↓
38. Documentation
        ↓
39. Deployment
        ↓
40. Final end-to-end testing
```

---

# THE GOLDEN RULE

Do not develop a full-stack project as:

```text
"Let me code whatever comes to mind."
```

Develop it as:

```text
PROBLEM
   ↓
REQUIREMENTS
   ↓
ARCHITECTURE
   ↓
DATABASE
   ↓
BACKEND
   ↓
API
   ↓
API TESTING
   ↓
FRONTEND STRUCTURE
   ↓
UI
   ↓
AUTHENTICATION
   ↓
API INTEGRATION
   ↓
BUSINESS LOGIC
   ↓
SECURITY
   ↓
TESTING
   ↓
DEPLOYMENT
```

The important principle is:

> **Design first, build the backend foundation, prove the API works, build the frontend structure, then connect the two.**

That order prevents many of the problems that occur when frontend, backend, database, and authentication are all developed randomly at the same time.

---

# KNOWN AS THE REFERENCE IMPLEMENTATION

Your KNOWN project follows this pattern:

```text
                    KNOWN
                      │
        ┌─────────────┴─────────────┐
        │                           │
     Frontend                    Backend
        │                           │
     React                    Django REST
        │                           │
   React Router                  JWT
        │                           │
   Components                    Models
        │                           │
   Feature APIs                Serializers
        │                           │
   Axios/API                   Views
        │                           │
        └─────────────┬─────────────┘
                      │
                  PostgreSQL
```

And the development sequence you have followed is essentially:

```text
KNOW THE SYSTEM
      ↓
DATABASE DESIGN
      ↓
DJANGO BACKEND
      ↓
JWT AUTH
      ↓
POSTMAN TESTING
      ↓
REACT STRUCTURE
      ↓
ROUTING
      ↓
LAYOUT
      ↓
UI PAGES
      ↓
LOGIN
      ↓
PROTECTED ROUTES   ← CURRENT STAGE
      ↓
API INTEGRATION
      ↓
REAL QR
      ↓
FACE VERIFICATION
      ↓
AUDIT + SECURITY
      ↓
TESTING
      ↓
DEPLOYMENT
```

This is the workflow you can reuse for your **next Django + React project**, not just KNOWN.
