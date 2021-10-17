import React, { useContext, useEffect, useState } from 'react'
import { Response, User } from '../../interfaces/type'
import { AppContext } from '../../state/appContext'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import toast from 'react-hot-toast'
import styles from '../../styles/Home.module.css'
import api from '../../services/apiService'
const LIKE = 'like'
const MATCH = 'match'
type Props = {
  users: User[]
  handleNext: () => void
}

const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})
const from = (_i: number) => ({
  x: 0,
  rot: 0,
  scale: 1.5,
  y: -1000,
})
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`

const Deck = ({ users, handleNext }: Props) => {
  const { state } = useContext(AppContext)
  const { currentUserId } = state
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, API] = useSprings(users.length, (i) => ({
    ...to(i),
    from: from(i),
  })) // Create a bunch of springs using the helpers above
  const [action, setAction] = useState({
    type: '',
    id: '',
  })
  useEffect(() => {
    if (action.type === 'like') {
      handleLike(action.id)
    }
    if (action.type === 'pass') {
      handlePass(action.id)
    }
  }, [action.type, action.id])

  const handleLike = async (userId: string) => {
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
  }
  const handlePass = async (userId: string) => {
    try {
      const response: Response = await api.post(`/user/pass`, {
        currentUserId,
        userId,
      })
      toast.error(`Not feeling good. Keep discovering`)
    } catch (error) {
      console.log(error)
    }
  }

  const bind = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    }) => {
      const trigger = vx > 0.1 // If you flick hard enough it should trigger the card to fly out
      if (!active && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      API.start((i) => {
        // We're only interested in changing spring-data for the current spring
        if (index !== i) return
        const isGone = gone.has(index)
        const x = isGone ? (10000 + window.innerWidth) * xDir : active ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
        if (xDir === 1 && x > 200) {
          setAction({
            type: 'like',
            id: users[index].id,
          })
        }
        if (xDir === -1 && x < -200) {
          setAction({
            type: 'pass',
            id: users[index].id,
          })
        }
        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0) // How much the card tilts, flicking it harder makes it rotate faster
        const scale = active ? 1.1 : 1 // Active cards lift up a bit

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        }
      })

      if (!active && gone.size === users.length) {
        handleNext()
        setTimeout(() => {
          gone.clear()
          API.start((i) => to(i))
        }, 600)
      }
    },
  )
  return (
    <div className={styles.wrappertest}>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={styles.deck} key={i} style={{ x, y }}>
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${users[i].picture})`,
            }}
          >
            {`${users[i].firstName}${users[i].lastName} ${users[i].age}`}
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
}

export default Deck
