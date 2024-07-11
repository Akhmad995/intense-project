from django.contrib import admin
from datetime import datetime
from general.models import (
    User
)
from rangefilter.filters import DateRangeFilter
from django.contrib.auth.models import Group
from general.filters import (
    AuthorFilter,
)
from django_admin_listfilter_dropdown.filters import ChoiceDropdownFilter


@admin.register(User)
class UserModelAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "username",
        "first_name",
        "last_name",
        "email",
        "is_staff",
        "is_superuser",
        "is_active",
        "date_joined",
    )
    list_display_links = (
        "id",
        "username",
    )
    readonly_fields = (
        "date_joined",
        "last_login",
    )
    """ fields = (
        "first_name",
        "last_name",
        "username",
        "password",
        "email",
        "is_staff",
        "is_superuser",
        "is_active",
        "date_joined",
        "last_login",
    ) """
    fieldsets = (
        (
            "Личные данные", {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "link_site",
                    "link_insta",
                    "link_twit",
                )
            }
        ),
        (
            "Учетные данные", {
                "fields": (
                    "username",
                    "password",
                )
            }
        ),
        (
            "Статусы", {
                "classes": (
                    "collapse",
                ),
                "fields": (
                    "is_staff",
                    "is_superuser",
                    "is_active",
                )
            }
        ),
        (
            "Даты", {
                "fields": (
                    "date_joined",
                    "last_login",
                )
            }
        )

    )
    search_fields = (
        "id",
        "username",
        "email",
    )
    list_filter = (
        "is_staff",
        "is_superuser",
        "is_active",
        ("date_joined", DateRangeFilter),
    )


admin.site.unregister(Group)