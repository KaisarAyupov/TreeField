from .serializers import ListingSerializer
from listings.models import Listing
from rest_framework import generics


class ListingList(generics.ListAPIView):
    queryset =Listing.objects.all().order_by('-data_posted')
    serializer_class = ListingSerializer


class ListingCreate(generics.CreateAPIView):
    queryset =Listing.objects.all()
    serializer_class = ListingSerializer

class ListingDetail(generics.RetrieveAPIView):
    queryset =Listing.objects.all()
    serializer_class = ListingSerializer