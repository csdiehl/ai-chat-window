import styled from "styled-components"
import ChatWindow from "./components/ChatWindow"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`

function App() {
  return (
    <Container>
      <ChatWindow />
    </Container>
  )
}

export default App
