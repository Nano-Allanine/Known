from django.contrib import admin
from .models import (Identity, Verification, QRCode, FaceCredentials, AuditLog)

admin.site.register(Identity)
admin.site.register(Verification)
admin.site.register(QRCode)
admin.site.register(FaceCredentials)
admin.site.register(AuditLog)
# Register your models here.
