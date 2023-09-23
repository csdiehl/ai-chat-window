import React from "react"
import styled, { keyframes } from "styled-components"
import { getRelativeDate } from "../utils"
import { Message } from "./ChatWindow"

const Appear = keyframes`
from {
  opacity: 0;
  transform: scale(.75);
}

to {
  opacity: 1;
  transform: scale(1);
}
`

const Container = styled.div<{ isUser: boolean }>`
  background-color: ${(props) =>
    props.isUser ? "rgba(255, 255, 255, .2)" : "rgba(255, 255, 255, .05)"};
  color: white;
  border-radius: 4px;
  padding: 8px;
  margin: 4px;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  max-width: 70%;
  display: flex;
  gap: 8px;
  animation: ${Appear} 500ms ease-in;
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 5px;
`

const MessageText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1rem;
  text-wrap: balance;
  color: rgba(255, 255, 255, 0.8);
`

const UserName = styled.h2`
  padding: 0;
  margin: 0 0 4px;
  font-weight: bold;
  color: #fff;
  font-size: 1rem;
  line-height: 1rem;
`

const MessageTimestamp = styled.span`
  font-size: 12px;
  color: lightgrey;
`

interface Props {
  agentName: string
  message: Message
}

const MessageItem = ({ message, agentName }: Props) => {
  return (
    <Container isUser={message.isUser}>
      <Avatar src={message.isUser ? "./logo192.png" : "fixie_logo.png"} />

      <div style={{ maxWidth: "calc(100% - 48px)" }}>
        <UserName>{message.isUser ? "User" : agentName}</UserName>
        <MessageText>{message.text}</MessageText>
        <MessageTimestamp>
          {`Sent ${getRelativeDate(message.timestamp)}`}
        </MessageTimestamp>
      </div>
    </Container>
  )
}

export default MessageItem
