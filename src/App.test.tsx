import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("it renders the correct input box", () => {
  render(<App />)
  const input = screen.getByRole("textbox", { name: "input-field" })
  expect(input).toBeInTheDocument()
})

test("it renders a button with accessible role", () => {
  render(<App />)
  const input = screen.getByRole("button", { name: "send" })
  expect(input).toBeInTheDocument()
})
