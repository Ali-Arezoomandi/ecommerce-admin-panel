from rest_framework import generics

from .models import OrderModel
from .serializers import OrderSerializer


# ------------- Order ----------------
class OrderListView(generics.ListCreateAPIView):
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer


class OrderdetailView(generics.RetrieveDestroyAPIView):
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
