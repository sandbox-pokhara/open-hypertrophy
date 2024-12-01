import client from "../../lib/client.ts";
import type { RequestConfig } from "../../lib/client.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import type { CoreApiListLiftsQueryResponse, CoreApiListLifts401 } from "../types/CoreApiListLifts.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const coreApiListLiftsQueryKey = () => [{ url: "/api/v1/lifts/" }] as const;

 export type CoreApiListLiftsQueryKey = ReturnType<typeof coreApiListLiftsQueryKey>;

 /**
 * @summary List Lifts
 * {@link /api/v1/lifts/}
 */
async function coreApiListLifts(config: Partial<RequestConfig> = {}) {
    const res = await client<CoreApiListLiftsQueryResponse, CoreApiListLifts401, unknown>({ method: "GET", url: `/api/v1/lifts/`, ...config });
    return res.data;
}

 export function coreApiListLiftsQueryOptions(config: Partial<RequestConfig> = {}) {
    const queryKey = coreApiListLiftsQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return coreApiListLifts(config);
        },
    });
}

 /**
 * @summary List Lifts
 * {@link /api/v1/lifts/}
 */
export function useCoreApiListLifts<TData = CoreApiListLiftsQueryResponse, TQueryData = CoreApiListLiftsQueryResponse, TQueryKey extends QueryKey = CoreApiListLiftsQueryKey>(options: {
    query?: Partial<QueryObserverOptions<CoreApiListLiftsQueryResponse, CoreApiListLifts401, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coreApiListLiftsQueryKey();
    const query = useQuery({
        ...coreApiListLiftsQueryOptions(config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CoreApiListLifts401> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}