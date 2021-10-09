import React from 'react'

import { StyledTabs, StyledTab } from './index.styled'

type TabContent = {
  name: string
  icon?: JSX.Element | string
}

type Props = {
  tabContent: TabContent[]
  onChange: (n: number) => void
  activeTab: number
}

const Tabs = ({ tabContent, onChange, activeTab }: Props) => {
  return (
    <StyledTabs>
      {tabContent.map((tab, i) => (
        <StyledTab
          data-is-active={activeTab === i}
          key={`tab-${i}`}
          onClick={() => onChange(i)}
        >
          {tab.icon} {tab.name}
        </StyledTab>
      ))}
    </StyledTabs>
  )
}

export default Tabs
