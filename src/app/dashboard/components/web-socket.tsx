'use client'

import { useAppContext } from '@/app/context/context'
import { useEffect, useRef } from 'react'

const WebSocketComponent = () => {
  const socketRef = useRef<any>(null)
  const {setNumberOfPending, setNumberOfApproved, setNumberOfFlagged, setNumberOfDeclined} = useAppContext()

  const processMessage = (message: string) => {
    const messageSplit = message.split(":")
    const state = messageSplit[0]
    const value = messageSplit[1]
    switch (state) {
      case "pending":
        setNumberOfPending(Number(value))
        break;
      case "approved":
        setNumberOfApproved(Number(value))
        break;
      case "flagged":
        setNumberOfFlagged(Number(value))
        break;
      case "declined":
        setNumberOfDeclined(Number(value))
        break;
      default:
        break;
    }
  }

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