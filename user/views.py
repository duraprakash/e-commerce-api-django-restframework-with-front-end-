from rest_framework.authentication import TokenAuthentication
from .serializers import (
    UserSerializer,
    UserListSerializer,
    LoginSerializer,
    LogoutSerializer,
)
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
)
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer

    # # need token key to access user list [Authorization Token tokenkey] in postman header
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]

class UserCreateView(CreateAPIView):
    serializer_class = UserSerializer

class UserRetriveView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer

class UserUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer

class UserDeleteView(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'message':'Invalid Credentials u'}, status=401)
        
        if not user.check_password(password):
            return Response({'message':'Invalid Credentials p'}, status=401)

        token, created = Token.objects.get_or_create(user=user)

        return Response({'message':'Login Successful', 'token': token.key})
    
class UserLogoutView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        token_from_user = serializer.validated_data.get("token")

        try:
            token = Token.objects.get(key=token_from_user)
            token.delete()
            return Response({'message':'Logout Successful'}, status=200)
        except Token.DoesNotExist:
            return Response({'message':'Invalid Token'}, status=400)
