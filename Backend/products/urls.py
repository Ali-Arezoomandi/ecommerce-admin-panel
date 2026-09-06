from django.urls import path
from . import views


app_name = "products"

urlpatterns = [
    path("", views.ProductListView.as_view(), name="product-list"),
    path("<int:pk>", views.ProductdetailView.as_view(), name="product-detail"),
    
    path("comment", views.CommentListView.as_view(), name="comment-list"),
    path("comment/<int:pk>", views.CommentDetailView.as_view(), name="comment-detail"),

    path("coupon", views.CouponListView.as_view(), name="coupon-list"),
    path("coupon/<int:pk>", views.CouponDetailView.as_view(), name="coupon-detail"),
]
