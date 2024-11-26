from django.http import HttpRequest
from ninja import NinjaAPI
from ninja.security import django_auth

from core.models import Exercise
from core.models import Lift
from core.schema import GenericSchema
from core.schema import ExerciseDTO
from core.schema import ExerciseSchema
from core.schema import LiftDTO
from core.schema import LiftSchema

api = NinjaAPI(docs_url="/docs/", csrf=True)


@api.get(
    "/exercises/",
    auth=django_auth,
    response={200: list[ExerciseDTO]},
    tags=["Exercise"],
)
def list_exercises(request: HttpRequest):
    data = Exercise.objects.all().order_by("-date_created")
    return 200, data


@api.post(
    "/exercise/create-exercise/",
    auth=django_auth,
    response={200: GenericSchema, 500: GenericSchema},
    tags=["Exercise"],
)
def create_exercise(request: HttpRequest, payload: ExerciseSchema):
    try:
        if request.method == "POST":
            Exercise.objects.create(name=payload.name, created_by=request.user)
            return 200, {"detail": "Exercise added successfully."}
    except Exception as e:
        return 500, {"detail": str(e)}


@api.get(
    "/lifts/", auth=django_auth, response={200: list[LiftDTO]}, tags=["Lifts"]
)
def list_lifts(request: HttpRequest):
    data = Lift.objects.all().order_by("-date_created")
    return 200, data


@api.post(
    "/lifts/create-lift/",
    auth=django_auth,
    response={200: GenericSchema, 404: GenericSchema, 500: GenericSchema},
    tags=["Lifts"],
)
def create_lift(request: HttpRequest, payload: LiftSchema):
    try:
        if request.method == "POST":
            exercise_name = Exercise.objects.get(name=payload.exercise.name)
            Lift.objects.create(
                user=request.user,
                date=payload.date,
                exercise=exercise_name,
                repitions=payload.repitions,
                weight=payload.weight,
            )

            return 200, {"detail": "Lift created successfully."}

    except Exercise.DoesNotExist:
        return 404, {"detail": "Exercise not found"}
    except Exception as e:
        return 500, {"detail": str(e)}
