from django.urls import path

from . import views

urlpatterns = [
    path('video/<int:platform>/<path:id>', views.video, name='index'),
    path('search/<int:platform>/<str:query>', views.search, name='search'),
]
