import React from 'react'
import { User } from '../../interfaces/type'
import { StyledList } from './index.styled'

type Props = {
  users: User[]
}

const LikedList = ({ users }: Props) => {
  return (
    <StyledList>
      {users.map((user) => (
        <div key={user.id}>
          <img src={user.picture} />
        </div>
      ))}
    </StyledList>
  )
}

export default LikedList
