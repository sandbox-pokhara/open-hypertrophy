import type { CreateLiftSchema } from "./CreateLiftSchema.ts";

 /**
 * @description OK
*/
export type CoreApiListLifts200 = CreateLiftSchema[];

 export type CoreApiListLiftsQueryResponse = CoreApiListLifts200;

 export type CoreApiListLiftsQuery = {
    Response: CoreApiListLifts200;
    Errors: any;
};