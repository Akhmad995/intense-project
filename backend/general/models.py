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


# Модель для постов
class Post(models.Model):
    author = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='posts',
    )
    title = models.CharField(max_length=64)
    body = models.TextField(verbose_name='Текст поста',)
    category = models.ForeignKey('Category', verbose_name='Категория', on_delete=models.PROTECT, null=True)
    post_picture = models.ImageField(verbose_name='Фото', upload_to='photos/%Y/%m/%d/', blank=True, null=True ) # разбивка фотографий по папкам г/м/д
    read_time = models.CharField(verbose_name='Время на чтение', max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f'({self.id}) {self.title}'
    
# Категория поста
class Category(models.Model):
    title = models.CharField(verbose_name='Название категории', max_length=150, unique=True, db_index=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['-title']


# Модель комментариев к постам
class Comment(models.Model):
    body = models.TextField()
    author = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='comments',
    )
    post = models.ForeignKey(
        to=Post,
        on_delete=models.CASCADE,
        related_name='comments',
    )
    created_at = models.DateTimeField(auto_now_add=True)


# Модель реакций
class Reaction(models.Model):
    class Values(models.TextChoices):
        #SMILE = 'smile', 'Улыбка'
        #THUMB_UP = 'thump_up', 'Большой палец вверх'
        #LAUGH = 'laugh', 'Смех'
        #SAD = 'sad', 'Грусть'
        HEART = 'heart', 'Сердце'
    
    value = models.CharField(max_length=8, choices=Values.choices, null=True)
    author = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='reactions',
    )
    post = models.ForeignKey(
        to=Post,
        on_delete=models.CASCADE,
        related_name='reactions',
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                'author',
                'post',
                name='author_post_unique',
            )
        ]