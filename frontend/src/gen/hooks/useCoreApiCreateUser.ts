import client from "@kubb/plugin-client/client";
import type { RequestConfig } from "@kubb/plugin-client/client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { CoreApiCreateUserMutationRequest, CoreApiCreateUserMutationResponse, CoreApiCreateUser400 } from "../types/CoreApiCreateUser.ts";
import { useMutation } from "@tanstack/react-query";

 export const coreApiCreateUserMutationKey = () => [{ "url": "/api/v1/users/" }] as const;

 export type CoreApiCreateUserMutationKey = ReturnType<typeof coreApiCreateUserMutationKey>;

 /**
 * @summary Create User
 * {@link /api/v1/users/}
 */
async function coreApiCreateUser(data: CoreApiCreateUserMutationRequest, config: Partial<RequestConfig<CoreApiCreateUserMutationRequest>> = {}) {
    const res = await client<CoreApiCreateUserMutationResponse, CoreApiCreateUser400, CoreApiCreateUserMutationRequest>({ method: "POST", url: `/api/v1/users/`, data, ...config });
    return res.data;
}

 /**
 * @summary Create User
 * {@link /api/v1/users/}
 */
export function useCoreApiCreateUser(options: {
    mutation?: UseMutationOptions<CoreApiCreateUserMutationResponse, CoreApiCreateUser400, {
        data: CoreApiCreateUserMutationRequest;
    }>;
    client?: Partial<RequestConfig<CoreApiCreateUserMutationRequest>>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? coreApiCreateUserMutationKey();
    return useMutation<CoreApiCreateUserMutationResponse, CoreApiCreateUser400, {
        data: CoreApiCreateUserMutationRequest;
    }>({
        mutationFn: async ({ data }) => {
            return coreApiCreateUser(data, config);
        },
        mutationKey,
        ...mutationOptions
    });
}