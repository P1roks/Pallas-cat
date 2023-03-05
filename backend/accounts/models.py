from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Video(models.Model):
    cover = models.TextField()
    title = models.CharField(max_length = 50)
    link  = models.TextField()
    platform = models.IntegerField()
    # users which made this video their favorite
    users = models.ManyToManyField(User)
