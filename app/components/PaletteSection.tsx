import { media } from '@/lib/breakpoints'
import styled from '@emotion/styled'
import ToneCard from './ToneCard'
import { ColorScaleItem } from '@/lib/colorMath'

interface PaletteSectionProps {
  scale: ColorScaleItem[]
  colorName: string
}

function PaletteSection({ scale, colorName }: PaletteSectionProps) {
  return (
    <Container>
      <PaletteTextWrapper>
        <PaletteTitle>Generated palette</PaletteTitle>
        <SubtitleRow>
          <PaletteSubtitle>A tonal range built from your base</PaletteSubtitle>
          <PaletteSpan>
            <span></span>
            Live preview
          </PaletteSpan>
        </SubtitleRow>
      </PaletteTextWrapper>
      <ScaleWrapper>
        {scale.map((item) => (
          <ToneCard key={item.tone} hex={item.hex} tone={item.tone} colorName={colorName} />
        ))}
      </ScaleWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 1.25rem;
`

const PaletteTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 0.5rem;
`

const PaletteTitle = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #a39aaf;
`

const SubtitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PaletteSpan = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0.5rem;
  color: #a39aaf;
  font-size: 0.75rem;
  font-weight: 500;

  span {
    width: 8px;
    height: 8px;
    border-radius: 500%;
    background-color: #56d39b;
  }
`

const PaletteSubtitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.25;
  color: #7a718f;
`

const ScaleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  min-width: 0;
  padding: 0.5rem;
  border-radius: 30px;
  background-color: #fff;
  border: 1px solid #e7e3f0;
  border-radius: 28px;

  ${media.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  ${media.desktop} {
    grid-template-columns: repeat(6, minmax(90px, 1fr));
  }
`

export default PaletteSection
