import { useQuery } from '@tanstack/react-query'

import {
  fetchUserPk,
  fetchUserProfile,
  loginUserRole,
} from '@/api/user/index.ts'

export function useUserRole() {
  return useQuery({
    queryKey: ['userRole'],
    queryFn: loginUserRole,
    staleTime: Infinity,
    retry: 1,
  })
}

export function useFetchUserPk() {
  return useQuery({
    queryKey: ['userPK'],
    queryFn: fetchUserPk,
    staleTime: Infinity,
    retry: 1,
  })
}

export function useFetchUserProfile() {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    retry: 1,
  })
}
