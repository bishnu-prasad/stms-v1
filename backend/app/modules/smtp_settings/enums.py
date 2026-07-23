from enum import Enum


class SMTPSecurity(str, Enum):
    TLS = "TLS"
    SSL = "SSL"
    NONE = "NONE"