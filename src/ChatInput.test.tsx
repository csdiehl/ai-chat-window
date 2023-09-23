import React from "react"
import { render, screen } from "@testing-library/react"
import ChatInput from "./components/ChatInput"
import userEvent from "@testing-library/user-event"

test("Change handler is called every time the user types", async () => {
  const mockSubmitFunction = jest.fn()
  const mockSetMessage = jest.fn()
  render(
    <ChatInput
      newMessage={""}
      setNewMessage={mockSetMessage}
      handleSubmit={mockSubmitFunction}
    />
  )
  const input = await screen.findByRole("textbox", { name: /input-field/i })
  userEvent.type(input, "hello, tell me some more about foxes!")
  expect(mockSetMessage).toHaveBeenCalledTimes(37)
})

test("Button calls the correct callback function", async () => {
  const mockSubmitFunction = jest.fn()
  const mockSetMessage = jest.fn()
  render(
    <ChatInput
      newMessage={""}
      setNewMessage={mockSetMessage}
      handleSubmit={mockSubmitFunction}
    />
  )
  const input = await screen.findByRole("button", { name: /send/i })
  userEvent.type(input, "hello, tell me some more about foxes!")
  expect(mockSubmitFunction).toHaveBeenCalled()
})
