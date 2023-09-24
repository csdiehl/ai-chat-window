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
  const [messages, setMessages] = useState<Message[]>([]) // stack for messages
  const [newMessage, setNewMessage] = useState<string>("")

  const handleSubmit = () => {
    // check if the input is not empty
    if (newMessage.trim() !== "") {
      const timestamp = new Date()
      const userMessage: Message = { text: newMessage, timestamp, isUser: true }

      // immediately add a default loading message
      const loadingMessage: Message = {
        text: "I'm thinking...",
        timestamp: new Date(),
        isUser: false,
      }
      setMessages([...messages, userMessage, loadingMessage])
      setNewMessage("")

      // Fetch the response from the Fixie sidekick
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
