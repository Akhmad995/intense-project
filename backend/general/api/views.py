from rest_framework import (
    status,
    generics
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.viewsets import (
    GenericViewSet,
    ModelViewSet,
)
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)

from general.api.serializers import (
    UserRegistrationSerializer,
    UserListSerializer,
    UserRetrieveSerializer,
    UserUpdateSerializer,
    PostListSerializer,
    PostRetrieveSerializer,
    PostCreateUpdateSerializer,
    CommentSerializer,
    VoteSerializer,
    ReactionSerializer,
    CategorySerializer,
) 

from django.db.models import (
    Q,
    OuterRef,
    Subquery,
    F,
    Case,
    When,
    CharField,
    Value
)

from general.models import (
    User,
    Post,
    Comment,
    Reaction,
    Category,
)


class UserViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = User.objects.all().order_by("-id")

    def get_serializer_class(self):
        if self.action == "create":
            return UserRegistrationSerializer
        if self.action in ["retrieve", "me"]:
            return UserRetrieveSerializer
        if self.action == "update":
            return UserUpdateSerializer 
        return UserListSerializer

    def get_permissions(self): # Создать пользователя без аутентификации, получение всех только после аутентификации
        if self.action == "create":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    @action(detail=False, methods=["get", "patch"], url_path="me")
    def me(self, request):
        if request.method == "PATCH":
            serializer = self.get_serializer(instance=request.user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if request.method == "GET":
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)



# Вьюсет для работы с постами
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().order_by("-id")
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "list":
            return PostListSerializer
        elif self.action == "retrieve":
            return PostRetrieveSerializer
        return PostCreateUpdateSerializer

    def perform_update(self, serializer):
        instance = self.get_object()

        if instance.author != self.request.user:
            raise PermissionDenied("Вы не являетесь автором этого поста.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionDenied("Вы не являетесь автором этого поста.")
        instance.delete()


# Вьюсет для работы с комментариями
class CommentsViewSet(
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    GenericViewSet,
):
    queryset = Comment.objects.all().order_by("-id")
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["post__id"]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionDenied("Вы не являетесь автором этого комментария.")
        instance.delete()

    @action(detail=True, methods=["post"], url_path="vote")
    def vote(self, request, pk=None):
        comment = self.get_object()
        serializer = VoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.update(comment, serializer.validated_data)
            return Response(CommentSerializer(comment, context=self.get_serializer_context()).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



# Реакции
class ReactionViewSet(
    CreateModelMixin,
    GenericViewSet,
):
    queryset = Reaction.objects.all().order_by("-id")
    permission_classes = [IsAuthenticated]
    serializer_class = ReactionSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# Категории
class CategoriesViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):  
    queryset = Category.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer

    

