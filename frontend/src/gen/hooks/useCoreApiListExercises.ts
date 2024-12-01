import client from "../../lib/client.ts";
import type { RequestConfig } from "../../lib/client.ts";
import type { QueryKey, QueryObserverOptions, UseQueryResult } from "@tanstack/react-query";
import type { CoreApiListExercisesQueryResponse, CoreApiListExercises401 } from "../types/CoreApiListExercises.ts";
import { queryOptions, useQuery } from "@tanstack/react-query";

 export const coreApiListExercisesQueryKey = () => [{ url: "/api/v1/exercises/" }] as const;

 export type CoreApiListExercisesQueryKey = ReturnType<typeof coreApiListExercisesQueryKey>;

 /**
 * @summary List Exercises
 * {@link /api/v1/exercises/}
 */
async function coreApiListExercises(config: Partial<RequestConfig> = {}) {
    const res = await client<CoreApiListExercisesQueryResponse, CoreApiListExercises401, unknown>({ method: "GET", url: `/api/v1/exercises/`, ...config });
    return res.data;
}

 export function coreApiListExercisesQueryOptions(config: Partial<RequestConfig> = {}) {
    const queryKey = coreApiListExercisesQueryKey();
    return queryOptions({
        queryKey,
        queryFn: async ({ signal }) => {
            config.signal = signal;
            return coreApiListExercises(config);
        },
    });
}

 /**
 * @summary List Exercises
 * {@link /api/v1/exercises/}
 */
export function useCoreApiListExercises<TData = CoreApiListExercisesQueryResponse, TQueryData = CoreApiListExercisesQueryResponse, TQueryKey extends QueryKey = CoreApiListExercisesQueryKey>(options: {
    query?: Partial<QueryObserverOptions<CoreApiListExercisesQueryResponse, CoreApiListExercises401, TData, TQueryData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coreApiListExercisesQueryKey();
    const query = useQuery({
        ...coreApiListExercisesQueryOptions(config) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CoreApiListExercises401> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}