import type { CreateExerciseSchema } from "./CreateExerciseSchema.ts";
import type { GenericSchema } from "./GenericSchema.ts";

 /**
 * @description OK
*/
export type CoreApiListExercises200 = CreateExerciseSchema[];

 /**
 * @description Unauthorized
*/
export type CoreApiListExercises401 = GenericSchema;

 export type CoreApiListExercisesQueryResponse = CoreApiListExercises200;

 export type CoreApiListExercisesQuery = {
    Response: CoreApiListExercises200;
    Errors: CoreApiListExercises401;
};