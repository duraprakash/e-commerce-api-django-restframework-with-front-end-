from rest_framework import serializers
from .models import User

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['email', 'username', 'password']

class UserSerializer(serializers.ModelSerializer):
    user_category = serializers.CharField(required=False)

    class Meta:
        model = User
        # fields = ['email', 'username', 'password']
        fields = ['email', 'username', 'password', 'user_category']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user_category = validated_data.pop('user_category', None)

        if user_category == "admin":
            user = User.objects.create(**validated_data, is_superuser=True, is_staff=True)
        else:
            user = User.objects.create(**validated_data)
        
        user.set_password(password)
        user.save()
        return user

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

class LogoutSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)