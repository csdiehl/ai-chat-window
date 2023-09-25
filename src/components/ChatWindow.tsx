import { useState } from "react"
import ChatInput from "./ChatInput"
import styled from "styled-components"
import { primaryColor, background } from "../styles"
import MessageList from "./MessageList"
import NameField from "./NameField"
import { useAIStream } from "ai-jsx/react"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXhpZS5haS9wcm9kIiwiYXVkIjoiaHR0cHM6Ly9maXhpZS5haSIsInN1YiI6IjM5In0.MeV6AF8FUBRxRtdvwU_ZJNkVmO9OXNrQH3SH0Zt0rA4"

const ChatWrapper = styled.div`
  display: grid;
  grid-template-rows: 56px 1fr 56px;
  grid-template-columns: 100%;
  background-color: ${primaryColor};
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  grid-template-areas: "header" "chat" "input";
`

const TitleBlock = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: ${background};
  display: flex;
  align-items: center;
  grid-area: header;
`

export interface Message {
  text: string
  timestamp: Date
  isUser: boolean
}

function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]) // stack for messages
  const [newMessage, setNewMessage] = useState<string>("")
  const [name, setName] = useState("My Awesome Sidekick")
  const { current, fetchAI } = useAIStream()

  console.log("response:", current)

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
      fetchAI("https://api.fixie.ai/api/v1/agents/justin/fixie/conversations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
        }),
      })
    }
  }

  return (
    <ChatWrapper>
      <TitleBlock>
        <NameField setName={setName} initialValue={name} />
        <img src="./edit.svg"></img>
      </TitleBlock>
      <MessageList messages={messages} agentName={name} />
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSubmit={handleSubmit}
      />
    </ChatWrapper>
  )
}

export default ChatWindow
