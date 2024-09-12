import { useQuery } from '@tanstack/react-query'

import { loginUserRole } from '@/api/user/index.ts'

export function useUserRole() {
  return useQuery({
    queryKey: ['userRole'],
    queryFn: loginUserRole,
    staleTime: Infinity,
    retry: 1,
  })
}