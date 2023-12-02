from rest_framework import generics
from rest_framework import permissions
from django.contrib.auth import get_user_model
from rest_framework.response import Response

from .serializer import ResgisterSerializer

User = get_user_model()


class Register(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = ResgisterSerializer
    permission_classes = [permissions.AllowAny]

    # def perform_create(self, serializer):
    #     print(serializer.instance)
    #     serializer.save()
    #     return Response(serializer.instance)
