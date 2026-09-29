from django.urls import path

from .views import (
    known_status,
    known_info,
    dashboard,
    IdentityListCreateView,
    IdentityDetailView,
    VerificationListCreateView,
    VerificationDetailView,
    QRCodeListCreateView,
    QRCodeDetailView,
    FaceCredentialsListCreateView,
    FaceCredentialsDetailView,
    AuditLogListCreateView,
    AuditLogDetailView,
)


urlpatterns = [

    # KNOWN system
    path("status/", known_status, name="known-status"),
    path("info/", known_info, name="known-info"),
    path("dashboard/", dashboard, name="dashboard"),
    # Identities
    path(
        "identities/",
        IdentityListCreateView.as_view(),
        name="identity-list-create"
    ),

    path(
        "identities/<int:pk>/",
        IdentityDetailView.as_view(),
        name="identity-detail"
    ),

    # Verifications
    path(
        "verifications/",
        VerificationListCreateView.as_view(),
        name="verification-list-create"
    ),

    path(
        "verifications/<int:pk>/",
        VerificationDetailView.as_view(),
        name="verification-detail"
    ),

    # QR Codes
    path(
        "qr-codes/",
        QRCodeListCreateView.as_view(),
        name="qrcode-list-create"
    ),

    path(
        "qr-codes/<int:pk>/",
        QRCodeDetailView.as_view(),
        name="qrcode-detail"
    ),

    # Face Credentials
    path(
        "face-credentials/",
        FaceCredentialsListCreateView.as_view(),
        name="face-credentials-list-create"
    ),

    path(
        "face-credentials/<int:pk>/",
        FaceCredentialsDetailView.as_view(),
        name="face-credentials-detail"
    ),

    # Audit Logs
    path(
        "audit-logs/",
        AuditLogListCreateView.as_view(),
        name="audit-log-list-create"
    ),

    path(
        "audit-logs/<int:pk>/",
        AuditLogDetailView.as_view(),
        name="audit-log-detail"
    ),
]
