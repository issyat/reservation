from django.contrib import admin
from .models import Reservation

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'date', 'time', 'message')
    list_filter = ('date', 'time')
    search_fields = ('name', 'email')
    date_hierarchy = 'date'
    ordering = ('-date', '-time')