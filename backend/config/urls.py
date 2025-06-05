from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({'status': 'healthy', 'message': 'Application is running'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.reservations.urls')),
    path('health/', health_check, name='health_check'),
    path('api/health/', health_check, name='api_health_check'),
]