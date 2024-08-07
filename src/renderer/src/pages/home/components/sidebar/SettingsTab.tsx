import { CheckOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { HStack } from '@renderer/components/Layout'
import { DEFAULT_CONEXTCOUNT, DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from '@renderer/config/constant'
import { useAssistant } from '@renderer/hooks/useAssistant'
import { useSettings } from '@renderer/hooks/useSettings'
import { SettingDivider, SettingRow, SettingRowTitle, SettingSubtitle } from '@renderer/pages/settings/components'
import { useAppDispatch } from '@renderer/store'
import { setMessageFont, setShowInputEstimatedTokens, setShowMessageDivider } from '@renderer/store/settings'
import { Assistant, AssistantSettings } from '@renderer/types'
import { Col, Row, Select, Slider, Switch, Tooltip } from 'antd'
import { debounce } from 'lodash'
import { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface Props {
  assistant: Assistant
}

const SettingsTab: FC<Props> = (props) => {
  const { assistant, updateAssistantSettings, updateAssistant } = useAssistant(props.assistant.id)
  const [temperature, setTemperature] = useState(assistant?.settings?.temperature ?? DEFAULT_TEMPERATURE)
  const [contextCount, setConextCount] = useState(assistant?.settings?.contextCount ?? DEFAULT_CONEXTCOUNT)
  const [enableMaxTokens, setEnableMaxTokens] = useState(assistant?.settings?.enableMaxTokens ?? false)
  const [maxTokens, setMaxTokens] = useState(assistant?.settings?.maxTokens ?? 0)
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const { showMessageDivider, messageFont, showInputEstimatedTokens, sendMessageShortcut, setSendMessageShortcut } =
    useSettings()

  const onUpdateAssistantSettings = useCallback(
    debounce(
      (settings: Partial<AssistantSettings>) => {
        updateAssistantSettings({
          temperature: settings.temperature ?? temperature,
          contextCount: settings.contextCount ?? contextCount,
          enableMaxTokens: settings.enableMaxTokens ?? enableMaxTokens,
          maxTokens: settings.maxTokens ?? maxTokens
        })
      },
      1000,
      { leading: true, trailing: false }
    ),
    [temperature, contextCount, enableMaxTokens, maxTokens]
  )

  const onTemperatureChange = (value) => {
    if (!isNaN(value as number)) {
      setTemperature(value)
      onUpdateAssistantSettings({ temperature: value })
    }
  }

  const onConextCountChange = (value) => {
    if (!isNaN(value as number)) {
      setConextCount(value)
      onUpdateAssistantSettings({ contextCount: value })
    }
  }

  const onMaxTokensChange = (value) => {
    if (!isNaN(value as number)) {
      setMaxTokens(value)
      onUpdateAssistantSettings({ maxTokens: value })
    }
  }

  const onReset = () => {
    setTemperature(DEFAULT_TEMPERATURE)
    setConextCount(DEFAULT_CONEXTCOUNT)
    updateAssistant({
      ...assistant,
      settings: {
        ...assistant.settings,
        temperature: DEFAULT_TEMPERATURE,
        contextCount: DEFAULT_CONEXTCOUNT,
        enableMaxTokens: false,
        maxTokens: DEFAULT_MAX_TOKENS
      }
    })
  }

  useEffect(() => {
    setTemperature(assistant?.settings?.temperature ?? DEFAULT_TEMPERATURE)
    setConextCount(assistant?.settings?.contextCount ?? DEFAULT_CONEXTCOUNT)
    setEnableMaxTokens(assistant?.settings?.enableMaxTokens ?? false)
    setMaxTokens(assistant?.settings?.maxTokens ?? DEFAULT_MAX_TOKENS)
  }, [assistant])

  return (
    <Container>
      <SettingSubtitle>
        {t('settings.messages.model.title')}{' '}
        <Tooltip title={t('chat.settings.reset')}>
          <ReloadOutlined onClick={onReset} style={{ cursor: 'pointer', fontSize: 12, padding: '0 3px' }} />
        </Tooltip>
      </SettingSubtitle>
      <SettingDivider />
      <Row align="middle">
        <Label>{t('chat.settings.temperature')}</Label>
        <Tooltip title={t('chat.settings.temperature.tip')}>
          <QuestionIcon />
        </Tooltip>
      </Row>
      <Row align="middle" gutter={10}>
        <Col span={24}>
          <Slider
            min={0}
            max={1.2}
            onChange={onTemperatureChange}
            value={typeof temperature === 'number' ? temperature : 0}
            step={0.1}
          />
        </Col>
      </Row>
      <Row align="middle">
        <Label>{t('chat.settings.conext_count')}</Label>
        <Tooltip title={t('chat.settings.conext_count.tip')}>
          <QuestionIcon />
        </Tooltip>
      </Row>
      <Row align="middle" gutter={10}>
        <Col span={24}>
          <Slider
            min={0}
            max={20}
            onChange={onConextCountChange}
            value={typeof contextCount === 'number' ? contextCount : 0}
            step={1}
          />
        </Col>
      </Row>
      <Row align="middle" justify="space-between" style={{ marginBottom: 8 }}>
        <HStack alignItems="center">
          <Label>{t('chat.settings.max_tokens')}</Label>
          <Tooltip title={t('chat.settings.max_tokens.tip')}>
            <QuestionIcon />
          </Tooltip>
        </HStack>
        <Switch
          size="small"
          checked={enableMaxTokens}
          onChange={(enabled) => {
            setEnableMaxTokens(enabled)
            onUpdateAssistantSettings({ enableMaxTokens: enabled })
          }}
        />
      </Row>
      {enableMaxTokens && (
        <Row align="middle" gutter={10}>
          <Col span={24}>
            <Slider
              min={0}
              max={32000}
              onChange={onMaxTokensChange}
              value={typeof maxTokens === 'number' ? maxTokens : 0}
              step={100}
            />
          </Col>
        </Row>
      )}
      <SettingSubtitle>{t('settings.messages.title')}</SettingSubtitle>
      <SettingDivider />
      <SettingRow>
        <SettingRowTitleSmall>{t('settings.messages.divider')}</SettingRowTitleSmall>
        <Switch
          size="small"
          checked={showMessageDivider}
          onChange={(checked) => dispatch(setShowMessageDivider(checked))}
        />
      </SettingRow>
      <SettingDivider />
      <SettingRow>
        <SettingRowTitleSmall>{t('settings.messages.use_serif_font')}</SettingRowTitleSmall>
        <Switch
          size="small"
          checked={messageFont === 'serif'}
          onChange={(checked) => dispatch(setMessageFont(checked ? 'serif' : 'system'))}
        />
      </SettingRow>
      <SettingDivider />
      <SettingSubtitle style={{ marginTop: 20 }}>{t('settings.messages.input.title')}</SettingSubtitle>
      <SettingDivider />
      <SettingRow>
        <SettingRowTitleSmall>{t('settings.messages.input.show_estimated_tokens')}</SettingRowTitleSmall>
        <Switch
          size="small"
          checked={showInputEstimatedTokens}
          onChange={(checked) => dispatch(setShowInputEstimatedTokens(checked))}
        />
      </SettingRow>
      <SettingDivider />
      <SettingRow>
        <SettingRowTitleSmall>{t('settings.messages.input.send_shortcuts')}</SettingRowTitleSmall>
      </SettingRow>
      <Select
        value={sendMessageShortcut}
        menuItemSelectedIcon={<CheckOutlined />}
        options={[
          { value: 'Enter', label: `Enter ${t('chat.input.send')}` },
          { value: 'Shift+Enter', label: `Shift + Enter ${t('chat.input.send')}` }
        ]}
        onChange={(value) => setSendMessageShortcut(value)}
        style={{ width: '100%', marginTop: 10 }}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 15px;
`

const Label = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
`

const QuestionIcon = styled(QuestionCircleOutlined)`
  font-size: 12px;
  cursor: pointer;
  color: var(--color-text-3);
`

const SettingRowTitleSmall = styled(SettingRowTitle)`
  font-size: 13px;
`

export default SettingsTab
