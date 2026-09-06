from django.contrib import admin

from .models import (
    ProductModel, 
    CommentModel,
    CouponModel
)

# Register your models here.
admin.site.register(ProductModel)
admin.site.register(CommentModel)
admin.site.register(CouponModel)