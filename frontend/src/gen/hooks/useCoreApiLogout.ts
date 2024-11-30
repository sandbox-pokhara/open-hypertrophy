import client from "@kubb/plugin-client/client";
import type { RequestConfig } from "@kubb/plugin-client/client";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { CoreApiLogoutMutationResponse } from "../types/CoreApiLogout.ts";
import { useMutation } from "@tanstack/react-query";

 export const coreApiLogoutMutationKey = () => [{ "url": "/api/v1/users/logout/" }] as const;

 export type CoreApiLogoutMutationKey = ReturnType<typeof coreApiLogoutMutationKey>;

 /**
 * @summary Logout
 * {@link /api/v1/users/logout/}
 */
async function coreApiLogout(config: Partial<RequestConfig> = {}) {
    const res = await client<CoreApiLogoutMutationResponse, Error, unknown>({ method: "POST", url: `/api/v1/users/logout/`, ...config });
    return res.data;
}

 /**
 * @summary Logout
 * {@link /api/v1/users/logout/}
 */
export function useCoreApiLogout(options: {
    mutation?: UseMutationOptions<CoreApiLogoutMutationResponse, Error>;
    client?: Partial<RequestConfig>;
} = {}) {
    const { mutation: mutationOptions, client: config = {} } = options ?? {};
    const mutationKey = mutationOptions?.mutationKey ?? coreApiLogoutMutationKey();
    return useMutation<CoreApiLogoutMutationResponse, Error>({
        mutationFn: async () => {
            return coreApiLogout(config);
        },
        mutationKey,
        ...mutationOptions
    });
}