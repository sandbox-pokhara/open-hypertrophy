import client from "../../lib/client.ts";
import type { RequestConfig } from "../../lib/client.ts";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import type { CoreApiListCategoriesQueryResponse, CoreApiListCategories401 } from "../types/CoreApiListCategories.ts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const coreApiListCategoriesSuspenseQueryKey = () => [{ url: "/api/v1/categories/" }] as const;

 export type CoreApiListCategoriesSuspenseQueryKey = ReturnType<typeof coreApiListCategoriesSuspenseQueryKey>;

 /**
 * @summary List Categories
 * {@link /api/v1/categories/}
 */
async function coreApiListCategories(config: Partial<RequestConfig> = {}) {
    const res = await client<CoreApiListCategoriesQueryResponse, CoreApiListCategories401, unknown>({ method: "GET", url: `/api/v1/categories/`, ...config });
    return res.data;
}

 export function coreApiListCategoriesSuspenseQueryOptions(config: Partial<RequestConfig> = {}) {
    const queryKey = coreApiListCategoriesSuspenseQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return coreApiListCategories(config);
        },
    });
}

 /**
 * @summary List Categories
 * {@link /api/v1/categories/}
 */
export function useCoreApiListCategoriesSuspense<TData = CoreApiListCategoriesQueryResponse, TQueryData = CoreApiListCategoriesQueryResponse, TQueryKey extends QueryKey = CoreApiListCategoriesSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<CoreApiListCategoriesQueryResponse, CoreApiListCategories401, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coreApiListCategoriesSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...coreApiListCategoriesSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, CoreApiListCategories401> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}