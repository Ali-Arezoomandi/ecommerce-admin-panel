from rest_framework import serializers
from django.db import transaction
from django.urls import reverse

from .models import (
    OrderModel,
    OrderItemModel,
)


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItemModel
        fields = [
            "id",
            "order",
            "product",
            "quantity",
            "price_at_purchase",
        ]
        read_only_fields = ["price_at_purchase"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    absolute_custom_url = serializers.SerializerMethodField()

    class Meta:
        model = OrderModel
        fields = [
            "id",
            "user",
            "coupon",
            "coupon_code_used",
            "discount_percent_applied",
            "total_price",
            "items",
            "created_at",
            "absolute_custom_url",
        ]
        read_only_fields = [
            "user",
            "coupon_code_used",
            "discount_percent_applied",
            "total_price",
            "created_at",
        ]
        

    def get_absolute_custom_url(self, obj):
        request = self.context.get("request")
        reverse_url = reverse("orders:order-detail", kwargs={"pk": obj.id})
        if request is not None:
            return request.build_absolute_uri(reverse_url)
        return reverse_url
    

    @transaction.atomic
    def create(self, validated_data):
        user = self.context["request"].user
        all_item = validated_data.pop("items")
        coupon = validated_data.get("coupon")
        
        discount_percent = 0
        coupon_code = ""
        if coupon:
            discount_percent = coupon.percent
            coupon_code = coupon.code
            
        total_price = 0
        order = OrderModel.objects.create(
            user=user,
            coupon = coupon,
            coupon_code_used = coupon_code,
            discount_percent_applied = discount_percent,
            total_price = 0
        )
        
        for item in all_item:
            product = item["product"]
            quantity = item["quantity"]
            price = product.price
            
            OrderItemModel.objects.create(
                order = order,
                product = product,
                quantity = quantity,
                price_at_purchase = price
            )
            total_price += price * quantity
            
        if discount_percent > 0:
            total_price = total_price - (total_price * (discount_percent / 100))
            
        order.total_price = total_price
        order.save()

        return order