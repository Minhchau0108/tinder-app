import React, { useContext, useEffect, useState } from 'react'
import { Response, User } from '../interfaces/type'
import api from '../services/apiService'
import { formatUser } from '../services/util'
import { AppContext } from '../state/appContext'

import Deck from '../components/Deck'
import Tabs from '../components/Tabs'
import LikedList from '../components/LikedList'
import PassedList from '../components/PassedList'
import MatchedList from '../components/MatchedList'
import styles from '../styles/Home.module.css'

const PER_PAGE = 5
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

const Test = () => {
  const { state } = useContext(AppContext)
  const { currentUserId } = state
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState<User[]>([])
  const [activeTab, setActiveTab] = useState(0)
  useEffect(() => {
    const getUserList = async (currentPage: number) => {
      console.log('currentPage fetchdata', currentPage)
      try {
        const response: Response = await api.get(
          `/user?page=${currentPage}&limit=${PER_PAGE}`,
        )
        const users = response.data.data.users.map(formatUser)
        setUsers(users)
      } catch (error) {
        setUsers([])
      }
    }
    if (currentUserId) {
      getUserList(page)
    }
  }, [currentUserId, page])
  const changeTab = (n: number) => {
    setActiveTab(n)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          {activeTab === 0 && (
            <Deck users={users} handleNext={() => setPage(page + 1)} />
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

export default Test
