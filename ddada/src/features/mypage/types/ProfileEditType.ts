export type ProfileEditType = {
  profilePicture: File | null
  nickname: string
  introduction: string
  deleteImage: boolean
}

export type PasswordChangeType = {
  currentPassword: string
  newPassword: string
}
