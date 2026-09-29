from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count

from .models import (
    Identity,
    Verification,
    QRCode,
    FaceCredentials,
    AuditLog,
)

from .serializers import (
    IdentitySerializer,
    VerificationSerializer,
    QRCodeSerializer,
    FaceCredentialsSerializer,
    AuditLogSerializer,
)


# KNOWN SYSTEM STATUS
@api_view(["GET"])
def known_status(request):

    return Response({
        "system": "KNOWN",
        "status": "online",
        "message": "KNOWN API is running successfully"
    })


# KNOWN SYSTEM INFORMATION
@api_view(["GET"])
def known_info(request):

    return Response({
        "name": "Known",
        "version": "1.0.0",
        "frontend": "React",
        "backend": "Django",
        "database": "Postgresql"
    })


# DASHBOARD
@api_view(["GET"])
def dashboard(request):

    total_identities = Identity.objects.count()

    verified = Verification.objects.filter(
        result="SUCCESS"
    ).count()

    failed = Verification.objects.filter(
        result="FAILED"
    ).count()

    pending = Identity.objects.filter(
        status="PENDING"
    ).count()

    face_verifications = Verification.objects.filter(
        method="FACE"
    ).count()

    qr_verifications = Verification.objects.filter(
        method="QR"
    ).count()

    recent_verifications = Verification.objects.select_related(
        "identity"
    ).order_by("-verified_at")[:5]

    recent_data = []

    for verification in recent_verifications:
        recent_data.append({
            "known_id": verification.identity.known_id,
            "method": verification.get_method_display(),
            "result": verification.get_result_display(),
            "verified_at": verification.verified_at,
        })

    return Response({
        "total_identities": total_identities,
        "verified": verified,
        "pending": pending,
        "failed": failed,

        "face_verifications": face_verifications,
        "qr_verifications": qr_verifications,

        "recent_verifications": recent_data,
    })


# IDENTITY VIEWS
class IdentityListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Identity.objects.all()
    serializer_class = IdentitySerializer


class IdentityDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Identity.objects.all()
    serializer_class = IdentitySerializer


# VERIFICATION VIEWS
class VerificationListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Verification.objects.all()
    serializer_class = VerificationSerializer


class VerificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Verification.objects.all()
    serializer_class = VerificationSerializer


# QR CODE VIEWS
class QRCodeListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = QRCode.objects.all()
    serializer_class = QRCodeSerializer


class QRCodeDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = QRCode.objects.all()
    serializer_class = QRCodeSerializer


# FACE CREDENTIAL VIEWS
class FaceCredentialsListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = FaceCredentials.objects.all()
    serializer_class = FaceCredentialsSerializer


class FaceCredentialsDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = FaceCredentials.objects.all()
    serializer_class = FaceCredentialsSerializer


# AUDIT LOG VIEWS
class AuditLogListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer


class AuditLogDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
