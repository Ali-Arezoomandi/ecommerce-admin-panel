from rest_framework import generics

from .models import (
    ProductModel, 
    CommentModel,
    CouponModel,
)
from .serializers import (
    ProductSerializer,
    CommentSerializer,
    CouponSerializer,
)

# --------- Product -------------
class ProductListView(generics.ListCreateAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer


class ProductdetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer
    
    
# ---------- Comment ----------    
class CommentListView(generics.ListCreateAPIView):
    queryset = CommentModel.objects.select_related(
        "user",
        "product"
    )
    serializer_class = CommentSerializer


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CommentModel.objects.all()
    serializer_class = CommentSerializer
    

# ---------- Coupon ----------  
class CouponListView(generics.ListCreateAPIView):
    queryset = CouponModel.objects.all()
    serializer_class = CouponSerializer


class CouponDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CouponModel.objects.all()
    serializer_class = CouponSerializer

