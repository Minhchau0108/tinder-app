import React, { useEffect, useState } from 'react'
import api from '../../services/apiService'
import { formatUser } from '../../services/util'
import { User } from '../../interfaces/type'
import { TinderWrapper } from './index.styled'

type Props = {
  userId?: string
  onLike: (user: User) => void
  onPass: (user: User) => void
}

const TinderCard = ({ userId, onLike, onPass }: Props) => {
  const [user, setUser] = useState({} as User)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (!userId) {
      return
    }
    const getDetailUser = async (userId: string) => {
      setIsLoading(true)
      try {
        const response = await api.get(`/user/${userId}`)
        const user = formatUser(response.data)
        setUser(user)
      } catch (error) {
        setUser({} as User)
      }
      setIsLoading(false)
    }
    getDetailUser(userId)
  }, [userId])
  const handleLike = () => {
    onLike(user)
  }
  const handlePass = () => {
    onPass(user)
  }

  if (!user) return null
  return (
    <TinderWrapper>
      <div className="card">
        {isLoading ? (
          'Loading'
        ) : (
          <>
            <img src={user.picture}></img>
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
