from django.db import models
from django.conf import settings
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator,
)

from products.models import (
    CouponModel,
    ProductModel,
)


# Create your models here.
class OrderModel(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    coupon = models.ForeignKey(
        CouponModel, on_delete=models.SET_NULL, null=True, blank=True
    )
    coupon_code_used = models.CharField(max_length=150)
    discount_percent_applied = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    total_price = models.DecimalField(max_digits=12, decimal_places=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderItemModel(models.Model):
    order = models.ForeignKey(
        OrderModel, on_delete=models.CASCADE, related_name="items"
    )
    product = models.ForeignKey(
        ProductModel,
        on_delete=models.PROTECT,
    )
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=12, decimal_places=0)
