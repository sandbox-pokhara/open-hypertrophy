import client from "@kubb/plugin-client/client";
import type { RequestConfig } from "@kubb/plugin-client/client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { CoreApiLoginMutationRequest, CoreApiLoginMutationResponse, CoreApiLogin400 } from "../types/CoreApiLogin.ts";
import { useMutation } from "@tanstack/react-query";

 export const coreApiLoginMutationKey = () => [{ "url": "/api/v1/users/login/" }] as const;

 export type CoreApiLoginMutationKey = ReturnType<typeof coreApiLoginMutationKey>;

 /**
 * @summary Login
 * {@link /api/v1/users/login/}
 */
async function coreApiLogin(data: CoreApiLoginMutationRequest, config: Partial<RequestConfig<CoreApiLoginMutationRequest>> = {}) {
    const res = await client<CoreApiLoginMutationResponse, CoreApiLogin400, CoreApiLoginMutationRequest>({ method: "POST", url: `/api/v1/users/login/`, data, ...config });
    return res.data;
}

 /**
 * @summary Login
 * {@link /api/v1/users/login/}
 */
export function useCoreApiLogin(options: {
    mutation?: UseMutationOptions<CoreApiLoginMutationResponse, CoreApiLogin400, {
        data: CoreApiLoginMutationRequest;
    }>;
    client?: Partial<RequestConfig<CoreApiLoginMutationRequest>>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? coreApiLoginMutationKey();
    return useMutation<CoreApiLoginMutationResponse, CoreApiLogin400, {
        data: CoreApiLoginMutationRequest;
    }>({
        mutationFn: async ({ data }) => {
            return coreApiLogin(data, config);
        },
        mutationKey,
        ...mutationOptions
    });
}