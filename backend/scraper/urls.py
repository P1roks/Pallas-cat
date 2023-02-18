from django.urls import path

from . import views

urlpatterns = [
    path('video/<int:platform>/<slug:id>', views.video, name='video'),
    path('search/<int:platform>/<str:query>', views.search, name='search'),
]
