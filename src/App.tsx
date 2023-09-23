import React, { useState } from "react"
import ChatWindow from "./components/ChatWindow"
import styled from "styled-components"
import NameField from "./components/NameField"
import { background } from "./styles"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`

const TitleBlock = styled.div`
  width: 100%;
  height: 56px;
  background-color: ${background};
  display: flex;
  align-items: center;
`

function App() {
  const [name, setName] = useState("My Awesome Sidekick")
  return (
    <Container>
      <TitleBlock>
        <NameField setName={setName} initialValue={name} />
        <img alt="edit-icon" style={{ opacity: 0.8 }} src="./edit.svg"></img>
      </TitleBlock>
      <ChatWindow agentName={name} />
    </Container>
  )
}

export default App
