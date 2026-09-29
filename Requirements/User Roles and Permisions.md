# KNOWN — User Roles and Permissions

## 1. Introduction

KNOWN uses Role-Based Access Control (RBAC) to control what users can access and what actions they are authorized to perform within the system.

The system defines three primary user roles:

1. Identity Holder
2. Verifier
3. Administrator

Each role has specific responsibilities and permissions. Access to sensitive identity and biometric information shall be restricted according to the user's authorized role.

---

## 2. Identity Holder

### Description

An Identity Holder is an individual who registers with KNOWN and establishes a digital identity within the platform.

### Responsibilities

The Identity Holder is responsible for:

* Providing accurate identity information.
* Completing the identity enrollment process.
* Completing facial enrollment where required.
* Protecting their account credentials.
* Reporting unauthorized access or suspicious activity.
* Keeping permitted identity information up to date.

### Permissions

The Identity Holder shall be able to:

* Create an account.
* Log into the KNOWN platform.
* Log out of the platform.
* Manage their own profile.
* Submit identity information.
* Complete digital identity enrollment.
* Receive a unique KNOWN identification number.
* View their digital identity.
* Enroll their facial biometric representation.
* Present their digital identity for verification.
* Present their QR credential for verification.
* View permitted verification history associated with their identity.
* Update permitted personal information.
* Manage their own account settings.

### Restrictions

The Identity Holder shall not be able to:

* Access another user's identity information without authorization.
* Verify identities as a system verifier.
* Manage other users.
* Assign or modify user roles.
* Access another person's biometric information.
* Modify audit logs.
* Modify system configuration.
* Suspend or revoke another user's identity.

---

## 3. Verifier

### Description

A Verifier is an authorized individual or organization that uses KNOWN to confirm the identity of an Identity Holder.

### Responsibilities

The Verifier is responsible for:

* Using the system only for authorized verification purposes.
* Protecting information obtained during verification.
* Maintaining the confidentiality of identity information.
* Following KNOWN verification procedures.
* Reporting suspicious or fraudulent verification activity.

### Permissions

The Verifier shall be able to:

* Create or access an authorized verifier account.
* Log into the KNOWN platform.
* Search for an identity using permitted identification information.
* Enter or scan a KNOWN identification number.
* Scan or validate a QR credential.
* Request identity verification.
* Perform facial verification where authorized.
* View verification results.
* View only the identity information necessary for the verification process.
* View their own verification history.
* Report suspicious verification activity.

### Restrictions

The Verifier shall not be able to:

* Modify another person's identity information.
* Enroll another person's facial biometric data without appropriate authorization.
* Change user roles.
* Create administrator accounts.
* Access unrestricted biometric information.
* Modify audit logs.
* Delete verification records.
* Modify system configuration.
* Suspend or revoke identities unless specifically granted that authority.

---

## 4. Administrator

### Description

An Administrator is an authorized system operator responsible for managing and maintaining the KNOWN platform.

### Responsibilities

The Administrator is responsible for:

* Managing system users.
* Managing authorized verifiers.
* Managing identity records.
* Managing system roles and permissions.
* Monitoring system activity.
* Reviewing security events.
* Maintaining system integrity.
* Managing system configuration.
* Monitoring audit records.

### Permissions

The Administrator shall be able to:

* Log into the administration system.
* View and manage user accounts.
* Create, activate, suspend, or deactivate authorized verifier accounts.
* Manage user roles and permissions.
* Review identity records according to authorized administrative access.
* Approve, suspend, or revoke identities according to system policy.
* Monitor verification activities.
* Review audit logs.
* Investigate security events.
* Manage permitted system configurations.
* Monitor system status.
* Manage authorized verification services.
* Review system reports.
* Manage account security controls.

### Restrictions

Administrative access shall follow the principle of least privilege.

Administrators shall not automatically have unrestricted access to biometric information. Access to sensitive biometric data shall require appropriate authorization and shall be logged.

Administrators shall not:

* Use biometric information for unauthorized purposes.
* Modify audit records without appropriate system controls.
* Access information beyond their assigned administrative privileges.
* Bypass security controls without authorization.

---

# 5. Role-Based Access Control

KNOWN shall implement Role-Based Access Control (RBAC).

A user's role determines the operations they are permitted to perform.

The backend shall enforce authorization independently of the frontend.

For example:

```text
User
  |
  v
Authentication
  |
  v
Identify User Role
  |
  v
Check Permission
  |
  +---- Authorized ----> Perform Operation
  |
  +---- Unauthorized --> Reject Request
```

Frontend controls shall not be considered sufficient security. Django shall enforce permissions at the API and backend levels.

---

# 6. Permission Matrix

| Function                        | Identity Holder | Verifier   | Administrator |
| ------------------------------- | --------------- | ---------- | ------------- |
| Create Account                  | Yes             | Yes        | Yes           |
| Login                           | Yes             | Yes        | Yes           |
| Manage Own Profile              | Yes             | Yes        | Yes           |
| Submit Identity Information     | Yes             | No         | Authorized    |
| Complete Identity Enrollment    | Yes             | No         | Authorized    |
| Enroll Own Face                 | Yes             | No         | Authorized    |
| View Own Digital ID             | Yes             | No         | Yes           |
| Present QR Credential           | Yes             | No         | Yes           |
| Verify Identity                 | No              | Yes        | Yes           |
| QR Verification                 | No              | Yes        | Yes           |
| Facial Verification             | No              | Authorized | Authorized    |
| View Verification Result        | Own             | Yes        | Yes           |
| View Own Verification History   | Yes             | Yes        | Yes           |
| Manage Users                    | No              | No         | Yes           |
| Manage Verifiers                | No              | No         | Yes           |
| Manage Roles                    | No              | No         | Yes           |
| Suspend Identity                | No              | No         | Yes           |
| Revoke Identity                 | No              | No         | Yes           |
| Review Audit Logs               | No              | No         | Yes           |
| Manage System Configuration     | No              | No         | Yes           |
| Access Sensitive Biometric Data | Restricted      | Restricted | Restricted    |
| Modify Audit Records            | No              | No         | No            |

---

# 7. Principle of Least Privilege

KNOWN shall follow the principle of least privilege.

Each user shall receive only the permissions required to perform their legitimate responsibilities.

Access to sensitive information, particularly identity and biometric information, shall be restricted and monitored.

---

# 8. Separation of Responsibilities

KNOWN shall separate identity ownership, identity verification, and system administration.

* Identity Holders manage their own identities.
* Verifiers verify identities.
* Administrators manage the platform.
* Sensitive biometric operations shall require appropriate authorization.
* Security-sensitive actions shall be recorded through audit logging.

This separation reduces unauthorized access and limits the impact of compromised accounts.

---

# 9. Future Roles

The architecture shall allow additional roles to be introduced without redesigning the entire system.

Potential future roles may include:

* Organization Administrator
* Verification Officer
* Compliance Officer
* Security Officer
* Support Officer
* Super Administrator

These roles shall only be introduced when required by the operational requirements of KNOWN.
