import { BarsOutlined, SettingOutlined } from '@ant-design/icons'
import { useShowRightSidebar } from '@renderer/hooks/useStore'
import { EVENT_NAMES, EventEmitter } from '@renderer/services/event'
import { Assistant, Topic } from '@renderer/types'
import { Segmented } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import SettingsTab from './SettingsTab'
import TopicsTab from './TopicsTab'

interface Props {
  assistant: Assistant
  activeTopic: Topic
  setActiveTopic: (topic: Topic) => void
}

const RightSidebar: FC<Props> = (props) => {
  const [tab, setTab] = useState<'topic' | 'settings'>('topic')
  const { rightSidebarShown, showRightSidebar, hideRightSidebar } = useShowRightSidebar()
  const { t } = useTranslation()
  const isTopicTab = tab === 'topic'
  const isSettingsTab = tab === 'settings'

  useEffect(() => {
    const unsubscribes = [
      EventEmitter.on(EVENT_NAMES.SHOW_TOPIC_SIDEBAR, (): any => {
        if (rightSidebarShown && isTopicTab) {
          return hideRightSidebar()
        }
        if (rightSidebarShown) {
          return setTab('topic')
        }
        showRightSidebar()
        setTab('topic')
      }),
      EventEmitter.on(EVENT_NAMES.SHOW_CHAT_SETTINGS, (): any => {
        if (rightSidebarShown && isSettingsTab) {
          return hideRightSidebar()
        }
        if (rightSidebarShown) {
          return setTab('settings')
        }
        showRightSidebar()
        setTab('settings')
      }),
      EventEmitter.on(EVENT_NAMES.SWITCH_TOPIC_SIDEBAR, () => setTab('topic'))
    ]
    return () => unsubscribes.forEach((unsub) => unsub())
  }, [hideRightSidebar, isSettingsTab, isTopicTab, rightSidebarShown, showRightSidebar])

  if (!rightSidebarShown) {
    return null
  }

  return (
    <Container>
      <Segmented
        value={tab}
        style={{ borderRadius: 0, padding: '10px', gap: 5, borderBottom: '0.5px solid var(--color-border)' }}
        options={[
          { label: t('common.topics'), value: 'topic', icon: <BarsOutlined /> },
          { label: t('settings.title'), value: 'settings', icon: <SettingOutlined /> }
        ]}
        block
        onChange={(value) => setTab(value as 'topic' | 'settings')}
      />
      <TabContent>
        {tab === 'topic' && <TopicsTab {...props} />}
        {tab === 'settings' && <SettingsTab assistant={props.assistant} />}
      </TabContent>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--topic-list-width);
  height: calc(100vh - var(--navbar-height));
  border-left: 0.5px solid var(--color-border);
  .collapsed {
    width: 0;
    border-left: none;
  }
`

const TabContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
`

export default RightSidebar
