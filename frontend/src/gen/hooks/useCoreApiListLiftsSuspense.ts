import client from "@kubb/plugin-client/client";
import type { RequestConfig } from "@kubb/plugin-client/client";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import type { CoreApiListLiftsQueryResponse } from "../types/CoreApiListLifts.ts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const coreApiListLiftsSuspenseQueryKey = () => [{ url: "/api/v1/lifts/" }] as const;

 export type CoreApiListLiftsSuspenseQueryKey = ReturnType<typeof coreApiListLiftsSuspenseQueryKey>;

 /**
 * @summary List Lifts
 * {@link /api/v1/lifts/}
 */
async function coreApiListLifts(config: Partial<RequestConfig> = {}) {
    const res = await client<CoreApiListLiftsQueryResponse, Error, unknown>({ method: "GET", url: `/api/v1/lifts/`, ...config });
    return res.data;
}

 export function coreApiListLiftsSuspenseQueryOptions(config: Partial<RequestConfig> = {}) {
    const queryKey = coreApiListLiftsSuspenseQueryKey();
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
export function useCoreApiListLiftsSuspense<TData = CoreApiListLiftsQueryResponse, TQueryData = CoreApiListLiftsQueryResponse, TQueryKey extends QueryKey = CoreApiListLiftsSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<CoreApiListLiftsQueryResponse, Error, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coreApiListLiftsSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...coreApiListLiftsSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}