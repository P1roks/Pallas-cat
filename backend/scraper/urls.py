from django.urls import path

from . import views

urlpatterns = [
    path('video/<str:platfrom>/<path:id>', views.video, name='index'),
]