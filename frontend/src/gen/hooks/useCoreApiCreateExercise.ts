import client from "../../lib/client.ts";
import type { RequestConfig } from "../../lib/client.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { CoreApiCreateExerciseMutationRequest, CoreApiCreateExerciseMutationResponse, CoreApiCreateExercise401 } from "../types/CoreApiCreateExercise.ts";
import { useMutation } from "@tanstack/react-query";

 export const coreApiCreateExerciseMutationKey = () => [{ "url": "/api/v1/exercises/" }] as const;

 export type CoreApiCreateExerciseMutationKey = ReturnType<typeof coreApiCreateExerciseMutationKey>;

 /**
 * @summary Create Exercise
 * {@link /api/v1/exercises/}
 */
async function coreApiCreateExercise(data: CoreApiCreateExerciseMutationRequest, config: Partial<RequestConfig<CoreApiCreateExerciseMutationRequest>> = {}) {
    const res = await client<CoreApiCreateExerciseMutationResponse, CoreApiCreateExercise401, CoreApiCreateExerciseMutationRequest>({ method: "POST", url: `/api/v1/exercises/`, data, ...config });
    return res.data;
}

 /**
 * @summary Create Exercise
 * {@link /api/v1/exercises/}
 */
export function useCoreApiCreateExercise(options: {
    mutation?: UseMutationOptions<CoreApiCreateExerciseMutationResponse, CoreApiCreateExercise401, {
        data: CoreApiCreateExerciseMutationRequest;
    }>;
    client?: Partial<RequestConfig<CoreApiCreateExerciseMutationRequest>>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? coreApiCreateExerciseMutationKey();
    return useMutation<CoreApiCreateExerciseMutationResponse, CoreApiCreateExercise401, {
        data: CoreApiCreateExerciseMutationRequest;
    }>({
        mutationFn: async ({ data }) => {
            return coreApiCreateExercise(data, config);
        },
        mutationKey,
        ...mutationOptions
    });
}