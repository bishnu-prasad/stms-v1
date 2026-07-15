from enum import Enum


class AccountType(Enum):
    PLATFORM_OWNER = "PLATFORM_OWNER"
    SUPER_ADMIN = "SUPER_ADMIN"
    CUSTOMER_ADMIN = "CUSTOMER_ADMIN"
    VENDOR = "VENDOR"
    
class AccountStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    LOCKED = "LOCKED"
    SUSPENDED = "SUSPENDED"