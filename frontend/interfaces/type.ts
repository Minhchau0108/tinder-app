export type User = {
  id: string
  firstName: string
  lastName: string
  picture: string
  age?: number
}
export type UserApi = {
  id: string
  firstName: string
  lastName: string
  picture: string
  dateOfBirth?: string
}
export type Response = {
  data: {
    [key: string]: any
  }
}
export type State = {
  currentUserId: string
}
export type Context = {
  state: State
  dispatch: (action: Action) => void
}
export type Action = {
  type: string
  payload?: any
}
