from django.shortcuts import render
from django.http import JsonResponse, HttpRequest
from django.core.mail import send_mail


# Create your views here.
def home(request):
    return render(request, "index.html")


def about(request):
    return render(request, "about.html")


def service(request):
    return render(request, "service.html")


def contact(request):
    return render(request, "contact.html")


def team(request):
    return render(request, "team.html")


def emailapi(request: HttpRequest):
    if request.method == "POST":
        send_mail(
            request.POST["titulo"],
            request.POST["contenido"],
            "firmabinary@gmail.com",
            [
                request.POST["correo"],
            ],
            fail_silently=False,
        )
        return JsonResponse(
            {
                "xd": "enviado",
            }
        )
    else:
        return JsonResponse({}, status=400)
