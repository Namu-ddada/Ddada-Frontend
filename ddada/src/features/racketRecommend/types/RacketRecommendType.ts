export enum ProgressStepType {
  main = 'main',
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3',
  step4 = 'step4',
  step5 = 'step5',
  loading = 'loading',
}

export type RacketRecommendBranchProps = {
  progressStep?: ProgressStepType
  changeProgress: (arg: ProgressStepType) => void
  // changeMoveNext: (arg: boolean) => void
  changeStep: (arg: number) => void
}

export type RacketDetailType = {
  id: number
  name: string
  weight: string
  material: string
  image: string
  manufacturer: string
}

export type RacketShortType = {
  id: number
  name: string
  manufacturer: string
  image: string
}

export type RacketRecommendPaylaod = {
  racket: number[]
  price: number | null
  balance: string
  weight: string
  shaft: string
}

export type RacketRecommendResult = {
  racket: RacketRecommendDetail[]
  my_type: {
    nickname: string
    explanation: string
  }
}
export type RacketRecommendDetail = {
  name: string
  price: number
  balance: string
  weight: string
  shaft: string
  material: string
  color: string
  manufacturer: string
  image: string
  type: string
  racket_id: number
}
