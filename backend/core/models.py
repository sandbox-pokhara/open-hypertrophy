from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone


class Exercise(models.Model):
    name = models.CharField(max_length=64, unique=True)
    created_by = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Lift(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    date = models.DateTimeField(default=timezone.now)
    exercise = models.ForeignKey(Exercise, on_delete=models.PROTECT)
    repetitions = models.PositiveSmallIntegerField(default=8)
    weight = models.PositiveSmallIntegerField(default=50)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} {self.date} {self.exercise}"
