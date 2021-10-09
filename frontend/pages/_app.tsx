import React, { useReducer, useEffect } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContext } from '../state/appContext'
import { initialState } from '../state/appContext'
import { appReducer } from '../state/appReducer'
import api from '../services/apiService'
import { Response } from '../interfaces/type'
import { actionTypes } from '../state/actionTypes'
import Alert from '../components/Alert'
import { getRandom } from '../services/util'

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('user')
      if (userId) {
        dispatch({
          type: actionTypes.UPDATE_USER,
          payload: userId,
        })
        return
      }
      const getCurrentUser = async () => {
        const response: Response = await api.get(`/user?page=0&limit=10`)
        const users = response.data.data
        const randomIndex = getRandom(0, users.length - 1)
        const id = users[randomIndex].id
        localStorage.setItem('user', id)
        dispatch({
          type: actionTypes.UPDATE_USER,
          payload: id,
        })
      }
      getCurrentUser()
    }
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Alert />
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
export default MyApp
