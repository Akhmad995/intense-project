from django.contrib import admin
from datetime import datetime
from general.models import (
    User,
    Post,
    Comment,
    Reaction,
    Category,
)
from rangefilter.filters import DateRangeFilter
from django.contrib.auth.models import Group
from general.filters import (
    AuthorFilter,
    PostFilter,
)
from django_admin_listfilter_dropdown.filters import ChoiceDropdownFilter


# Управление пользователями в админке
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
                    "profile_picture",
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


# Управление постами в админке
@admin.register(Post)
class PostModelAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "get_body",
        "author",
        "category",
        "get_comment_count",
        "created_at",
    )
    list_display_links = (
        "id",
        "title",
    )
    fields = (
        "title",
        "body",
        "category",
        "author",
        "read_time",
        "post_picture",
    )
    search_fields = (
        "username",
        "email",
    )
    list_filter = (
        AuthorFilter,
        ("created_at", DateRangeFilter),
    )

    def get_body(self, obj):
        max_length = 64
        if len(obj.body) > max_length:
            return obj.body[:61] + '...'
        return obj.body
    
    get_body.short_description = 'body'

    def get_comment_count(self, obj):
        return obj.comments.count()
    
    get_comment_count.short_description = 'comments count'

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related("comments")
    
# Управление категориями в админке
@admin.register(Category)
class Category(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
    )
    list_display_links = (
        "id",
        "title",
    )
    fields = (
        "title",
    )



# Управление комментариями в админке
@admin.register(Comment)
class CommentModelAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "post",
        "body",
        "created_at",
    )
    list_display_links = (
        "id",
        "author",
    )
    list_filter = (
        PostFilter,
        AuthorFilter,
    )
    raw_id_fields = (
        "author",
    )


@admin.register(Reaction)
class ReactionModelAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "post",
        "value",
    )
    list_filter = (
        PostFilter,
        AuthorFilter,
        ("value", ChoiceDropdownFilter),
    )
    autocomplete_fields = (
        "author",
        "post",
    )


admin.site.unregister(Group)