import datetime

from ninja import Field
from ninja import ModelSchema
from ninja import Schema

from core.models import Exercise
from core.models import Lift


class GenericSchema(Schema):
    detail: str


class ExerciseSchema(ModelSchema):
    class Meta:
        model = Exercise
        fields = "__all__"


class LiftSchema(ModelSchema):
    exercise__name: str = Field(alias="exercise.name")

    class Meta:
        model = Lift
        fields = "__all__"


class CreateExerciseSchema(Schema):
    name: str


class CreateLiftSchema(Schema):
    exercise_id: int
    repitions: int = 8
    weight: int = 50
    date: datetime.datetime
