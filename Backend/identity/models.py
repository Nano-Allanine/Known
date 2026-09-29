from django.db import models
from django.conf import settings


# Person's Identity/who the person is
class Identity(models.Model):
    class Meta:
        verbose_name = "Identity"
        verbose_name_plural = "Identities"

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("ACTIVE", "Active"),
        ("SUSPENDED", "Suspended"),
        ("REVOKED", "Revoked"),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    known_id = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=150)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=20)
    nationality = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    address = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.known_id


# How check that person/How we verify that person
class Verification(models.Model):
    class Meta:
        verbose_name = "Verification"
        verbose_name_plural = "Verifications"

    METHOD_CHOICES = [
        ("FACE", "Face Recognition"),
        ("QR", "QR Code"),
    ]

    RESULT_CHOICES = [
        ("SUCCESS", "Successful"),
        ("FAILED", "Failed"),
    ]

    identity = models.ForeignKey(
        Identity,
        on_delete=models.CASCADE,
        related_name="verifications"
    )

    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="performed_verifications"
    )

    method = models.CharField(
        max_length=10,
        choices=METHOD_CHOICES
    )

    result = models.CharField(
        max_length=10,
        choices=RESULT_CHOICES
    )

    confidence_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True
    )

    failure_reason = models.TextField(
        null=True,
        blank=True
    )

    verified_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.identity.known_id} - {self.method} - {self.result}"


# Digital credential that can be used to identify/verify that person
class QRCode(models.Model):
    class Meta:
        verbose_name = "QR Code"
        verbose_name_plural = "QR Codes"

    STATUS_CHOICES = [
        ("ACTIVE", "Active"),
        ("EXPIRED", "Expired"),
        ("REVOKED", "Revoked"),
    ]

    identity = models.ForeignKey(
        Identity,
        on_delete=models.CASCADE,
        related_name="qr_codes"
    )

    code = models.CharField(
        max_length=255,
        unique=True
    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="ACTIVE"
    )

    issued_at = models.DateTimeField(
        auto_now_add=True
    )

    expires_at = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.identity.known_id} - QR"


# BIOMETRIC enrollment
class FaceCredentials(models.Model):
    class Meta:
        verbose_name = "Face Credential"
        verbose_name_plural = "Face Credentials"

    STATUS_CHOICES = [
        ("ACTIVE", "Active"),
        ("EXPIRED", "Expired"),
        ("REVOKED", "Revoked"),
    ]

    identity = models.OneToOneField(
        Identity,
        on_delete=models.CASCADE,
        related_name="face_credentials"
    )

    face_image = models.ImageField(
        upload_to="face_credentials/"
    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="ACTIVE"
    )

    enrolled_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    expires_at = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.identity.known_id} - Face Credentials"


# Records important user/sysytem actions
class AuditLog(models.Model):
    class Meta:
        verbose_name = "Audit Log"
        verbose_name_plural = "Audit Logs"

    ACTION_CHOICES = [
        ("CREATE", "Create"),
        ("UPDATE", "Update"),
        ("DELETE", "Delete"),
        ("VERIFY", "Verify"),
        ("LOGIN", "Login"),
        ("LOGOUT", "Logout"),
        ("REVOKE", "Revoke"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="audit_logs"
    )

    action = models.CharField(
        max_length=20,
        choices=ACTION_CHOICES
    )

    description = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user} - {self.action} - {self.created_at}"
