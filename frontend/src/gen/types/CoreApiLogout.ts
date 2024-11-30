import type { GenericSchema } from "./GenericSchema.ts";

 /**
 * @description OK
*/
export type CoreApiLogout200 = GenericSchema;

 export type CoreApiLogoutMutationResponse = CoreApiLogout200;

 export type CoreApiLogoutMutation = {
    Response: CoreApiLogout200;
    Errors: any;
};