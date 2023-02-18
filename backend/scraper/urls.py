from django.urls import path

from . import views

urlpatterns = [
    path('video/<str:platfrom>/<slug:id>', views.video, name='index'),
]