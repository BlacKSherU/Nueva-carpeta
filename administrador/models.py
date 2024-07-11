from django.db import models

# Create your models here.


class Cliente(models.Model):
    dni = models.CharField(max_length=10)
    nombre = models.CharField(max_length=10)
    apellido = models.CharField(max_length=10)
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=150)
    email = models.EmailField(null=True)


class Caso(models.Model):
    class Abogado(models.TextChoices):
        civil = "abogado civil"
        penal = "abogado penal"
        familiar = "abogado familiar"

    cliente = models.ForeignKey(to=Cliente, on_delete=models.CASCADE)
    caso = models.CharField(max_length=9)
    abogado = models.CharField(max_length=30, choices=Abogado.choices)
    detalle = models.CharField(max_length=190)


class Cita(models.Model):

    class Estado(models.TextChoices):
        prestamo = "prestamo"
        reservacion = "reservacion"
        finalizado = "finalizado"

    cliente = models.ForeignKey(to=Cliente, on_delete=models.CASCADE)
    fecha_reserva = models.DateTimeField()
    fecha_entrega = models.DateTimeField()
    estado = models.CharField(max_length=30, choices=Estado.choices)
    total_pagar = models.FloatField()
    total_pagado = models.FloatField()
