from rest_framework import serializers
from django.db.models import Q
from general.models import (
    User,
    Post,
    Comment,
    Reaction,
)

# Регистрация
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "email",
        )

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

# Получаем всех пользователей
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "link_site",
            "link_insta",
            "link_twit",
            "profile_picture",
        )


# Получаем информацию о пользователе
class UserRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "link_site",
            "link_insta",
            "profile_picture",
            "posts",
        )



# Посты конкретного пользователя
class NestedPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            "id",
            "title",
            "body",
            "category",
            "category",
            "post_picture",
            "read_time",
            "created_at",
        )


# Создание и обновление поста
class PostCreateUpdateSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    class Meta:
        model = Post
        fields = (
            "id",
            "author",
            "title",
            "body",
            "category",
            "post_picture",
            "read_time",
        )

# Получаем автора поста
class UserShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name")


# Полуаем данные поста с сокращенным текстом
class PostListSerializer(serializers.ModelSerializer):
    author = UserShortSerializer()
    body = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id",
            "author",
            "title",
            "body",
            "category",
            "post_picture",
            "read_time",
            "created_at",
        )

    def get_body(self, obj) -> str:
        if len(obj.body) > 128:
            return obj.body[:125] + "..."
        return obj.body
    

# Получаем пост полностью по id
class PostRetrieveSerializer(serializers.ModelSerializer):
    author = UserShortSerializer()
    my_reaction = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id",
            "author",
            "title",
            "body",
            "category",
            "post_picture",
            "read_time",
            "my_reaction",
            "created_at",
        )

    def get_my_reaction(self, obj) -> str:
        reaction = self.context["request"].user.reactions.filter(post=obj).last()
        return reaction.value if reaction else ""
    

# Добавить комментарий к посту
class CommentSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    def get_fields(self):
        fields = super().get_fields()
        if self.context["request"].method == "GET":
            fields["author"] = UserShortSerializer(read_only=True)
        return fields

    class Meta:
        model = Comment
        fields = (
            "id",
            "author",
            "post",
            "body",
            "created_at",
        )


# Реакции
class ReactionSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    class Meta:
        model = Reaction
        fields = (
            "id",
            "author",
            "post",
            "value",
        )

    def create(self, validated_data):
        reaction = Reaction.objects.filter(
            post=validated_data["post"],
            author=validated_data["author"],
        ).last()

        if not reaction:
            return Reaction.objects.create(**validated_data)

        if reaction.value == validated_data["value"]:
            reaction.value = None
        else:
            reaction.value = validated_data["value"]
        reaction.save()

        return reaction