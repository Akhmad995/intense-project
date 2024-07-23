# python --version
# pip uninstall libname - удаление библиоетки
# pip freeze > requirements.txt - Список установленных библиотек
# pip install -r requirements.txt - Установка библиотек из списка
# pip install -U pyinstaller - проект в exe
# pyinstaller --onefile first.py
# pip install flask - фреймворк фласк
# pip install flask-wtf - библиотека для обратки форм

# Смена линтера CTRL + SHIFT + p, выбрать mypy

# python -m venv venv - виртуальное окружение
# source venv/Scripts/activate - активация


# pip install python-dotenv - работа с файлом настроек

# pip install flask-migrate - библиотека для миграций, является оберткой для Alembic
# export FLASK_APP= {имя главного файла}
# flask db init
# flask db stamp head
# flask db migrate
# flask db migrate -m 'Расширил модель пользотеля'
# flask db upgrade


# pip install Flask-SQLAlchemy - установка orm SQLAlchemy

# pip install python-dotenv - работа с файлом настроек

# pip install flask-login - библиотека для атворизации

# pip install Flask-RESTful
# pip install SQLAlchemy-serializer

# pip install django - джанго
# django-admin startproject my_proj - создаем проект
# python manage.py startapp posts
# python manage.py runserver
# python manage.py createsuperuser

# python manage.py shell

# python manage.py makemigrations
# python manage.py makemigrations posts
# python manage.py migrate
# python manage.py sqlmigrate news 0001 - смотрим sql запрос

# pip install djangorestframework - Rest API

# pip install Pillow - для работы с изображениями во время миграций

# pip install gunicorn