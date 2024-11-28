import type { CreateExerciseSchema } from "./CreateExerciseSchema.ts";

 /**
 * @description OK
*/
export type CoreApiListExercises200 = CreateExerciseSchema[];

 export type CoreApiListExercisesQueryResponse = CoreApiListExercises200;

 export type CoreApiListExercisesQuery = {
    Response: CoreApiListExercises200;
    Errors: any;
};