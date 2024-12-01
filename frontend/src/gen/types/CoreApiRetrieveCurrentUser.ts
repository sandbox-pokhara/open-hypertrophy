import type { GenericSchema } from "./GenericSchema.ts";
import type { UserSchema } from "./UserSchema.ts";

 /**
 * @description OK
*/
export type CoreApiRetrieveCurrentUser200 = UserSchema;

 /**
 * @description Unauthorized
*/
export type CoreApiRetrieveCurrentUser401 = GenericSchema;

 export type CoreApiRetrieveCurrentUserQueryResponse = CoreApiRetrieveCurrentUser200;

 export type CoreApiRetrieveCurrentUserQuery = {
    Response: CoreApiRetrieveCurrentUser200;
    Errors: CoreApiRetrieveCurrentUser401;
};