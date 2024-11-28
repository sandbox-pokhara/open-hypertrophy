import type { CreateExerciseSchema } from "./CreateExerciseSchema.ts";
import type { GenericSchema } from "./GenericSchema.ts";

 /**
 * @description Created
*/
export type CoreApiCreateExercise201 = GenericSchema;

 export type CoreApiCreateExerciseMutationRequest = CreateExerciseSchema;

 export type CoreApiCreateExerciseMutationResponse = CoreApiCreateExercise201;

 export type CoreApiCreateExerciseMutation = {
    Response: CoreApiCreateExercise201;
    Request: CoreApiCreateExerciseMutationRequest;
    Errors: any;
};