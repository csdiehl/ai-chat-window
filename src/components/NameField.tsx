import React from "react"
import styled from "styled-components"

const Input = styled.input`
  box-sizing: border-box;
  border: none;
  font-size: 2rem;
  line-height: 2rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 4px 16px;
  background: none;
  width: 50%;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 425px) {
    width: 70%;
  }
`

interface EditableTextFieldProps {
  initialValue: string
  setName: (name: string) => void
}

const NameField: React.FC<EditableTextFieldProps> = ({
  initialValue,
  setName,
}) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <Input
      placeholder={initialValue}
      type="text"
      id="name"
      value={initialValue}
      onChange={handleNameChange}
    />
  )
}

export default NameField
