"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from .views import (
    UserListView,
    UserCreateView,
    UserRetriveView,
    UserUpdateView,
    UserDeleteView,
    
    UserLoginView,
    UserLogoutView,
)

urlpatterns = [
    path('', UserListView.as_view(), name='users'),
    path('create/', UserCreateView.as_view(), name='user-create'),
    path('<int:pk>/', UserRetriveView.as_view(), name='user'),
    path('<int:pk>/update/', UserUpdateView.as_view(), name='user-edit'),
    path('<int:pk>/delete/', UserDeleteView.as_view(), name='user-delete'),
    
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]
