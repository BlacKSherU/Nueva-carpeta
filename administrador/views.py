from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CasoSerializer, CitaSerializer, ClienteSerializer
from .models import Cliente, Caso, Cita
from rest_framework import filters
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
def login_administrador(request):
    return render(request, "Administrador/index.html")


def home_administrador(request):
    return render(request, "Administrador/home.html")


# client


def client_list(request):
    return render(request, "Administrador/client-list.html")


def client_new(request):
    return render(request, "Administrador/client-new.html")


def client_search(request):
    return render(request, "Administrador/client-search.html")


def client_update(request):
    return render(request, "Administrador/client-update.html")


# item


def item_list(request):
    return render(request, "Administrador/item-list.html")


def item_new(request):
    return render(request, "Administrador/item-new.html")


def item_search(request):
    return render(request, "Administrador/item-search.html")


def item_update(request):
    return render(request, "Administrador/item-update.html")


# reservation


def reservation_list(request):
    return render(request, "Administrador/reservation-list.html")


def reservation_new(request):
    return render(request, "Administrador/reservation-new.html")


def reservation_pending(request):
    return render(request, "Administrador/reservation-pending.html")


def reservation_search(request):
    return render(request, "Administrador/reservation-search.html")


def reservation_update(request):
    return render(request, "Administrador/reservation-update.html")


# user
def user_update(request):
    return render(request, "Administrador/user-update.html")


# payment
def payment(request):
    return render(request, "Administrador/payment.html")


class ClienteViewset(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["dni"]


class CasoViewset(viewsets.ModelViewSet):
    queryset = Caso.objects.all()
    serializer_class = CasoSerializer


class CitaViewset(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
