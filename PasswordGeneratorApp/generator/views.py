# generator/views.py
import random
import string
from django.shortcuts import render


def home(request):
    return render(request, "generator/home.html")


def generate_password(request):
    length = int(request.GET.get("length", 12))
    characters = string.ascii_lowercase

    if request.GET.get("uppercase"):
        characters += string.ascii_uppercase
    if request.GET.get("numbers"):
        characters += string.digits
    if request.GET.get("special"):
        characters += string.punctuation

    password = "".join(random.choice(characters) for _ in range(length))

    return render(request, "generator/home.html", {"password": password})
