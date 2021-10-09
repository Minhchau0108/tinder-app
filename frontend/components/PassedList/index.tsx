import React from 'react'
import { User } from '../../interfaces/type'

type Props = {
  users: User[]
}

const PassedList = ({ users }: Props) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <img src={user.picture} />
        </div>
      ))}
    </div>
  )
}

export default PassedList
