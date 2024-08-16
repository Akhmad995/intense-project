from rest_framework.routers import SimpleRouter
from general.api.views import (
    UserViewSet,
    PostViewSet,
    CommentsViewSet,
    ReactionViewSet,
    CategoriesViewSet,
)

router = SimpleRouter()
router.register(r'users', UserViewSet, basename="users")
router.register(r'posts', PostViewSet, basename="posts")
router.register(r'comments', CommentsViewSet, basename="comments")
router.register(r'reactions', ReactionViewSet, basename="reactions")
router.register(r'categories', CategoriesViewSet, basename="categories")


urlpatterns = router.urls
