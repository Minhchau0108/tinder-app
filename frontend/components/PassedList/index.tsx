import React, { useState, useEffect } from 'react'
import { Response, User } from '../../interfaces/type'
import api from '../../services/apiService'
import { formatUser } from '../../services/util'
import { StyledCard, StyledList } from './index.styled'

const PassedList = () => {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    const getListPass = async () => {
      try {
        const response: Response = await api.get(`/user/pass`)
        const users = response.data.data.users.map(formatUser)
        setUsers(users)
      } catch (error) {
        setUsers([])
      }
    }

    getListPass()
  }, [])
  return (
    <StyledList>
      {users.map((user) => (
        <StyledCard key={user.id}>
          <div className="left">
            <img src={user.picture} />
          </div>
          <div className="right">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>age {user.age} </div>
          </div>
        </StyledCard>
      ))}
    </StyledList>
  )
}

export default PassedList
