from rest_framework import serializers
from django.db.models import Q
from general.models import (
    User,
    Post,
    Comment,
    Reaction,
    Category,
)

# Регистрация
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "email",
            "profile_picture",
        )

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            profile_picture=validated_data['profile_picture'],
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
            "is_superuser",
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
            "post_picture",
            "read_time",
            "created_at",
        )


# Комментарии конкретного пользователя
class NestedCommentListSerializer(serializers.ModelSerializer):
    score = serializers.IntegerField()

    class Meta:
        model = Comment
        fields = (
            "id",
            "author",
            "post",
            "body",
            "created_at",
            "upvotes",
            "downvotes",
            "score",  # Общий рейтинг комментария
        )


# Получаем информацию о пользователе
class UserRetrieveSerializer(serializers.ModelSerializer):
    posts = NestedPostListSerializer(many=True)
    comments = NestedCommentListSerializer(many=True)

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
            "is_superuser",
            "posts",
            "comments",
        )


# Сериализатор для обновления пользователя
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "link_site",
            "link_insta",
            "link_twit",
            "profile_picture",
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

# Получаем комментарии поста
class CommentShortSerializer(serializers.ModelSerializer):
    score = serializers.IntegerField()

    class Meta:
        model = Comment
        fields = (
            "id",
            "author",
            "post",
            "body",
            "created_at",
            "upvotes",
            "downvotes",
            "score",  # Общий рейтинг комментария
        )



# Полуаем данные поста с сокращенным текстом
class PostListSerializer(serializers.ModelSerializer):
    author = UserShortSerializer()
    body = serializers.SerializerMethodField()
    category = serializers.StringRelatedField()

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
    category = serializers.StringRelatedField()
    comments = CommentShortSerializer()

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
            "comments",
        )

    def get_my_reaction(self, obj) -> str:
        reaction = self.context["request"].user.reactions.filter(post=obj).last()
        return reaction.value if reaction else ""
    

# Категории постов
class CategorySerializer(serializers.ModelSerializer):
    posts = PostListSerializer(many=True, read_only=True, source='post_set')

    class Meta:
        model = Category
        fields = (
            "id",
            "title",
            "posts",
        )


# Сериалайзер для комментариев
class CommentSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    score = serializers.IntegerField(read_only=True)
    upvotes = serializers.IntegerField(default=0, read_only=True, min_value=0)  # Значение по умолчанию
    downvotes = serializers.IntegerField(default=0, read_only=True, min_value=0)  # Значение по умолчанию

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
            "upvotes",
            "downvotes",
            "score",  # Общий рейтинг комментария
        )


# Голосование за комментарий
class VoteSerializer(serializers.Serializer):
    vote_type = serializers.ChoiceField(choices=['upvote', 'downvote'])

    def update(self, instance, validated_data):
        vote_type = validated_data.get('vote_type')
        if vote_type == 'upvote':
            instance.upvotes += 1
        elif vote_type == 'downvote':
            instance.downvotes += 1
        instance.save()
        return instance
    


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
        # Найти или создать реакцию
        reaction, created = Reaction.objects.get_or_create(
            post=validated_data["post"],
            author=validated_data["author"],
            defaults={"value": validated_data["value"]},
        )

        # Если реакция уже существует и не была создана
        if not created:
            if reaction.value == validated_data["value"]:
                # Если реакция такая же, как и ранее, удаляем её
                reaction.delete()
            else:
                # Обновляем значение реакции
                reaction.value = validated_data["value"]
                reaction.save()

        return reaction
    