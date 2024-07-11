from general.models import User

from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

from general.api.serializers import UserRegistrationSerializer
from general.api.serializers import UserListSerializer
from general.api.serializers import UserRetrieveSerializer


class UserViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    GenericViewSet,
):
    queryset = User.objects.all().order_by("-id")

    def get_serializer_class(self):
        if self.action == "create":
            return UserRegistrationSerializer
        if self.action in ["retrieve", "me"]:
            return UserRetrieveSerializer
        return UserListSerializer

    def get_permissions(self): # Создать пользователя без аутентификации, получение всех только после аутентификации
        if self.action == "create":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    @action(detail=False, methods=["get"], url_path="me")
    def me(self, request):
        instance = self.request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
