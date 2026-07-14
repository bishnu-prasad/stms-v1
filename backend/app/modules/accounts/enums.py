from enum import Enum


class AccountType(str, Enum):
    SUPER_ADMIN = "SUPER_ADMIN"
    CUSTOMER_ADMIN = "CUSTOMER_ADMIN"
    VENDOR = "VENDOR"
    TENANT = "TENANT"
    
class AccountStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    LOCKED = "LOCKED"
    SUSPENDED = "SUSPENDED"