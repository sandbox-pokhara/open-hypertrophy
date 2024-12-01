import type { ChangePassword } from "./ChangePassword.ts";
import type { GenericSchema } from "./GenericSchema.ts";

 /**
 * @description OK
*/
export type CoreApiChangePassword200 = GenericSchema;

 /**
 * @description Bad Request
*/
export type CoreApiChangePassword400 = GenericSchema;

 /**
 * @description Unauthorized
*/
export type CoreApiChangePassword401 = GenericSchema;

 export type CoreApiChangePasswordMutationRequest = ChangePassword;

 export type CoreApiChangePasswordMutationResponse = CoreApiChangePassword200;

 export type CoreApiChangePasswordMutation = {
    Response: CoreApiChangePassword200;
    Request: CoreApiChangePasswordMutationRequest;
    Errors: CoreApiChangePassword400 | CoreApiChangePassword401;
};