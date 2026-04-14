import { useMemo, useState } from 'react'

export function useMediaPlayer(duration = 100) {
	const [playing, setPlaying] = useState(false)
	const [position, setPosition] = useState(0)
	const [volume, setVolume] = useState(70)

	const api = useMemo(
		() => ({
			playing,
			position,
			volume,
			duration,
			toggle() {
				setPlaying(value => !value)
			},
			seek(next: number) {
				setPosition(Math.max(0, Math.min(duration, next)))
			},
			skip(seconds: number) {
				setPosition(value => Math.max(0, Math.min(duration, value + seconds)))
			},
			setVolumeValue(next: number) {
				setVolume(Math.max(0, Math.min(100, next)))
			}
		}),
		[duration, position, playing, volume]
	)

	return api
}
