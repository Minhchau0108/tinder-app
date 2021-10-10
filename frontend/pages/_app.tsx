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
import { formatUser } from '../services/util'

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response: Response = await api.get(`/user/me`)
        const user = formatUser(response.data.data.user)
        const id = user?.id
        localStorage.setItem('user', id)
        dispatch({
          type: actionTypes.UPDATE_USER,
          payload: id,
        })
      } catch (e) {
        console.log(e)
      }
    }
    getCurrentUser()
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Alert />
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
export default MyApp
