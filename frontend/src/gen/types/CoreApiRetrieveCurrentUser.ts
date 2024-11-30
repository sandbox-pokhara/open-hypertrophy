import type { UserSchema } from "./UserSchema.ts";

 /**
 * @description OK
*/
export type CoreApiRetrieveCurrentUser200 = UserSchema;

 export type CoreApiRetrieveCurrentUserQueryResponse = CoreApiRetrieveCurrentUser200;

 export type CoreApiRetrieveCurrentUserQuery = {
    Response: CoreApiRetrieveCurrentUser200;
    Errors: any;
};