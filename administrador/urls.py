from django.urls import path
from . import views

urlpatterns = [
    path("", views.login_administrador, name="login_administrador"),
    path("home", views.home_administrador, name="home_administrador"),
    path("client_list", views.client_list, name="client_list"),
    path("client_new", views.client_new, name="client_new"),
    path("client_search", views.client_search, name="client_search"),
    path("client_update", views.client_update, name="client_update"),
    path("item_list", views.item_list, name="item_list"),
    path("item_new", views.item_new, name="item_new"),
    path("item_search", views.item_search, name="item_search"),
    path("item_update", views.item_update, name="item_update"),
    path("reservation_list", views.reservation_list, name="reservation_list"),
    path("reservation_new", views.reservation_new, name="reservation_new"),
    path("reservation_pending", views.reservation_pending, name="reservation_pending"),
    path("reservation_search", views.reservation_search, name="reservation_search"),
    path("reservation_update", views.reservation_update, name="reservation_update"),
    path("payment", views.payment, name="payment"),
    path("user_update", views.user_update, name="user_update"),
]
