import client from "@kubb/plugin-client/client";
import type { RequestConfig } from "@kubb/plugin-client/client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { CoreApiChangePasswordMutationRequest, CoreApiChangePasswordMutationResponse, CoreApiChangePassword400 } from "../types/CoreApiChangePassword.ts";
import { useMutation } from "@tanstack/react-query";

 export const coreApiChangePasswordMutationKey = () => [{ "url": "/api/v1/users/change-password/" }] as const;

 export type CoreApiChangePasswordMutationKey = ReturnType<typeof coreApiChangePasswordMutationKey>;

 /**
 * @summary Change Password
 * {@link /api/v1/users/change-password/}
 */
async function coreApiChangePassword(data: CoreApiChangePasswordMutationRequest, config: Partial<RequestConfig<CoreApiChangePasswordMutationRequest>> = {}) {
    const res = await client<CoreApiChangePasswordMutationResponse, CoreApiChangePassword400, CoreApiChangePasswordMutationRequest>({ method: "POST", url: `/api/v1/users/change-password/`, data, ...config });
    return res.data;
}

 /**
 * @summary Change Password
 * {@link /api/v1/users/change-password/}
 */
export function useCoreApiChangePassword(options: {
    mutation?: UseMutationOptions<CoreApiChangePasswordMutationResponse, CoreApiChangePassword400, {
        data: CoreApiChangePasswordMutationRequest;
    }>;
    client?: Partial<RequestConfig<CoreApiChangePasswordMutationRequest>>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? coreApiChangePasswordMutationKey();
    return useMutation<CoreApiChangePasswordMutationResponse, CoreApiChangePassword400, {
        data: CoreApiChangePasswordMutationRequest;
    }>({
        mutationFn: async ({ data }) => {
            return coreApiChangePassword(data, config);
        },
        mutationKey,
        ...mutationOptions
    });
}