import client from "../../lib/client.ts";
import type { RequestConfig } from "../../lib/client.ts";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import type { CoreApiRetrieveCurrentUserQueryResponse, CoreApiRetrieveCurrentUser401 } from "../types/CoreApiRetrieveCurrentUser.ts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const coreApiRetrieveCurrentUserSuspenseQueryKey = () => [{ url: "/api/v1/users/current/" }] as const;

 export type CoreApiRetrieveCurrentUserSuspenseQueryKey = ReturnType<typeof coreApiRetrieveCurrentUserSuspenseQueryKey>;

 /**
 * @summary Retrieve Current User
 * {@link /api/v1/users/current/}
 */
async function coreApiRetrieveCurrentUser(config: Partial<RequestConfig> = {}) {
    const res = await client<CoreApiRetrieveCurrentUserQueryResponse, CoreApiRetrieveCurrentUser401, unknown>({ method: "GET", url: `/api/v1/users/current/`, ...config });
    return res.data;
}

 export function coreApiRetrieveCurrentUserSuspenseQueryOptions(config: Partial<RequestConfig> = {}) {
    const queryKey = coreApiRetrieveCurrentUserSuspenseQueryKey();
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
export function useCoreApiRetrieveCurrentUserSuspense<TData = CoreApiRetrieveCurrentUserQueryResponse, TQueryData = CoreApiRetrieveCurrentUserQueryResponse, TQueryKey extends QueryKey = CoreApiRetrieveCurrentUserSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<CoreApiRetrieveCurrentUserQueryResponse, CoreApiRetrieveCurrentUser401, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coreApiRetrieveCurrentUserSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...coreApiRetrieveCurrentUserSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, CoreApiRetrieveCurrentUser401> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}