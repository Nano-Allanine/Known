                    ┌──────────────────────┐
                    │      KNOWN USER      │
                    │ Phone / PC / Tablet  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React + Vite       │
                    │   Frontend           │
                    └──────────┬───────────┘
                               │
                         REST API / HTTPS
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Django REST Framework│
                    │      Backend         │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      Authentication     Identity Service   Verification
             │                 │                 │
             │                 │          ┌──────┴──────┐-----------------Audit_Logs
             │                 │          │             │
             │                 │          ▼             ▼
             │                 │       Facial          QR
             │                 │     Verification   Verification
             │                 │
             └─────────────────┼─────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     PostgreSQL       │
                    │      Database        │
                    └──────────────────────┘