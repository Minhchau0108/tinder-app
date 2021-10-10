import React, { useContext, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppContext } from '../state/appContext'
import Tabs from '../components/Tabs'
import LikedList from '../components/LikedList'
import PassedList from '../components/PassedList'
import { Response, UserApi } from '../interfaces/type'
import api from '../services/apiService'
import TinderCard from '../components/TinderCard'
import MatchedList from '../components/MatchedList'

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
  {
    name: 'Match',
    icon: '💕',
  },
]
const PER_PAGE = 10

const Home: NextPage = () => {
  const { state } = useContext(AppContext)
  const { currentUserId } = state
  const [activeTab, setActiveTab] = useState(0)
  const [userIds, setUserIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const getUserList = async () => {
      try {
        const response: Response = await api.get(
          `/user?page=${page}&limit=${PER_PAGE}`,
        )
        const ids = response.data.data.users.map((item: UserApi) => item._id)
        const total = response.data.data.totalPages
        setTotalPages(total)
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
  const changeTab = (n: number) => {
    setActiveTab(n)
  }
  if (!currentUserId) return null
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          {activeTab === 0 && (
            <TinderCard userId={userIds[0]} onNext={handleNext} />
          )}
          {activeTab === 1 && <LikedList />}
          {activeTab === 2 && <PassedList />}
          {activeTab === 3 && <MatchedList />}
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
