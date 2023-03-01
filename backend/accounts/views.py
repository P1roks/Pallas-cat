from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login
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
    email = request.POST.get("email")
    password = request.POST.get("password")
    user = authenticate(email=email, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({ "message": "ok" })
    else:
        return JsonResponse({ "message": "not ok" })

def is_logged(request) -> JsonResponse:
    if not request.user.is_authenticated:
        return JsonResponse({ "message": "not logged" })
    else: 
        return JsonResponse({ "message": "logged", "is_active": request.user.is_active })

@csrf_exempt
@require_http_methods(["POST"])
def signup(request):
    email = request.POST.get("email")
    username = request.POST.get("username")
    password = request.POST.get("password")
    if email is not None and username is not None and password is not None:  
        user = User.objects.create_user(email=email, username=username, password=password, is_active=False)
        
        return HttpResponse('You are successfully signed in!')
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
    else:  
        return HttpResponse('bajo jajo') 

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