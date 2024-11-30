import client from "@kubb/plugin-client/client";
import type { RequestConfig } from "@kubb/plugin-client/client";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import type { CoreApiRetrieveCurrentUserQueryResponse } from "../types/CoreApiRetrieveCurrentUser.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const coreApiRetrieveCurrentUserQueryKey = () => [{ url: "/api/v1/users/current/" }] as const;

 export type CoreApiRetrieveCurrentUserQueryKey = ReturnType<typeof coreApiRetrieveCurrentUserQueryKey>;

 /**
 * @summary Retrieve Current User
 * {@link /api/v1/users/current/}
 */
async function coreApiRetrieveCurrentUser(config: Partial<RequestConfig> = {}) {
    const res = await client<CoreApiRetrieveCurrentUserQueryResponse, Error, unknown>({ method: "GET", url: `/api/v1/users/current/`, ...config });
    return res.data;
}

 export function coreApiRetrieveCurrentUserQueryOptions(config: Partial<RequestConfig> = {}) {
    const queryKey = coreApiRetrieveCurrentUserQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return coreApiRetrieveCurrentUser(config);
        },
    });
}

 /**
 * @summary Retrieve Current User
 * {@link /api/v1/users/current/}
 */
export function useCoreApiRetrieveCurrentUser<TData = CoreApiRetrieveCurrentUserQueryResponse, TQueryData = CoreApiRetrieveCurrentUserQueryResponse, TQueryKey extends QueryKey = CoreApiRetrieveCurrentUserQueryKey>(options: {
    query?: Partial<QueryObserverOptions<CoreApiRetrieveCurrentUserQueryResponse, Error, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coreApiRetrieveCurrentUserQueryKey();
    const query = useQuery({
        ...coreApiRetrieveCurrentUserQueryOptions(config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}