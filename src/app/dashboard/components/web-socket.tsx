'use client'

import { useAppContext } from '@/app/context/context'
import { useDashboardContext } from '../(main)/context/context'
import { useEffect, useRef } from 'react'
import Cookies from 'universal-cookie'

const WebSocketComponent = () => {
	const socketRef = useRef<any>(null)
	const { setDashboardData } = useDashboardContext()
	const { setNumberOfPending, setNumberOfApproved, setNumberOfFlagged, setNumberOfDeclined, numberOfPending, numberOfApproved, numberOfFlagged, numberOfDeclined } = useAppContext()

	const processDashboardMessage = (message: string) => {
		const { type, payload } = JSON.parse(message)
		if (type === "dashboard_summary")
			processDashboardSummary(payload)
	}

	const processClaimsStatusMessage = (message: string) => {
		const { type, counts } = JSON.parse(message)
		processCounterUpdate(counts)
	}

	const processCounterUpdate = (payload: any) => {
		const { pending, approved, flagged, rejected } = payload
		setNumberOfPending(Number(pending))
		setNumberOfApproved(Number(approved))
		setNumberOfFlagged(Number(flagged))
		setNumberOfDeclined(Number(rejected))
	}

	const processDashboardSummary = (payload: any) => {
		setDashboardData(payload)
	}

	//Claims status WebSocket
	useEffect(() => {
		// Create WebSocket connection
		const cookies = new Cookies()
		const token = cookies.get("accessToken")
		const socket = new WebSocket(`${process.env.NEXT_PUBLIC_STATUS_SOCKET_URL}?token=${token}`)
		socketRef.current = socket

		// Connection opened
		socket.addEventListener('open', (event) => {
			socket.send('Hello Server!')
		})

		// Listen for messages
		socket.addEventListener('message', (event) => {
			processClaimsStatusMessage(event.data)
		})

		// Connection closed
		socket.addEventListener('close', (event) => {
		})

		// Error handling
		socket.addEventListener('error', (error) => {
		})

		// Clean up on unmount
		return () => {
			if (socket.readyState === WebSocket.OPEN) {
				socket.close()
			}
		}
	}, [])

	//Dashboard WebSocket
	useEffect(() => {
		// Create WebSocket connection
		const socket = new WebSocket(process.env.NEXT_PUBLIC_DASHBOARD_SOCKET_URL || "")
		socketRef.current = socket

		// Connection opened
		socket.addEventListener('open', (event) => {
			socket.send('Hello Server!')
		})

		// Listen for messages
		socket.addEventListener('message', (event) => {
			processDashboardMessage(event.data)
		})

		// Connection closed
		socket.addEventListener('close', (event) => {
		})

		// Error handling
		socket.addEventListener('error', (error) => {
		})

		// Clean up on unmount
		return () => {
			if (socket.readyState === WebSocket.OPEN) {
				socket.close()
			}
		}
	}, [])

	return <></>
}

export default WebSocketComponent