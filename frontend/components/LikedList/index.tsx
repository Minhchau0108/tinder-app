import React, { useState, useEffect } from 'react'
import { Response, User } from '../../interfaces/type'
import api from '../../services/apiService'
import { formatUser } from '../../services/util'
import { StyledList } from './index.styled'

const LikedList = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const getListLike = async () => {
      try {
        const response: Response = await api.get(`/user/like`)
        const users = response.data.data.users.map(formatUser)
        setUsers(users)
      } catch (error) {
        setUsers([])
      }
    }

    getListLike()
  }, [])
  return (
    <StyledList>
      {users.map((user) => (
        <div key={user.id} className="image">
          <img src={user.picture} />
          <div className="title">
            {user.firstName} {user.lastName} {user.age}
          </div>
        </div>
      ))}
    </StyledList>
  )
}

export default LikedList
