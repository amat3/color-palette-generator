import styled from '@emotion/styled'
import { getContrastColor } from '@/lib/colorMath'
import { media } from '@/lib/breakpoints'

interface ToneCardProps {
  hex: string
  tone: number
  colorName: string
}

function ToneCard({ hex, tone, colorName }: ToneCardProps) {
  const textColor = getContrastColor(hex)

  return (
    <ColorWrapper $bgColor={hex} $textColor={textColor}>
      <ColorName>
        {colorName}-{tone}
      </ColorName>
      <Hex>{hex}</Hex>
    </ColorWrapper>
  )
}

const ColorWrapper = styled.div<{ $bgColor: string; $textColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  overflow-wrap: anywhere;
  min-height: 8rem;
  padding: 1rem;
  border-radius: 22px;
  text-align: left;
  letter-spacing: -0.025em;
  font-weight: 700;
  color: ${({ $textColor }) => $textColor};
  background-color: ${({ $bgColor }) => $bgColor};
  transition:
    background-color 0.2s,
    color 0.2s;

  ${media.tablet} {
    min-height: 10rem;
  }

  ${media.desktop} {
    min-height: 8rem;
    padding: 0.75rem;
    border-radius: 18px;
  }

  ${media.wide} {
    min-height: 10rem;
    padding: 1rem;
    border-radius: 22px;
  }
`

const ColorName = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  opacity: 80%;

  ${media.desktop} {
    font-size: 0.8125rem;
  }

  ${media.wide} {
    font-size: 1rem;
  }
`

const Hex = styled.p`
  font-size: 0.875rem;
  line-height: 1.25;
  text-transform: uppercase;

  ${media.desktop} {
    font-size: 0.75rem;
  }

  ${media.wide} {
    font-size: 0.875rem;
  }
`

export default ToneCard
