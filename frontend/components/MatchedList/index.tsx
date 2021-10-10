import React, { useState, useEffect } from 'react'
import { Response, User } from '../../interfaces/type'
import api from '../../services/apiService'
import { formatUser } from '../../services/util'
import { StyledList, StyledButtons } from './index.styled'

const MatchedList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    const getListMatch = async () => {
      try {
        const response: Response = await api.get(`/user/match`)
        const users = response.data.data.users.map(formatUser)
        setUsers(users)
      } catch (error) {
        setUsers([])
      }
    }
    getListMatch()
  }, [])
  const showPrevSet = () => {
    const newCurrent = (currentIdx - 1 + users.length) % users.length
    setCurrentIdx(newCurrent)
  }
  const showNextSet = () => {
    const newCurrent = (currentIdx + 1 + users.length) % users.length
    setCurrentIdx(newCurrent)
  }
  console.log('match', users)
  return (
    <>
      <StyledList>
        {users.map((user, idx) => (
          <div
            key={user.id}
            className="image"
            data-is-active={currentIdx === idx}
          >
            <img src={user.picture} />
            <div className="title">
              {user.firstName} {user.lastName} {user.age}
            </div>
          </div>
        ))}
      </StyledList>
      <StyledButtons>
        <button className="carousel__button" onClick={showPrevSet}>
          ⬅
        </button>
        <button className="carousel__button" onClick={showNextSet}>
          ⮕
        </button>
      </StyledButtons>
    </>
  )
}

export default MatchedList
