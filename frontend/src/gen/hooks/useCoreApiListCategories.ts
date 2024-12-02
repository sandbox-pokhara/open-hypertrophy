import client from "../../lib/client.ts";
import type { RequestConfig } from "../../lib/client.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import type { CoreApiListCategoriesQueryResponse, CoreApiListCategories401 } from "../types/CoreApiListCategories.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const coreApiListCategoriesQueryKey = () => [{ url: "/api/v1/categories/" }] as const;

 export type CoreApiListCategoriesQueryKey = ReturnType<typeof coreApiListCategoriesQueryKey>;

 /**
 * @summary List Categories
 * {@link /api/v1/categories/}
 */
async function coreApiListCategories(config: Partial<RequestConfig> = {}) {
    const res = await client<CoreApiListCategoriesQueryResponse, CoreApiListCategories401, unknown>({ method: "GET", url: `/api/v1/categories/`, ...config });
    return res.data;
}

 export function coreApiListCategoriesQueryOptions(config: Partial<RequestConfig> = {}) {
    const queryKey = coreApiListCategoriesQueryKey();
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
export function useCoreApiListCategories<TData = CoreApiListCategoriesQueryResponse, TQueryData = CoreApiListCategoriesQueryResponse, TQueryKey extends QueryKey = CoreApiListCategoriesQueryKey>(options: {
    query?: Partial<QueryObserverOptions<CoreApiListCategoriesQueryResponse, CoreApiListCategories401, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coreApiListCategoriesQueryKey();
    const query = useQuery({
        ...coreApiListCategoriesQueryOptions(config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CoreApiListCategories401> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}