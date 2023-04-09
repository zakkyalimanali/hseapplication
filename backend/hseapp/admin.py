from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# from . import models
from .models import Account

class AccountAdmin( UserAdmin ): 
    list_display = ('smart_card_no', 'username', 'email')
    search_fields = ('smart_card_no', 'username', 'email')
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

    # add_fieldsets = (
    #     (None, {
    #         'classes': ('wide',),
    #         'fields': ('smart_card_number', 'email', 'password1', 'password2'),
    #     }),
    # )
    # ordering = ('smart_card_number',) 

# Register your models here.
admin.site.register(Account, AccountAdmin)