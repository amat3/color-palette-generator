import { useState } from 'react'
import styled from '@emotion/styled'
import { ColorScaleItem } from '@/lib/colorMath'
import toast from 'react-hot-toast'
import { ClipboardCopy, CodeXml, FileJson } from 'lucide-react'
import { media } from '@/lib/breakpoints'

type ExportFormat = 'json' | 'css'

interface ExportPanelProps {
  scale: ColorScaleItem[]
  colorName: string
  onColorNameChange: (name: string) => void
}

const FORMATS = [
  { value: 'json', label: 'JSON', Icon: FileJson },
  { value: 'css', label: 'CSS', Icon: CodeXml },
] as const

// Convertir scale a JSON
function scaleToJson(scale: ColorScaleItem[], colorName: string): string {
  const tones = scale.reduce<Record<number, string>>((acc, item) => {
    acc[item.tone] = item.hex
    return acc
  }, {})

  return JSON.stringify({ [colorName]: tones }, null, 2)
}

// Convertir scale a CSS variables
function scaleToCss(scale: ColorScaleItem[], colorName: string): string {
  const lines = scale.map((item) => `  --${colorName}-${item.tone}: ${item.hex};`).join('\n')

  return `:root {\n${lines}\n}`
}

function ExportPanel({ scale, colorName, onColorNameChange }: ExportPanelProps) {
  const [format, setFormat] = useState<ExportFormat>('json')

  const content = format === 'json' ? scaleToJson(scale, colorName) : scaleToCss(scale, colorName)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    toast.success('¡Copiado!')
  }

  return (
    <Container>
      <ActionsWrapper>
        {/* Input para nombre del color */}
        <InputWrapper>
          <span>Variable</span>
          <TextInput
            type='text'
            value={colorName}
            onChange={(e) => onColorNameChange(e.target.value)}
            placeholder='Nombre del color'
          />
        </InputWrapper>

        {/* Tabs */}
        <Segmented role='group' aria-label='Export format'>
          {FORMATS.map(({ value, label, Icon }) => (
            <Segment
              key={value}
              type='button'
              aria-pressed={format === value}
              $isActive={format === value}
              onClick={() => setFormat(value)}
            >
              <Icon size={14} aria-hidden='true' />
              {label}
            </Segment>
          ))}
        </Segmented>

        {/* Botón copiar */}
        <Cta onClick={handleCopy}>
          <ClipboardCopy size={14} />
          Copy
        </Cta>
      </ActionsWrapper>

      <Preview>
        <code>{content}</code>
      </Preview>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 0.75rem;
`

const ActionsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.75rem;

  ${media.tablet} {
    flex-direction: row;
  }
`

const InputWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  flex: 1;
  padding: 10px 12px;
  gap: 0.75rem;
  border-radius: 12px;
  background-color: #f8f7fc;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #9c94ad;
`

const TextInput = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: 700;

  color: #241b3a;
  background-color: transparent;
  border: 0;
  outline: none;
  cursor: text;
`

const Segmented = styled.div`
  display: flex;
  padding: 4px;
  gap: 4px;
  border-radius: 12px;
  background-color: #f8f7fc;
`

const Segment = styled.button<{ $isActive: boolean }>`
  display: inline-flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 0.375rem;
  border: none;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? '#6a4cde;' : '#8D83A4')};
  background-color: ${({ $isActive }) => ($isActive ? '#fff' : 'transparent')};
  box-shadow: ${({ $isActive }) => ($isActive ? '0 1px 4px rgba(36, 27, 58, 0.12)' : 'none')};
  transition:
    background-color 0.2s,
    color 0.2s,
    box-shadow 0.2s;

  &:hover:not([aria-pressed='true']) {
    color: #6a4cde;
  }

  &:focus-visible {
    outline: 2px solid #6a4cde;
    outline-offset: 2px;
    color: #6a4cde;
  }
`

const Cta = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  gap: 0.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background-color: #6a4cde;
  cursor: pointer;
  transition:
    filter 0.2s,
    transform 0.1s;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid #6a4cde;
    outline-offset: 2px;
  }
`

const Preview = styled.pre`
  max-height: 8rem;
  margin: 0;
  padding: 1rem;
  overflow: auto;
  border-radius: 16px;
  background-color: #241b3a;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #d4cbf6;
  white-space: pre;
`

export default ExportPanel
