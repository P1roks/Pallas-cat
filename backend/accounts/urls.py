from django.urls import include, path

from . import views

urlpatterns = [
    path('register/', views.signup),
    path('login/', views.login_view),
    path('check/', views.is_logged),
    path('activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/', views.activate, name='activate'),  
]