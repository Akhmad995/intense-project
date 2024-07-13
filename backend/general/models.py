from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import UniqueConstraint, F, functions
from django.utils.html import mark_safe


# Модель пользователя
class User(AbstractUser):
    # username = models.CharField(help_text=False, max_length=155, unique=True)
    profile_picture = models.ImageField(verbose_name='Фото', upload_to='photos/%Y/%m/%d/', blank=True, null=True ) # разбивка фотографий по папкам г/м/д
    link_site = models.CharField(verbose_name='Сайт', max_length=155,  blank=True, null=True)
    link_insta = models.CharField(verbose_name='Instagram', max_length=155,  blank=True, null=True)
    link_twit = models.CharField(verbose_name='Twitter', max_length=155,  blank=True, null=True)
