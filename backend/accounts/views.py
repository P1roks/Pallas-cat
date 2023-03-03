from http.client import HTTPResponse
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse  
from django.shortcuts import render, redirect  
from django.contrib.auth import login, authenticate  
from django.contrib.sites.shortcuts import get_current_site  
from django.utils.encoding import force_bytes, force_str  
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode  
from django.template.loader import render_to_string  
from .tokens import account_activation_token  
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model 
from django.core.mail import EmailMessage  
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@require_http_methods(["POST"])
def login_view(request) -> JsonResponse:
    username = request.POST.get("email")
    password = request.POST.get("password")
    user = authenticate(request=request,username=username,password=password)
    # user = User.objects.get(email=email)

    if user is not None:
        login(request, user)
        res = JsonResponse({ "message": "ok" })
        res.set_cookie('test','1')
        return res
    else:
        return JsonResponse({ "message": "not ok" })

def is_logged(request) -> JsonResponse:
    if not request.user.is_authenticated:
        return JsonResponse({ "logged": False })
    else: 
        return JsonResponse({ "logged": True, "is_active": request.user.is_active })

def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({ "loggedOut": False})
    else: 
        logout(request)
        return JsonResponse({ "loggedOut": True})

@csrf_exempt
@require_http_methods(["POST"])
def signup(request):
    email = request.POST.get("email")
    username = request.POST.get("username")
    password = request.POST.get("password")
    if username is None or password is None:
        return JsonResponse({ "message": "missing fields" }, status=406)
    # is_active forced to be true for development reasons
    user = User.objects.create_user(email=email, username=username, password=password, is_active=True)
    
    # return HttpResponse('You are successfully signed in!')
    return JsonResponse({"email": email, "pass": password})
    # current_site = get_current_site(request)  
    # mail_subject = 'PallasCat: Activation link'  
    # message = render_to_string('acc_active_email.html', {  
    #     'user': user,  
    #     'domain': current_site.domain,  
    #     'uid': urlsafe_base64_encode(force_bytes(user.pk)),  
    #     'token': account_activation_token.make_token(user),  
    # })  
    # email = EmailMessage(mail_subject, message, to=[email])  
    # email.send() 

    # return HttpResponse('Please confirm your email address to complete the registration')  

def activate(request, uidb64, token):  
    try:  
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)  
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):  
        user = None  
    if user is not None and account_activation_token.check_token(user, token):  
        user.is_active = True  
        user.save()  
        return HttpResponse('ok')  
    else:  
        return HttpResponse('not ok')  

def showUsers(request):
    print(User.objects.values())
    return HttpResponse(User.objects.values())
