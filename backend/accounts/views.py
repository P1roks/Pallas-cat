from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login

@require_http_methods(["POST"])
def register_view(request) -> JsonResponse:
    username = request.POST.get("username")
    password = request.POST.get("password")
    if username is None or password is None:
        return JsonResponse({ "message": "missing fields" }, status=406)
    User.objects.create_user(username=username, password=password)
    return JsonResponse({ "message": "ok" })

@require_http_methods(["POST"])
def login_view(request) -> JsonResponse:
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({ "message": "ok" })
    else:
        return JsonResponse({ "message": "nie ok" })

def is_logged(request) -> JsonResponse:
    if not request.user.is_authenticated:
        return JsonResponse({ "message": "not logged" })
    else: 
        return JsonResponse({ "message": "logged" })
