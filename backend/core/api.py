from django.db import IntegrityError
from django.http import HttpRequest
from ninja import NinjaAPI
from ninja import Router
from ninja.security import SessionAuth

from core.models import Exercise
from core.models import Lift
from core.schema import CreateExerciseSchema
from core.schema import CreateLiftSchema
from core.schema import GenericSchema
from core.schema import LiftSchema

exercises = Router()
lifts = Router()

api = NinjaAPI(docs_url="/docs/")
api.add_router("/exercises/", exercises, tags=["exercises"])
api.add_router("/lifts/", lifts, tags=["lifts"])


@api.exception_handler(IntegrityError)
def integrity_error_handler(request: HttpRequest, exc: IntegrityError):
    return api.create_response(request, {"detail": str(exc)}, status=400)


@api.exception_handler(ValueError)
def value_error_handler(request: HttpRequest, exc: ValueError):
    return api.create_response(request, {"detail": str(exc)}, status=400)


session_auth = SessionAuth(csrf=False)


@exercises.get(
    "/", auth=session_auth, response={200: list[CreateExerciseSchema]}
)
def list_exercises(request: HttpRequest):
    return 200, Exercise.objects.all().order_by("-date_created")


@exercises.post("/", auth=session_auth, response={201: GenericSchema})
def create_exercise(request: HttpRequest, payload: CreateExerciseSchema):
    Exercise.objects.create(name=payload.name, created_by=request.user)
    return 201, {"detail": "Exercise created successfully."}


@lifts.get("/", auth=session_auth, response={200: list[LiftSchema]})
def list_lifts(request: HttpRequest):
    return 200, Lift.objects.filter(user=request.user).order_by("date")


@lifts.post(
    "/", auth=session_auth, response={201: GenericSchema, 404: GenericSchema}
)
def create_lift(request: HttpRequest, payload: CreateLiftSchema):
    try:
        exercise = Exercise.objects.get(id=payload.exercise_id)
        Lift.objects.create(
            user=request.user,
            date=payload.date,
            exercise=exercise,
            repitions=payload.repitions,
            weight=payload.weight,
        )

        return 201, {"detail": "Lift created successfully."}
    except Exercise.DoesNotExist:
        return 404, {"detail": "Exercise not found."}
