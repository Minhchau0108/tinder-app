import { initialState } from './appContext'
import { State, Action } from '../interfaces/type'
import { actionTypes } from './actionTypes'
const appReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        currentUserId: action.payload,
      }

    default:
      return state
  }
}

export { appReducer }
