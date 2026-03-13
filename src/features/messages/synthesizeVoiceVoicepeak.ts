import { Talk } from './messages'

export async function synthesizeVoiceVoicePeakApi(
  talk: Talk,
  speaker: string,
  speed: number,
  pitch: number,
  intonationScale: number,
  serverUrl: string,
  tempoDynamics?: number,
  prePhonemeLength?: number,
  postPhonemeLength?: number
): Promise<ArrayBuffer> {
  try {
    const res = await fetch('/api/tts-voicepeak', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: talk.message,
        speaker,
        speed,
        pitch,
        intonationScale,
        serverUrl,
        tempoDynamics,
        prePhonemeLength,
        postPhonemeLength,
      }),
    })

    if (!res.ok) {
      throw new Error(
        `VoicePeakからの応答が異常です。ステータスコード: ${res.status}`
      )
    }

    return await res.arrayBuffer()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`VoicePeakでエラーが発生しました: ${error.message}`)
    } else {
      throw new Error('VoicePeakで不明なエラーが発生しました')
    }
  }
}
