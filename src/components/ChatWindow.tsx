import { useFixie } from "fixie/web"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { background, primaryColor } from "../styles"
import ChatInput from "./ChatInput"
import MessageList from "./MessageList"
import NameField from "./NameField"

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
  justify-content: flex-start;
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
  const { turns, modelResponseInProgress, sendMessage } = useFixie({
    agentId: "justin/fixie",
    fixieAPIKey: token,
  })

  const latest =
    turns &&
    turns.length > 0 &&
    turns
      .at(-1)
      .messages.filter((d) => d.kind === "text")
      .at(-1)?.content

  useEffect(() => {
    console.log(latest)
  }, [latest])

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

      console.log(userMessage.text)
      // Fetch the response from the Fixie sidekick
      sendMessage(userMessage.text)
    }
  }

  return (
    <ChatWrapper>
      <TitleBlock>
        <NameField setName={setName} initialValue={name} />
        <img alt="edit" src="./edit.svg"></img>
      </TitleBlock>
      <MessageList
        streamedMessage={latest ?? ""}
        messages={messages}
        agentName={name}
      />
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSubmit={handleSubmit}
      />
    </ChatWrapper>
  )
}

export default ChatWindow
