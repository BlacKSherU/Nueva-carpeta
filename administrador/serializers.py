from .models import Caso, Cita, Cliente
from rest_framework import serializers


class CasoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caso
        fields = "__all__"


class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = "__all__"


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = "__all__"
