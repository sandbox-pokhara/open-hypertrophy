from typing import cast

from django.contrib import admin
from django.contrib.auth.models import AbstractUser
from django.forms import ModelForm
from django.http import HttpRequest
from django.utils import timezone

from core.models import Exercise
from core.models import Lift


@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin[Exercise]):
    list_display = [
        "id",
        "name",
        "created_by",
        "date_created",
        "date_modified",
    ]
    list_filter = ["created_by", "date_created", "date_modified"]
    exclude = ["created_by"]
    search_fields = ["name"]

    # automatically set created_by to logged in user
    def save_model(
        self,
        request: HttpRequest,
        obj: Exercise,
        form: ModelForm,
        change: bool,
    ):
        # using cast because user using django admin will never
        # be anonymous
        user = cast(AbstractUser, request.user)
        if not change:
            obj.created_by = user
        return super().save_model(request, obj, form, change)


@admin.register(Lift)
class LiftAdmin(admin.ModelAdmin[Lift]):
    autocomplete_fields = ["exercise"]
    list_display = [
        "id",
        "user",
        "exercise",
        "repitions",
        "weight",
        "date_created",
        "date_modified",
    ]
    list_filter = ["user", "exercise", "date_created", "date_modified"]
    exclude = ["user", "date"]

    # automatically set created_by to logged in user
    def save_model(
        self,
        request: HttpRequest,
        obj: Lift,
        form: ModelForm,
        change: bool,
    ):
        # using cast because user using django admin will never
        # be anonymous
        user = cast(AbstractUser, request.user)
        if not change:
            obj.user = user
            obj.date = timezone.now()
        return super().save_model(request, obj, form, change)
