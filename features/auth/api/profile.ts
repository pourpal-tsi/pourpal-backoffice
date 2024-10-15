import { queryOptions, useQuery } from "@tanstack/react-query";
import { type QueryConfig } from "@/types/query";
import api from "@/config/api";

export interface ProfileResponse {
  email: string;
  role: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getProfile() {
  return api.get<ProfileResponse>("/auth/profile");
}

export const getProfileQueryOptions = () => {
  return queryOptions({
    queryKey: ["auth"],
    queryFn: () => getProfile(),
  });
};

export interface useProfileOptions {
  queryConfig?: QueryConfig<typeof getProfileQueryOptions>;
}

export function useProfile({ queryConfig }: useProfileOptions = {}) {
  return useQuery({
    ...getProfileQueryOptions(),
    ...queryConfig,
  });
}
