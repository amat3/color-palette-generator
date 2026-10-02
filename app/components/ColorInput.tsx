'use client'

import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Pipette } from 'lucide-react'
import { getContrastColor, normalizeHex } from '@/lib/colorMath'

interface ColorInputProps {
  value: string
  onChange: (newHex: string) => void
}

const HEX_REGEX = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

function ColorInput({ value, onChange }: ColorInputProps) {
  const [draft, setDraft] = useState(value)
  const isValid = HEX_REGEX.test(draft)

  useEffect(() => {
    setDraft(value)
  }, [value])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setDraft(newValue)

    if (HEX_REGEX.test(newValue)) {
      const cleanHex = newValue.replace('#', '')
      onChange(cleanHex)
    }
  }
  const handleBlur = () => {
    if (!isValid) {
      setDraft(value)
    }
  }

  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanHex = e.target.value.replace('#', '')
    setDraft(cleanHex)
    onChange(cleanHex)
  }

  const normalizedHex = normalizeHex(value)
  const pickerValue = `#${normalizedHex}`
  const iconColor = getContrastColor(normalizedHex)

  return (
    <Root>
      <InputWrapper>
        <Color $bgColor={pickerValue} $iconColor={iconColor}>
          <PickerWrapper type='color' value={pickerValue} onChange={handlePickerChange} />
          <PipetteIcon size={18} />
        </Color>

        <TextWrapper>
          <BaseColor>Base color</BaseColor>
          <HexText>
            <span>#</span>
            <TextInput type='text' value={draft.replace('#', '')} onChange={handleTextChange} onBlur={handleBlur} />
          </HexText>
        </TextWrapper>
      </InputWrapper>

      <Description>Use the picker or enter any HEX value to update the palette.</Description>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: 27rem;
  padding: 1rem;
  gap: 0.75rem;
  background-color: #fff;
  border: 1px solid #e7e3f0;
  border-radius: 28px;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  gap: 0.75rem;
  border-color: hsl(240 5.9% 90%);
  border-radius: 20px;
  background-color: #f8f7fc;
`

const Color = styled.label<{ $bgColor: string; $iconColor: string }>`
  position: relative;
  display: flex;
  width: 3.5rem;
  height: 3.5rem;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  cursor: pointer;
  color: ${({ $iconColor }) => $iconColor};
  background-color: ${({ $bgColor }) => $bgColor};
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.2s,
    color 0.2s;
`

const TextWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  gap: 2px;
`

const PickerWrapper = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  opacity: 0;
  cursor: pointer;
`

const PipetteIcon = styled(Pipette)`
  display: block;
`

const BaseColor = styled.p`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: #9c94ad;
`

const HexText = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  line-height: 1.4;
  color: #241b3a;
`

const TextInput = styled.input`
  width: 100%;
  min-width: 0;
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  line-height: 1.4;
  border: 0;
  color: #241b3a;
  background-color: transparent;
  cursor: text;
`

const Description = styled.p`
  font-size: 12px;
  padding-inline: 0.5rem;
  color: #a29aaf;
`

export default ColorInput
