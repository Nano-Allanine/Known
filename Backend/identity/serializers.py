from rest_framework import serializers
from .models import (
    Identity,
    Verification,
    QRCode,
    FaceCredentials,
    AuditLog,
)


class IdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Identity
        fields = "__all__"


class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Verification
        fields = "__all__"


class QRCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRCode
        fields = "__all__"


class FaceCredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaceCredentials
        fields = "__all__"


class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = "__all__"
