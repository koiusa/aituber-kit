import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import settingsStore from '@/features/stores/settings'
import { Link } from '../link'
import {
  VoiceEngineSelector,
  KoeiromapSettings,
  VoicevoxSettings,
  GoogleTTSSettings,
  StyleBertVITS2Settings,
  AivisSpeechSettings,
  AivisCloudApiSettings,
  GsviTtsSettings,
  ElevenLabsSettings,
  CartesiaSettings,
  OpenAITTSSettings,
  AzureTTSSettings,
  TestVoiceSection,
} from './voice/index'

const Voice = () => {
  const koeiromapKey = settingsStore((s) => s.koeiromapKey)
  const elevenlabsApiKey = settingsStore((s) => s.elevenlabsApiKey)
  const cartesiaApiKey = settingsStore((s) => s.cartesiaApiKey)

  const realtimeAPIMode = settingsStore((s) => s.realtimeAPIMode)
  const audioMode = settingsStore((s) => s.audioMode)

  const selectVoice = settingsStore((s) => s.selectVoice)
  const koeiroParam = settingsStore((s) => s.koeiroParam)
  const googleTtsType = settingsStore((s) => s.googleTtsType)
  const voicevoxSpeaker = settingsStore((s) => s.voicevoxSpeaker)
  const voicevoxSpeed = settingsStore((s) => s.voicevoxSpeed)
  const voicevoxPitch = settingsStore((s) => s.voicevoxPitch)
  const voicevoxIntonation = settingsStore((s) => s.voicevoxIntonation)
  const voicevoxServerUrl = settingsStore((s) => s.voicevoxServerUrl)
  const voicepeakSpeaker = settingsStore((s) => s.voicepeakSpeaker)
  const voicepeakSpeed = settingsStore((s) => s.voicepeakSpeed)
  const voicepeakPitch = settingsStore((s) => s.voicepeakPitch)
  const voicepeakIntonationScale = settingsStore(
    (s) => s.voicepeakIntonationScale
  )
  const voicepeakServerUrl = settingsStore((s) => s.voicepeakServerUrl)
  const voicepeakTempoDynamics = settingsStore((s) => s.voicepeakTempoDynamics)
  const voicepeakPrePhonemeLength = settingsStore(
    (s) => s.voicepeakPrePhonemeLength
  )
  const voicepeakPostPhonemeLength = settingsStore(
    (s) => s.voicepeakPostPhonemeLength
  )
  const aivisSpeechSpeaker = settingsStore((s) => s.aivisSpeechSpeaker)
  const aivisSpeechSpeed = settingsStore((s) => s.aivisSpeechSpeed)
  const aivisSpeechPitch = settingsStore((s) => s.aivisSpeechPitch)
  const aivisSpeechIntonationScale = settingsStore(
    (s) => s.aivisSpeechIntonationScale
  )
  const aivisSpeechServerUrl = settingsStore((s) => s.aivisSpeechServerUrl)
  const aivisSpeechTempoDynamics = settingsStore(
    (s) => s.aivisSpeechTempoDynamics
  )
  const aivisSpeechPrePhonemeLength = settingsStore(
    (s) => s.aivisSpeechPrePhonemeLength
  )
  const aivisSpeechPostPhonemeLength = settingsStore(
    (s) => s.aivisSpeechPostPhonemeLength
  )
  const aivisCloudApiKey = settingsStore((s) => s.aivisCloudApiKey)
  const aivisCloudModelUuid = settingsStore((s) => s.aivisCloudModelUuid)
  const aivisCloudStyleId = settingsStore((s) => s.aivisCloudStyleId)
  const aivisCloudStyleName = settingsStore((s) => s.aivisCloudStyleName)
  const aivisCloudUseStyleName = settingsStore((s) => s.aivisCloudUseStyleName)
  const aivisCloudSpeed = settingsStore((s) => s.aivisCloudSpeed)
  const aivisCloudPitch = settingsStore((s) => s.aivisCloudPitch)
  const aivisCloudIntonationScale = settingsStore(
    (s) => s.aivisCloudIntonationScale
  )
  const aivisCloudTempoDynamics = settingsStore(
    (s) => s.aivisCloudTempoDynamics
  )
  const aivisCloudPrePhonemeLength = settingsStore(
    (s) => s.aivisCloudPrePhonemeLength
  )
  const aivisCloudPostPhonemeLength = settingsStore(
    (s) => s.aivisCloudPostPhonemeLength
  )
  const stylebertvits2ServerUrl = settingsStore(
    (s) => s.stylebertvits2ServerUrl
  )
  const stylebertvits2ApiKey = settingsStore((s) => s.stylebertvits2ApiKey)
  const stylebertvits2ModelId = settingsStore((s) => s.stylebertvits2ModelId)
  const stylebertvits2Style = settingsStore((s) => s.stylebertvits2Style)
  const stylebertvits2SdpRatio = settingsStore((s) => s.stylebertvits2SdpRatio)
  const stylebertvits2Length = settingsStore((s) => s.stylebertvits2Length)
  const gsviTtsServerUrl = settingsStore((s) => s.gsviTtsServerUrl)
  const gsviTtsModelId = settingsStore((s) => s.gsviTtsModelId)
  const gsviTtsBatchSize = settingsStore((s) => s.gsviTtsBatchSize)
  const gsviTtsSpeechRate = settingsStore((s) => s.gsviTtsSpeechRate)
  const elevenlabsVoiceId = settingsStore((s) => s.elevenlabsVoiceId)
  const cartesiaVoiceId = settingsStore((s) => s.cartesiaVoiceId)
  const openaiAPIKey = settingsStore((s) => s.openaiKey)
  const openaiTTSVoice = settingsStore((s) => s.openaiTTSVoice)
  const openaiTTSModel = settingsStore((s) => s.openaiTTSModel)
  const openaiTTSSpeed = settingsStore((s) => s.openaiTTSSpeed)
  const azureTTSKey = settingsStore((s) => s.azureTTSKey)
  const azureTTSEndpoint = settingsStore((s) => s.azureTTSEndpoint)
  const { t } = useTranslation()
  const [speakers_voicepeak, setSpeakers_voicepeak] = useState<Array<any>>([])
  const [isUpdatingSpeakers, setIsUpdatingSpeakers] = useState(false)
  const [speakersUpdateError, setSpeakersUpdateError] = useState('')

  useEffect(() => {
    if (selectVoice !== 'voicepeak') return

    const fetchVoicePeakSpeakers = async () => {
      try {
        const response = await fetch('/speakers_voicepeak.json')
        const data = await response.json()
        setSpeakers_voicepeak(data)
      } catch (error) {
        console.error('Failed to fetch VoicePeak speakers:', error)
      }
    }

    void fetchVoicePeakSpeakers()
  }, [selectVoice])
  // 追加: realtimeAPIMode または audioMode が true の場合にメッセージを表示
  if (realtimeAPIMode || audioMode) {
    return (
      <div className="text-center text-xl whitespace-pre-line">
        {t('CannotUseVoice')}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Image
          src="/images/setting-icons/voice-settings.svg"
          alt="Voice Settings"
          width={24}
          height={24}
          className="mr-2"
        />
        <h2 className="text-2xl font-bold">{t('VoiceSettings')}</h2>
      </div>
      <VoiceEngineSelector selectVoice={selectVoice} />

      <div className="border-t border-gray-300 pt-6 my-6">
        <div className="mb-4 text-xl font-bold">{t('VoiceAdjustment')}</div>
        {(() => {
          if (selectVoice === 'koeiromap') {
            return (
              <KoeiromapSettings
                koeiromapKey={koeiromapKey}
                koeiroParam={koeiroParam}
              />
            )
          } else if (selectVoice === 'voicevox') {
            return (
              <VoicevoxSettings
                selectVoice={selectVoice}
                voicevoxServerUrl={voicevoxServerUrl}
                voicevoxSpeaker={voicevoxSpeaker}
                voicevoxSpeed={voicevoxSpeed}
                voicevoxPitch={voicevoxPitch}
                voicevoxIntonation={voicevoxIntonation}
              />
            )
          } else if (selectVoice === 'voicepeak') {
            return (
              <>
                <div>
                  {t('VoicePeakInfo')}
                  <br />
                  <Link
                    url="https://www.ah-soft.com/voice/"
                    label="https://www.ah-soft.com/voice/"
                  />
                </div>
                <div className="mt-4 font-bold">
                  {t('VoicePeakServerUrl')}
                </div>
                <div className="mt-2">
                  <input
                    className="text-ellipsis px-4 py-2 w-full bg-white hover:bg-white-hover rounded-lg"
                    type="text"
                    placeholder="http://localhost:3000"
                    value={voicepeakServerUrl}
                    onChange={(e) =>
                      settingsStore.setState({
                        voicepeakServerUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-4 font-bold">{t('VoicePeakSpeaker')}</div>
                <div className="space-y-3">
                  <select
                    value={voicepeakSpeaker}
                    onChange={(e) =>
                      settingsStore.setState({
                        voicepeakSpeaker: e.target.value,
                      })
                    }
                    className="px-4 py-2 bg-white hover:bg-white-hover rounded-lg"
                  >
                    <option value="">{t('Select')}</option>
                    {speakers_voicepeak.map((speaker) => (
                      <option key={speaker.id} value={speaker.id}>
                        {speaker.speaker}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={async () => {
                      setIsUpdatingSpeakers(true)
                      setSpeakersUpdateError('')
                      try {
                        const response = await fetch(
                          '/api/update-voicepeak-speakers?serverUrl=' +
                            voicepeakServerUrl
                        )
                        if (response.ok) {
                          const updatedSpeakersResponse = await fetch(
                            '/speakers_voicepeak.json'
                          )
                          const updatedSpeakers =
                            await updatedSpeakersResponse.json()
                          setSpeakers_voicepeak(updatedSpeakers)
                        } else {
                          setSpeakersUpdateError(
                            '話者リストの更新に失敗しました'
                          )
                        }
                      } catch (error) {
                        setSpeakersUpdateError(
                          'ネットワークエラーが発生しました'
                        )
                      } finally {
                        setIsUpdatingSpeakers(false)
                      }
                    }}
                    disabled={isUpdatingSpeakers}
                    className="w-full px-4 py-2 text-sm font-medium text-theme bg-primary hover:bg-primary-hover active:bg-primary-press rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    {isUpdatingSpeakers ? '更新中...' : t('UpdateSpeakerList')}
                  </button>
                  {speakersUpdateError && (
                    <div className="mt-2 text-red-600 text-sm">
                      {speakersUpdateError}
                    </div>
                  )}
                </div>
                <div className="mt-6 font-bold">
                  <div className="select-none">
                    {t('SpeechSpeed')}: {voicepeakSpeed}
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2}
                    step={0.01}
                    value={voicepeakSpeed}
                    className="mt-2 mb-4 input-range"
                    onChange={(e) => {
                      settingsStore.setState({
                        voicepeakSpeed: Number(e.target.value),
                      })
                    }}
                  />
                  <div className="select-none">
                    {t('Pitch')}: {voicepeakPitch}
                  </div>
                  <input
                    type="range"
                    min={-0.15}
                    max={0.15}
                    step={0.01}
                    value={voicepeakPitch}
                    className="mt-2 mb-4 input-range"
                    onChange={(e) => {
                      settingsStore.setState({
                        voicepeakPitch: Number(e.target.value),
                      })
                    }}
                  />
                  <div className="select-none">
                    {t('TempoDynamics')}: {voicepeakTempoDynamics}
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2.0}
                    step={0.01}
                    value={voicepeakTempoDynamics}
                    className="mt-2 mb-4 input-range"
                    onChange={(e) => {
                      settingsStore.setState({
                        voicepeakTempoDynamics: Number(e.target.value),
                      })
                    }}
                  />
                  <div className="select-none">
                    {t('VoicePeakIntonationScale')}:{' '}
                    {voicepeakIntonationScale}
                  </div>
                  <input
                    type="range"
                    min={0.0}
                    max={2.0}
                    step={0.01}
                    value={voicepeakIntonationScale}
                    className="mt-2 mb-4 input-range"
                    onChange={(e) => {
                      settingsStore.setState({
                        voicepeakIntonationScale: Number(e.target.value),
                      })
                    }}
                  />
                  <div className="select-none">
                    {t('PreSilenceDuration')}:{' '}
                    {voicepeakPrePhonemeLength}{' '}
                  </div>
                  <input
                    type="range"
                    min={0.0}
                    max={1.0}
                    step={0.01}
                    value={voicepeakPrePhonemeLength}
                    className="mt-2 mb-4 input-range"
                    onChange={(e) => {
                      settingsStore.setState({
                        voicepeakPrePhonemeLength: Number(e.target.value),
                      })
                    }}
                  />
                  <div className="select-none">
                    {t('PostSilenceDuration')}:{' '}
                    {voicepeakPostPhonemeLength}{' '}
                  </div>
                  <input
                    type="range"
                    min={0.0}
                    max={1.0}
                    step={0.01}
                    value={voicepeakPostPhonemeLength}
                    className="mt-2 mb-4 input-range"
                    onChange={(e) => {
                      settingsStore.setState({
                        voicepeakPostPhonemeLength: Number(e.target.value),
                      })
                    }}
                  />
                </div>
              </>
            )
          } else if (selectVoice === 'google') {
            return <GoogleTTSSettings googleTtsType={googleTtsType} />
          } else if (selectVoice === 'stylebertvits2') {
            return (
              <StyleBertVITS2Settings
                stylebertvits2ServerUrl={stylebertvits2ServerUrl}
                stylebertvits2ApiKey={stylebertvits2ApiKey}
                stylebertvits2ModelId={stylebertvits2ModelId}
                stylebertvits2Style={stylebertvits2Style}
                stylebertvits2SdpRatio={stylebertvits2SdpRatio}
                stylebertvits2Length={stylebertvits2Length}
              />
            )
          } else if (selectVoice === 'aivis_speech') {
            return (
              <AivisSpeechSettings
                selectVoice={selectVoice}
                aivisSpeechServerUrl={aivisSpeechServerUrl}
                aivisSpeechSpeaker={aivisSpeechSpeaker}
                aivisSpeechSpeed={aivisSpeechSpeed}
                aivisSpeechPitch={aivisSpeechPitch}
                aivisSpeechTempoDynamics={aivisSpeechTempoDynamics}
                aivisSpeechIntonationScale={aivisSpeechIntonationScale}
                aivisSpeechPrePhonemeLength={aivisSpeechPrePhonemeLength}
                aivisSpeechPostPhonemeLength={aivisSpeechPostPhonemeLength}
              />
            )
          } else if (selectVoice === 'aivis_cloud_api') {
            return (
              <AivisCloudApiSettings
                aivisCloudApiKey={aivisCloudApiKey}
                aivisCloudModelUuid={aivisCloudModelUuid}
                aivisCloudUseStyleName={aivisCloudUseStyleName}
                aivisCloudStyleName={aivisCloudStyleName}
                aivisCloudStyleId={aivisCloudStyleId}
                aivisCloudSpeed={aivisCloudSpeed}
                aivisCloudPitch={aivisCloudPitch}
                aivisCloudTempoDynamics={aivisCloudTempoDynamics}
                aivisCloudIntonationScale={aivisCloudIntonationScale}
                aivisCloudPrePhonemeLength={aivisCloudPrePhonemeLength}
                aivisCloudPostPhonemeLength={aivisCloudPostPhonemeLength}
              />
            )
          } else if (selectVoice === 'gsvitts') {
            return (
              <GsviTtsSettings
                gsviTtsServerUrl={gsviTtsServerUrl}
                gsviTtsModelId={gsviTtsModelId}
                gsviTtsBatchSize={gsviTtsBatchSize}
                gsviTtsSpeechRate={gsviTtsSpeechRate}
              />
            )
          } else if (selectVoice === 'elevenlabs') {
            return (
              <ElevenLabsSettings
                elevenlabsApiKey={elevenlabsApiKey}
                elevenlabsVoiceId={elevenlabsVoiceId}
              />
            )
          } else if (selectVoice === 'cartesia') {
            return (
              <CartesiaSettings
                cartesiaApiKey={cartesiaApiKey}
                cartesiaVoiceId={cartesiaVoiceId}
              />
            )
          } else if (selectVoice === 'openai') {
            return (
              <OpenAITTSSettings
                openaiAPIKey={openaiAPIKey}
                openaiTTSVoice={openaiTTSVoice}
                openaiTTSModel={openaiTTSModel}
                openaiTTSSpeed={openaiTTSSpeed}
              />
            )
          } else if (selectVoice === 'azure') {
            return (
              <AzureTTSSettings
                azureTTSKey={azureTTSKey}
                azureTTSEndpoint={azureTTSEndpoint}
                openaiTTSVoice={openaiTTSVoice}
                openaiTTSSpeed={openaiTTSSpeed}
              />
            )
          }
        })()}
      </div>

      {/* カスタムテキスト入力と統合テストボタン */}
      <TestVoiceSection selectVoice={selectVoice} />
    </div>
  )
}
export default Voice
