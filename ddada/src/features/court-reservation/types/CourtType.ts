export type Reservations = {
  [date: string]: string[]
}

export type CourtType = {
  id: number
  name: string
  address: string
  image: string
  reservations: Reservations
}
