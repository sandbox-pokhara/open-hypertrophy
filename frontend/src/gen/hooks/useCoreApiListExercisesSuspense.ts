import client from "@kubb/plugin-client/client";
import type { RequestConfig } from "@kubb/plugin-client/client";
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import type { CoreApiListExercisesQueryResponse } from "../types/CoreApiListExercises.ts";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

 export const coreApiListExercisesSuspenseQueryKey = () => [{ url: "/api/v1/exercises/" }] as const;

 export type CoreApiListExercisesSuspenseQueryKey = ReturnType<typeof coreApiListExercisesSuspenseQueryKey>;

 /**
 * @summary List Exercises
 * {@link /api/v1/exercises/}
 */
async function coreApiListExercises(config: Partial<RequestConfig> = {}) {
    const res = await client<CoreApiListExercisesQueryResponse, Error, unknown>({ method: "GET", url: `/api/v1/exercises/`, ...config });
    return res.data;
}

 export function coreApiListExercisesSuspenseQueryOptions(config: Partial<RequestConfig> = {}) {
    const queryKey = coreApiListExercisesSuspenseQueryKey();
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
export function useCoreApiListExercisesSuspense<TData = CoreApiListExercisesQueryResponse, TQueryData = CoreApiListExercisesQueryResponse, TQueryKey extends QueryKey = CoreApiListExercisesSuspenseQueryKey>(options: {
    query?: Partial<UseSuspenseQueryOptions<CoreApiListExercisesQueryResponse, Error, TData, TQueryKey>>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { query: queryOptions, client: config = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coreApiListExercisesSuspenseQueryKey();
    const query = useSuspenseQuery({
        ...coreApiListExercisesSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions,
        queryKey,
        ...queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">
    }) as UseSuspenseQueryResult<TData, Error> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}