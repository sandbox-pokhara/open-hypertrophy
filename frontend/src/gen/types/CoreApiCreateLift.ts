import type { CreateLiftSchema } from "./CreateLiftSchema.ts";
import type { GenericSchema } from "./GenericSchema.ts";

 /**
 * @description Created
*/
export type CoreApiCreateLift201 = GenericSchema;

 /**
 * @description Unauthorized
*/
export type CoreApiCreateLift401 = GenericSchema;

 /**
 * @description Not Found
*/
export type CoreApiCreateLift404 = GenericSchema;

 export type CoreApiCreateLiftMutationRequest = CreateLiftSchema;

 export type CoreApiCreateLiftMutationResponse = CoreApiCreateLift201;

 export type CoreApiCreateLiftMutation = {
    Response: CoreApiCreateLift201;
    Request: CoreApiCreateLiftMutationRequest;
    Errors: CoreApiCreateLift401 | CoreApiCreateLift404;
};