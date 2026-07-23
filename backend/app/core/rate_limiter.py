
from slowapi import Limiter
from slowapi.util import get_remote_address

# Shared application rate limiter.
# This limiter is reused across all modules to protect
# endpoints from excessive requests. Individual routes
# define their own limits using decorators.
limiter = Limiter(key_func=get_remote_address)