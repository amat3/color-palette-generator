import styled from '@emotion/styled'

import ExportPanel from './ExportPanel'
import { ColorScaleItem } from '@/lib/colorMath'

interface ExportSectionProps {
  scale: ColorScaleItem[]
  colorName: string
  onChange: (name: string) => void
}

function ExportSection({ scale, colorName, onChange }: ExportSectionProps) {
  return (
    <Root>
      <ExportTextWrapper>
        <ExportTitle>Export Palette</ExportTitle>
        <ExportSubtitle>Name your color variables and copy the full set.</ExportSubtitle>
      </ExportTextWrapper>

      <ExportPanel scale={scale} colorName={colorName} onColorNameChange={onChange} />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 1rem;
  gap: 0.75rem;
  background-color: #fff;
  border: 1px solid #e7e3f0;
  border-radius: 28px;
`

const ExportTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ExportTitle = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #a39aaf;
`

const ExportSubtitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.25;
  color: #7a718f;
`

export default ExportSection
