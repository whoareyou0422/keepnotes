from django.urls import path

from .views import get_routes, MyTokenObtainPairView
from ..views import (
    Notes,
    NoteCreate,
    NoteGetUpdateDelete
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from accounts.views import Register

app_name = 'api'


urlpatterns = [
    path('', get_routes),
    path('notes/', Notes.as_view()),
    path('create/', NoteCreate.as_view()),
    path('note/<int:id>', NoteGetUpdateDelete.as_view(), name='my_note'),

    path('register/', Register.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
