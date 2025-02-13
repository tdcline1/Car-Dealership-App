"""djangoproj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from django.shortcuts import redirect

# Define Vercel frontend base URL
VERCEL_FRONTEND_URL = "https://car-dealership-app-ix.vercel.app"

urlpatterns = [
    # Django Admin & Backend API
    path('admin/', admin.site.urls),
    path('djangoapp/', include('djangoapp.urls')),

    # Django Template Views (Only for Home, About, Contact)
    path('', TemplateView.as_view(template_name="Home.html")),
    path('about/', TemplateView.as_view(template_name="About.html")),
    path('contact/', TemplateView.as_view(template_name="Contact.html")),

    # Redirect React frontend routes to Vercel
    path('login/', lambda request: redirect(f"{VERCEL_FRONTEND_URL}/login/")),
    path('register/', lambda request: redirect(f"{VERCEL_FRONTEND_URL}/register/")),
    path('dealers/', lambda request: redirect(f"{VERCEL_FRONTEND_URL}/dealers/")),
    path('dealer/<int:dealer_id>/', lambda request, dealer_id: redirect(f"{VERCEL_FRONTEND_URL}/dealer/{dealer_id}/")),
    path('postreview/<int:dealer_id>/', lambda request, dealer_id: redirect(f"{VERCEL_FRONTEND_URL}/postreview/{dealer_id}/")),
    path('searchcars/<int:dealer_id>/', lambda request, dealer_id: redirect(f"{VERCEL_FRONTEND_URL}/searchcars/{dealer_id}/")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
