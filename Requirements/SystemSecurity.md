SR-01: Secure Authentication

The system shall require users to authenticate before accessing protected functionality.

SR-02: Password Protection

User passwords shall never be stored as plain text. They shall be securely hashed using Django's password-hashing mechanisms.

SR-03: Role-Based Access Control

The system shall restrict functionality according to the user's role.

For example:

Identity Holder → Manage own identity
Verifier        → Verify identities
Administrator   → Manage system

A verifier should not automatically have administrator privileges.

SR-04: Authorization

The backend shall verify that an authenticated user has permission to perform an operation before processing it.

This is important because hiding a button in React is not security. Django must enforce the permission too.

SR-05: Secure API

Protected API endpoints shall require appropriate authentication and authorization.

SR-06: Data Encryption

Sensitive information shall be protected during transmission using HTTPS/TLS in production.

SR-07: Biometric Data Protection

Facial biometric information shall have restricted access and shall not be exposed through ordinary public API responses.

SR-08: Facial Verification Security

The facial verification component shall incorporate appropriate measures against spoofing and presentation attacks, such as liveness detection where technically feasible.

SR-09: Verification Protection

The system shall restrict repeated or automated verification attempts to reduce abuse.

SR-10: Audit Logging

Security-sensitive operations shall be recorded, including:

Login attempts
Identity creation
Identity changes
Facial enrollment
Verification attempts
Administrative actions
Account status changes
SR-11: Session/Token Security

Authentication tokens shall be handled securely, with appropriate expiration and revocation strategies.

SR-12: Input Validation

All user-supplied data shall be validated on the backend before being processed or stored.

SR-13: Protection Against Common Attacks

The system shall implement appropriate protections against threats such as:

SQL injection
Cross-site scripting (XSS)
Cross-site request forgery (CSRF)
Unauthorized API access
Brute-force attacks
Malicious file uploads
SR-14: File/Image Security

Images submitted for identity or facial verification shall be validated and restricted to permitted formats and sizes.

SR-15: Database Security

Database credentials shall not be hard-coded into source code and shall be stored through secure environment/configuration mechanisms.

SR-16: Least Privilege

Users and system components shall receive only the permissions necessary to perform their assigned functions.

SR-17: Account Protection

The system shall provide appropriate controls for suspicious or repeated failed authentication attempts.

SR-18: Identity Status Security

Suspended or revoked identities shall not be treated as normally active identities during verification.

SR-19: Privacy and Retention

KNOWN shall define how long identity and biometric information is retained and how it can be securely removed when retention is no longer required.

SR-20: Error Handling

The system shall not expose sensitive technical information, database details, passwords, tokens, or internal implementation details through error messages.