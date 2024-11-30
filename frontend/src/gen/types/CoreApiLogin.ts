import type { GenericSchema } from "./GenericSchema.ts";
import type { Login } from "./Login.ts";

 /**
 * @description OK
*/
export type CoreApiLogin200 = GenericSchema;

 /**
 * @description Bad Request
*/
export type CoreApiLogin400 = GenericSchema;

 export type CoreApiLoginMutationRequest = Login;

 export type CoreApiLoginMutationResponse = CoreApiLogin200;

 export type CoreApiLoginMutation = {
    Response: CoreApiLogin200;
    Request: CoreApiLoginMutationRequest;
    Errors: CoreApiLogin400;
};