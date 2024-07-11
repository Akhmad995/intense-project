from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import UniqueConstraint, F, functions


# Модель пользователя
class User(AbstractUser):
    # username = models.CharField(help_text=False, max_length=155, unique=True)
    link_site = models.CharField(verbose_name='Сайт', max_length=155)
    link_insta = models.CharField(verbose_name='Instagram', max_length=155)
    link_twit = models.CharField(verbose_name='Twitter', max_length=155)
