import client from "@kubb/plugin-client/client";
import type { RequestConfig } from "@kubb/plugin-client/client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { CoreApiCreateExerciseMutationRequest, CoreApiCreateExerciseMutationResponse } from "../types/CoreApiCreateExercise.ts";
import { useMutation } from "@tanstack/react-query";

 export const coreApiCreateExerciseMutationKey = () => [{ "url": "/api/v1/exercises/" }] as const;

 export type CoreApiCreateExerciseMutationKey = ReturnType<typeof coreApiCreateExerciseMutationKey>;

 /**
 * @summary Create Exercise
 * {@link /api/v1/exercises/}
 */
async function coreApiCreateExercise(data: CoreApiCreateExerciseMutationRequest, config: Partial<RequestConfig<CoreApiCreateExerciseMutationRequest>> = {}) {
    const res = await client<CoreApiCreateExerciseMutationResponse, Error, CoreApiCreateExerciseMutationRequest>({ method: "POST", url: `/api/v1/exercises/`, data, ...config });
    return res.data;
}

 /**
 * @summary Create Exercise
 * {@link /api/v1/exercises/}
 */
export function useCoreApiCreateExercise(options: {
    mutation?: UseMutationOptions<CoreApiCreateExerciseMutationResponse, Error, {
        data: CoreApiCreateExerciseMutationRequest;
    }>;
    client?: Partial<RequestConfig<CoreApiCreateExerciseMutationRequest>>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? coreApiCreateExerciseMutationKey();
    return useMutation<CoreApiCreateExerciseMutationResponse, Error, {
        data: CoreApiCreateExerciseMutationRequest;
    }>({
        mutationFn: async ({ data }) => {
            return coreApiCreateExercise(data, config);
        },
        mutationKey,
        ...mutationOptions
    });
}