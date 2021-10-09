import { User, UserApi } from '../interfaces/type'

export const calculateAge = (dob: string) => {
  const date = new Date(dob)
  const diff = Date.now() - date.getTime()
  const age_dt = new Date(diff)
  return Math.abs(age_dt.getUTCFullYear() - 1970)
}
export const formatUser = (user: UserApi) => {
  if (!user) return {} as User
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    picture: user.picture,
    age: user.dateOfBirth ? calculateAge(user.dateOfBirth) : undefined,
  }
}
export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
