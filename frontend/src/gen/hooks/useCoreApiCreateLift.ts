import client from "../../lib/client.ts";
import type { RequestConfig } from "../../lib/client.ts";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { CoreApiCreateLiftMutationRequest, CoreApiCreateLiftMutationResponse, CoreApiCreateLift401, CoreApiCreateLift404 } from "../types/CoreApiCreateLift.ts";
import { useMutation } from "@tanstack/react-query";

 export const coreApiCreateLiftMutationKey = () => [{ "url": "/api/v1/lifts/" }] as const;

 export type CoreApiCreateLiftMutationKey = ReturnType<typeof coreApiCreateLiftMutationKey>;

 /**
 * @summary Create Lift
 * {@link /api/v1/lifts/}
 */
async function coreApiCreateLift(data: CoreApiCreateLiftMutationRequest, config: Partial<RequestConfig<CoreApiCreateLiftMutationRequest>> = {}) {
    const res = await client<CoreApiCreateLiftMutationResponse, CoreApiCreateLift401 | CoreApiCreateLift404, CoreApiCreateLiftMutationRequest>({ method: "POST", url: `/api/v1/lifts/`, data, ...config });
    return res.data;
}

 /**
 * @summary Create Lift
 * {@link /api/v1/lifts/}
 */
export function useCoreApiCreateLift(options: {
    mutation?: UseMutationOptions<CoreApiCreateLiftMutationResponse, CoreApiCreateLift401 | CoreApiCreateLift404, {
        data: CoreApiCreateLiftMutationRequest;
    }>;
    client?: Partial<RequestConfig<CoreApiCreateLiftMutationRequest>>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? coreApiCreateLiftMutationKey();
    return useMutation<CoreApiCreateLiftMutationResponse, CoreApiCreateLift401 | CoreApiCreateLift404, {
        data: CoreApiCreateLiftMutationRequest;
    }>({
        mutationFn: async ({ data }) => {
            return coreApiCreateLift(data, config);
        },
        mutationKey,
        ...mutationOptions
    });
}