import type { CategorySchema } from "./CategorySchema.ts";
import type { GenericSchema } from "./GenericSchema.ts";

 /**
 * @description OK
*/
export type CoreApiListCategories200 = CategorySchema[];

 /**
 * @description Unauthorized
*/
export type CoreApiListCategories401 = GenericSchema;

 export type CoreApiListCategoriesQueryResponse = CoreApiListCategories200;

 export type CoreApiListCategoriesQuery = {
    Response: CoreApiListCategories200;
    Errors: CoreApiListCategories401;
};