from django.db import models
from django.contrib.auth.models import AbstractUser

class Video(models.Model):
    class Platforms(models.IntegerChoices):
        CDA = 1
        OGLADAJANIME = 2
        HDBEST = 3

    cover = models.TextField()
    title = models.CharField(max_length = 50)
    link  = models.TextField()
    platform = models.IntegerField(choices=Platforms.choices)

    class Meta:
        unique_together = ('link','platform')

class User(AbstractUser):
    USERNAME_FIELD = 'email'
    email = models.EmailField(unique=True)
    username = models.CharField(unique=False,max_length = 30)
    REQUIRED_FIELDS = []
    # User's favorite videos
    videos = models.ManyToManyField(Video)
