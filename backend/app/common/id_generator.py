"""
Public ID Generator

Purpose:
- Generates public identifiers for all business entities.
- Keeps ID generation logic centralized and reusable.

Example:
    generate_public_id("CUS")
    -> CUS175257300512348391
"""

import random
import time


def generate_public_id(prefix: str) -> str:
    epoch_ms = int(time.time() * 1000)
    random_number = random.randint(10000, 99999)

    return f"{prefix}{epoch_ms}{random_number}"