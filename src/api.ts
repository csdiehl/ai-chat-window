import { Message } from "./components/ChatWindow"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXhpZS5haS9wcm9kIiwiYXVkIjoiaHR0cHM6Ly9maXhpZS5haSIsInN1YiI6IjM5In0.MeV6AF8FUBRxRtdvwU_ZJNkVmO9OXNrQH3SH0Zt0rA4"

export async function getAgentResponse(text: string): Promise<Message> {
  const url = "https://api.fixie.ai/api/v1/agents/justin/fixie/conversations"
  const data = {
    message: text,
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const responseData = await response.text()

    const agentMessage: Message = {
      text: extractLastLine(responseData),
      timestamp: new Date(),
      isUser: false,
    }

    return agentMessage
  } catch (error) {
    return {
      text: "Sorry there was a problem getting data from the Fixie API.",
      timestamp: new Date(),
      isUser: false,
    }
  }
}

function extractLastLine(text: string): string {
  const lastLine = text.split("\n").at(-2) ?? ""
  const messages = JSON.parse(lastLine)
    .turns[1].messages.map((d: any) => d.content)
    .filter((d: any) => d !== undefined)

  return messages[0]
}
