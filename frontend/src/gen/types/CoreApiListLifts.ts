import type { GenericSchema } from "./GenericSchema.ts";
import type { LiftSchema } from "./LiftSchema.ts";

 /**
 * @description OK
*/
export type CoreApiListLifts200 = LiftSchema[];

 /**
 * @description Unauthorized
*/
export type CoreApiListLifts401 = GenericSchema;

 export type CoreApiListLiftsQueryResponse = CoreApiListLifts200;

 export type CoreApiListLiftsQuery = {
    Response: CoreApiListLifts200;
    Errors: CoreApiListLifts401;
};