from django.urls import include, path

from . import views

urlpatterns = [
    path('register/', views.signup),
    path('login/', views.login_view),
    path('check/', views.is_logged),
    path('logout/', views.logout_view),
    path('activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/', views.activate, name='activate'),  
    path('favorite/',views.add_favorite),
    path('favorite/<int:platform>/<path:link>', views.del_favorite, name='del_fav'),
    path('random/',views.get_random_videos),
    path('show/',views.showUsers),
    path('fav_vids/',views.fav_vids),
]
