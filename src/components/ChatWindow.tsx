import { useState } from "react"
import ChatInput from "./ChatInput"
import styled from "styled-components"
import { primaryColor, background } from "../styles"
import MessageList from "./MessageList"
import { getAgentResponse } from "../api"
import NameField from "./NameField"

const ChatWrapper = styled.div`
  display: grid;
  grid-template-rows: 56px 1fr 56px;
  grid-template-columns: 100%;
  background-color: ${primaryColor};
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  grid-template-areas: "header" "chat" "input";
`

const TitleBlock = styled.div`
  width: 100%;
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
      <TitleBlock>
        <NameField setName={setName} initialValue={name} />
        <img alt="edit-icon" style={{ opacity: 0.8 }} src="./edit.svg"></img>
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
