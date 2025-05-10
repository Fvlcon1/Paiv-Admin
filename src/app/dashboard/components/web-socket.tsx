'use client'

import { useAppContext } from '@/app/context/context'
import { useEffect, useRef } from 'react'

const WebSocketComponent = () => {
  const socketRef = useRef<any>(null)
  const {setNumberOfPending, setNumberOfApproved, setNumberOfFlagged, setNumberOfDeclined, numberOfPending, numberOfApproved, numberOfFlagged, numberOfDeclined} = useAppContext()

  const processMessage = (message: string) => {
    const {pending, approved, flagged, declined} = JSON.parse(message)
    setNumberOfPending(Number(pending))
    setNumberOfApproved(Number(approved))
    setNumberOfFlagged(Number(flagged))
    setNumberOfDeclined(Number(declined))
  }

  useEffect(() => {
    console.log({numberOfPending, numberOfApproved, numberOfFlagged, numberOfDeclined})
  }, [numberOfPending, numberOfApproved, numberOfFlagged, numberOfDeclined])

  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket(process.env.NEXT_PUBLIC_STATUS_SOCKET_URL || "")
    socketRef.current = socket

    // Connection opened
    socket.addEventListener('open', (event) => {
      socket.send('Hello Server!')
    })

    // Listen for messages
    socket.addEventListener('message', (event) => {
      processMessage(event.data)
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