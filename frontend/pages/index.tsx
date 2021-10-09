import React, { useContext, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppContext } from '../state/appContext'
import Tabs from '../components/Tabs'
import LikedList from '../components/LikedList'
import PassedList from '../components/PassedList'
import { Response, User, UserApi } from '../interfaces/type'
import api from '../services/apiService'
import TinderCard from '../components/TinderCard'
import toast from 'react-hot-toast'

const TABS = [
  {
    name: 'Discover',
    icon: '🔥',
  },
  {
    name: 'Like',
    icon: '💚',
  },
  {
    name: 'Pass',
    icon: '❌',
  },
]
const PER_PAGE = 10

const Home: NextPage = () => {
  const { state } = useContext(AppContext)
  const { currentUserId } = state
  const [activeTab, setActiveTab] = useState(0)
  const [userIds, setUserIds] = useState<string[]>([])
  const [likes, setLikes] = useState<User[]>([])
  const [passes, setPasses] = useState<User[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const getUserList = async () => {
      try {
        const response: Response = await api.get(
          `/user?page=${page}&limit=${PER_PAGE}`,
        )
        const ids = response.data.data
          .map((item: UserApi) => item.id)
          .filter((id: string) => id !== currentUserId)
        const total = response.data.total
        setTotalPages(Math.ceil(total / PER_PAGE))
        setUserIds(ids)
      } catch (error) {
        setUserIds([])
      }
    }
    if (currentUserId) {
      getUserList()
    }
  }, [page, currentUserId])

  const handleNext = () => {
    const [_, ...rest] = userIds
    setUserIds(rest)
    if (rest.length === 0 && page < totalPages - 1) {
      setPage(page + 1)
    }
  }
  const onPass = (user: User) => {
    if (passes.findIndex((item: User) => item.id === user.id) === -1) {
      toast.error('Pass user')
      setPasses([...passes, user])
      setLikes(likes.filter((item: User) => item.id !== user.id))
    }
    handleNext()
  }
  const onLike = (user: User) => {
    if (likes.findIndex((item: User) => item.id === user.id) === -1) {
      toast.success('Like user')
      setLikes([...likes, user])
      setPasses(passes.filter((item: User) => item.id !== user.id))
    }
    handleNext()
  }
  const changeTab = (n: number) => {
    setActiveTab(n)
  }
  if (!currentUserId) return null
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          {activeTab === 0 && (
            <TinderCard userId={userIds[0]} onLike={onLike} onPass={onPass} />
          )}
          {activeTab === 1 && <LikedList users={likes} />}
          {activeTab === 2 && <PassedList users={passes} />}
        </div>

        <Tabs
          tabContent={TABS}
          onChange={(n) => changeTab(n)}
          activeTab={activeTab}
        />
      </div>
    </div>
  )
}

export default Home
