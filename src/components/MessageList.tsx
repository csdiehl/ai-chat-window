import React from "react"
import styled from "styled-components"
import { Message } from "./ChatWindow"
import MessageItem from "./MessageItem"

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 56px;
  grid-area: chat;
  padding: 8px 16px;

  &::-webkit-scrollbar {
    display: none;
  }
`

interface MessageListProps {
  messages: Message[]
  agentName: string
}

const MessageList = ({ messages, agentName }: MessageListProps) => {
  return (
    <Container>
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          message={message}
          agentName={agentName}
        ></MessageItem>
      ))}
    </Container>
  )
}

export default MessageList
