export interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  nickname: string
  phoneNumber: string
  authNumber: string
  birthYear: string
  birthMonth?: string
  birthDay?: string
  profilePicture?: File | null
  gender: string
  introduction?: string
}

export interface SignUpSubmitType {
  email: string
  password: string
  nickname: string
  phoneNumber: string
  birthYear: string
  profileImage?: File | null
  gender: string
  description?: string
}

export interface SignUpResponseType {
  code: string
  message: string
  result: {
    accessToken: string
    refreshToken: string
  }
}

export enum SignUpStepType {
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3',
  step4 = 'step4',
}
