from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


# Create your models here.
class UserStatusType(models.IntegerChoices):
    CUSTOMER = 1, ("مشتری")
    ADMIN = 2, ("ادمین")


class UserModel(AbstractUser):

    persian_phone_validator = RegexValidator(
        regex=r"^(?:0|98|\+98|0098)?9\d{9}$",
        message="Enter a valid Persian phone number (e.g., 09123456789 or +989123456789).",
    )

    phone = models.CharField(
        max_length=15, validators=[persian_phone_validator], unique=True
    )
    email = models.EmailField(max_length=255, unique=True)
    city = models.CharField(max_length=150)
    address = models.CharField(max_length=300)
    status = models.IntegerField(
        choices=UserStatusType, default=UserStatusType.CUSTOMER.value
    )

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} - {self.last_name}"

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"