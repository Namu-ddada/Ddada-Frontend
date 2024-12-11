import { useQueryClient } from '@tanstack/react-query'

export default function useInvalidateMatchReservations() {
  const queryClient = useQueryClient()

  const invalidateMatchReservationList = () => {
    queryClient.invalidateQueries({ queryKey: ['myMatchList'] })
    queryClient.removeQueries({ queryKey: ['matchList'] })
  }

  const invalidateReservationList = () => {
    queryClient.invalidateQueries({ queryKey: ['myMatchList'] })
    queryClient.removeQueries({ queryKey: ['matchList'] })
    queryClient.removeQueries({ queryKey: ['courtList'] })
  }

  return { invalidateMatchReservationList, invalidateReservationList }
}
