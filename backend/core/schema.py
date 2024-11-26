import datetime

from ninja import ModelSchema
from ninja import Schema

from core.models import Exercise
from core.models import Lift


class GenericSchema(Schema):
    detail: str


class ExerciseDTO(ModelSchema):
    class Meta:
        model = Exercise
        fields = "__all__"


class LiftDTO(ModelSchema):
    class Meta:
        model = Lift
        fields = "__all__"


class ExerciseSchema(Schema):
    name: str
    created_by: str


class ExerciseNameModelSchema(Schema):
    name: str


class LiftSchema(Schema):
    exercise: ExerciseNameModelSchema
    repitions: int = 8
    weight: int = 50
    date: datetime.datetime
