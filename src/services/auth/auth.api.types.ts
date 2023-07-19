export type ArgsSignUpType = {
  name?: string
  password: string
  email: string
}
export type UserType = Required<Omit<ArgsSignUpType, 'password'>> & {
  avatar: string
  id: string
  isEmailVerified: boolean
  created: string
  updated: string
}
export type ArgsSignInType = Omit<ArgsSignUpType, 'name'>
export type SignInResponseType = {
  accessToken: string
}
export type ArgRefreshMeType = Required<ArgsSignUpType>
export type ArgRecoverPasswordType = {
  html?: string
  email: string
  subject?: string
}
export type ArgResetPasswordType = {
  password: string
  token: string
}
