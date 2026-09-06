from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings


# Create your models here.
class ProductStatusType(models.IntegerChoices):
    ACTIVE = 1, ("نمایش")
    NOT_ACTIVE = 2, ("عدم نمایش")


class ProductModel(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    stock = models.PositiveIntegerField(default=1)
    img = models.ImageField(upload_to="products/", null=True, blank=True)
    status = models.IntegerField(
        choices=ProductStatusType, default=ProductStatusType.NOT_ACTIVE.value
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class CommentModel(models.Model):
    body = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    product = models.ForeignKey(
        ProductModel, on_delete=models.PROTECT, related_name="comment"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body[:20]


class CouponModel(models.Model):
    code = models.CharField(max_length=150, unique=True)
    percent = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )
    status = models.IntegerField(
        choices=ProductStatusType, default=ProductStatusType.NOT_ACTIVE.value
    )

    expiration_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.code
