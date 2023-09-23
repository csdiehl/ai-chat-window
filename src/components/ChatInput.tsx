import React from "react"
import styled from "styled-components"
import { background, secondaryColor } from "../styles"

const MessageInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  box-sizing: border-box;
  transform: translate(-50%);
  padding: 16px;
  background-color: ${background};
  height: 56px;
`

const InputField = styled.input`
  box-sizing: border-box;
  flex-grow: 1;
  border: none;
  border-radius: 4px;
  padding: 8px;
  margin-right: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
`

const SendButton = styled.button`
  background-color: ${secondaryColor};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`

interface InputProps {
  newMessage: string
  setNewMessage: (message: string) => void
  handleSubmit: () => void
}

const ChatInput = ({ newMessage, setNewMessage, handleSubmit }: InputProps) => {
  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <MessageInput>
      <InputField
        name="input-field"
        aria-label="input-field"
        type="text"
        placeholder="Ask me something about foxes..."
        value={newMessage}
        onChange={(e: any) => setNewMessage(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent) => handleKeyPress(e)}
      />
      <SendButton role="button" onClick={handleSubmit}>
        send
      </SendButton>
    </MessageInput>
  )
}

export default ChatInput
