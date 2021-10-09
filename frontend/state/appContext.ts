import { createContext } from 'react'

import { Context, State } from '../interfaces/type'

export const initialState: State = {
  currentUserId: '',
}

export const AppContext = createContext({} as Context)
