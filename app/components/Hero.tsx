import styled from '@emotion/styled'
import { Sparkles } from 'lucide-react'
import ColorInput from './ColorInput'
import { media } from '@/lib/breakpoints'

interface HeroProps {
  value: string
  onChange: (newHex: string) => void
}

function Hero({ value, onChange }: HeroProps) {
  return (
    <Root>
      <PillWrapper>
        <Sparkles />
        <span>Build a palette in seconds</span>
      </PillWrapper>

      <ContentTitle>
        Find your <span>color story.</span>
      </ContentTitle>
      <ContentDescription>
        Start with one color and let Tonelab shape a balanced family of tones for your next idea.
      </ContentDescription>

      <ColorInput value={value} onChange={onChange} />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 1.25rem;
`

const PillWrapper = styled.div`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  padding: 6px 12px;
  gap: 0.5rem;
  color: #6a4cde;
  background-color: #eeeafe;
  font-size: 12px;
  font-weight: 700;
  border-radius: 12px;
`

const ContentTitle = styled.h1`
  font-size: clamp(2.75rem, 5vw, 5.3rem);
  font-weight: 900;
  letter-spacing: -0.07em;
  line-height: 0.94;
  color: #241b3a;

  & span {
    color: #6a4cde;
  }
`

const ContentDescription = styled.p`
  max-width: 370px;
  font-size: 1rem;
  line-height: 1.75;
  color: #7a718f;
`

export default Hero
