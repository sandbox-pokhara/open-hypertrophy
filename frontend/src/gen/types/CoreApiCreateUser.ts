import type { CreateUser } from "./CreateUser.ts";
import type { GenericSchema } from "./GenericSchema.ts";

 /**
 * @description Created
*/
export type CoreApiCreateUser201 = GenericSchema;

 /**
 * @description Bad Request
*/
export type CoreApiCreateUser400 = GenericSchema;

 export type CoreApiCreateUserMutationRequest = CreateUser;

 export type CoreApiCreateUserMutationResponse = CoreApiCreateUser201;

 export type CoreApiCreateUserMutation = {
    Response: CoreApiCreateUser201;
    Request: CoreApiCreateUserMutationRequest;
    Errors: CoreApiCreateUser400;
};