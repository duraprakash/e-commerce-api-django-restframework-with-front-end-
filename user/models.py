from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username
    