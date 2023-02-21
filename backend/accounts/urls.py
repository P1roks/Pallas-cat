from django.urls import include, path

from . import views

urlpatterns = [
    path('register/', views.register_view),
    path('login/', views.login_view),
    path('check/', views.is_logged)
]