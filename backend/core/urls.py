from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('', RedirectView.as_view(url="/api")),
    path('api/', include('notes.api.urls', namespace='api')),
    
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    
]
