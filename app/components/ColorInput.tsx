'use client'

import styled from "@emotion/styled"
import { useEffect, useState } from "react"

interface ColorInputProps {
    value: string
    onChange: (newHex: string) => void
}

const HEX_REGEX = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

function ColorInput({value, onChange}: ColorInputProps) {
    const [draft, setDraft] = useState(value)
    const isValid = HEX_REGEX.test(draft)

    useEffect(() => {
        setDraft(value)
    }, [value])

const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDraft(newValue);

    if (HEX_REGEX.test(newValue)) {
        const cleanHex = newValue.replace("#", "")
        onChange(cleanHex)
    }
}
    const handleBlur = () => {
        if (!isValid) {
            setDraft(value)
        }
    }

    const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanHex = e.target.value.replace("#", "");
    setDraft(cleanHex);
    onChange(cleanHex);
  };

  const pickerValue = `#${value.replace("#", "")}`;

  return (
    <Root>
        <InputWrapper>
        <span>Color</span>
      
        <Picker
            type="color"
            value={pickerValue}
            onChange={handlePickerChange}
            />
         
            </InputWrapper>

<InputWrapper>
            <span>HEX</span>
        <TextInput
          type="text"
          value={draft.replace("#", "")}
          onChange={handleTextChange}
          onBlur={handleBlur}
        />
      </InputWrapper>
    </Root>
  )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`

const Picker = styled.input`
    width: 5rem;
    height: 2rem;
    border: 0;
    cursor: crosshair;
`

const TextInput = styled.input`
    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    text-align: center;
    border: 0;
    border-radius: .5rem;
    cursor: text;
`

export default ColorInput
