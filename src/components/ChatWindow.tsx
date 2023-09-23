import { useState } from "react"
import ChatInput from "./ChatInput"
import styled from "styled-components"
import { primaryColor } from "../styles"
import MessageList from "./MessageList"
import { getAgentResponse } from "../api"

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${primaryColor};
  height: calc(100% - 56px);
  box-sizing: border-box;
  position: relative;
  padding: 16px;
`

export interface Message {
  text: string
  timestamp: Date
  isUser: boolean
}

interface ChatProps {
  agentName: string
}

function ChatWindow({ agentName }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>("")

  const handleSubmit = () => {
    if (newMessage.trim() !== "") {
      const timestamp = new Date()
      const userMessage: Message = { text: newMessage, timestamp, isUser: true }

      const loadingMessage: Message = {
        text: "I'm thinking...",
        timestamp: new Date(),
        isUser: false,
      }
      setMessages([...messages, userMessage, loadingMessage])
      setNewMessage("")

      // Simulate agent response after a delay (e.g., 2 seconds)
      getAgentResponse(userMessage.text).then((data) => {
        if (data) setMessages([...messages, userMessage, data])
      })
    }
  }

  return (
    <ChatWrapper>
      <MessageList messages={messages} agentName={agentName} />
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSubmit={handleSubmit}
      />
    </ChatWrapper>
  )
}

export default ChatWindow
