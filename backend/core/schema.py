import datetime

from django.contrib.auth import get_user_model
from ninja import Field
from ninja import ModelSchema
from ninja import Schema

from core.models import Category
from core.models import Exercise
from core.models import Lift


class GenericSchema(Schema):
    detail: str


class CategorySchema(ModelSchema):
    class Meta:
        model = Category
        fields = "__all__"


class ExerciseSchema(ModelSchema):
    class Meta:
        model = Exercise
        fields = "__all__"


class LiftSchema(ModelSchema):
    exercise__name: str = Field(alias="exercise.name")

    class Meta:
        model = Lift
        fields = "__all__"


class UserSchema(ModelSchema):
    class Meta:
        model = get_user_model()
        fields = "__all__"
        exclude = ["password"]


class CreateExerciseSchema(Schema):
    name: str


class CreateLiftSchema(Schema):
    exercise_id: int
    repetitions: int = 8
    weight: int = 50
    date: datetime.datetime


class CreateUser(Schema):
    first_name: str
    last_name: str
    username: str
    password: str


class Login(Schema):
    username: str
    password: str


class ChangePassword(Schema):
    current_password: str
    new_password: str
