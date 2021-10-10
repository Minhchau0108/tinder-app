import React, { useContext, useEffect, useState } from 'react'
import api from '../../services/apiService'
import { formatUser } from '../../services/util'
import { Response, User } from '../../interfaces/type'
import { TinderWrapper } from './index.styled'
import { AppContext } from '../../state/appContext'
import toast from 'react-hot-toast'

type Props = {
  userId?: string
  onNext: () => void
}
const LIKE = 'like'
const MATCH = 'match'

const TinderCard = ({ userId, onNext }: Props) => {
  const { state } = useContext(AppContext)
  const { currentUserId } = state
  const [user, setUser] = useState({} as User)
  const [isLoading, setIsLoading] = useState(false)
  const [imgClass, setImgClass] = useState('')
  useEffect(() => {
    if (!userId) {
      return
    }
    const getDetailUser = async (userId: string) => {
      setIsLoading(true)
      try {
        const response: Response = await api.get(`/user/${userId}`)
        const user = formatUser(response.data.data.user)
        setUser(user)
      } catch (error) {
        setUser({} as User)
      }
      setIsLoading(false)
    }
    getDetailUser(userId)
  }, [userId])
  const handleLike = async () => {
    try {
      const response: Response = await api.post(`/user/like`, {
        currentUserId,
        userId,
      })
      const result = response.data.data.result
      if (result === LIKE) {
        toast.success(`Like user successfully !`)
      }
      if (result === MATCH) {
        toast.success(`New matching !!! `)
      }
    } catch (error) {
      console.log(error)
    }
    onNext()
  }
  const handlePass = async () => {
    try {
      const response: Response = await api.post(`/user/pass`, {
        currentUserId,
        userId,
      })
      toast.error(`Not feeling good. Keep discovering`)
    } catch (error) {
      console.log(error)
    }
    onNext()
  }
  useEffect(() => {
    setImgClass('img-appear')
    setTimeout(() => {
      setImgClass('')
    }, 2000)
  }, [userId])

  if (!user) return null
  return (
    <TinderWrapper>
      <div className="card">
        {isLoading ? (
          'Loading'
        ) : (
          <>
            <img src={user.picture} className={imgClass}></img>
            <div className="detail">
              {user.firstName} {user.lastName} {user.age}
            </div>
          </>
        )}
      </div>

      <div className="buttons">
        <button onClick={handlePass}>❌</button>
        <button onClick={handleLike}>💚</button>
      </div>
    </TinderWrapper>
  )
}

export default TinderCard
