from django.urls import path
from .views import TokenRefreshView, LogInView, UserRegistrationView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('login/', LogInView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='register'),
]
