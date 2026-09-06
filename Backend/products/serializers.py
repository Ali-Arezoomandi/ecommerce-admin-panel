from rest_framework import serializers
from django.urls import reverse

from .models import ProductModel, CommentModel, CouponModel


class BaseModelSerializer(serializers.ModelSerializer):
    absolute_custom_url = serializers.SerializerMethodField()
    url_name = None

    def get_absolute_custom_url(self, obj):

        if not self.url_name:
            raise NotImplementedError("لطفاً url_name را در کلاس فرزند مشخص کنید.")

        request = self.context.get("request")
        reverse_url = reverse(self.url_name, kwargs={"pk": obj.id})
        if request is not None:
            return request.build_absolute_uri(reverse_url)
        return reverse_url


class ProductSerializer(BaseModelSerializer):
    url_name = "products:product-detail"

    class Meta:
        model = ProductModel
        fields = [
            "id",
            "title",
            "price",
            "stock",
            "img",
            "status",
            "created_at",
            "absolute_custom_url",
        ]


class CommentSerializer(BaseModelSerializer):
    url_name = "products:comment-detail"

    class Meta:
        model = CommentModel
        fields = [
            "id",
            "body",
            "user",
            "product",
            "created_at",
            "absolute_custom_url",
        ]


class CouponSerializer(BaseModelSerializer):
    url_name = "products:coupon-detail"

    class Meta:
        model = CouponModel
        fields = [
            "id",
            "code",
            "percent",
            "status",
            "expiration_date",
            "created_at",
            "absolute_custom_url",
        ]
