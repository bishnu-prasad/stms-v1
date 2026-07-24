import random


def generate_username(first_name: str, company_short_name: str) -> str:
    """
    Generate a username in the format:
    <firstname><5_random_digits>@<company_short_name>

    Example:
        John + ACME -> john48291@acme
    """

    first_name = first_name.strip().lower().replace(" ", "")
    company_short_name = company_short_name.strip().lower().replace(" ", "")

    random_number = random.randint(10000, 99999)

    return f"{first_name}{random_number}@{company_short_name}"