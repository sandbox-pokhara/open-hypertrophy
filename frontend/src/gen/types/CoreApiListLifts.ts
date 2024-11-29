import type { LiftSchema } from "./LiftSchema.ts";

 /**
 * @description OK
*/
export type CoreApiListLifts200 = LiftSchema[];

 export type CoreApiListLiftsQueryResponse = CoreApiListLifts200;

 export type CoreApiListLiftsQuery = {
    Response: CoreApiListLifts200;
    Errors: any;
};