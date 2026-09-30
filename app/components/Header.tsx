import styled from '@emotion/styled'
import { Droplets } from 'lucide-react'

function Header() {
  return (
    <Root>
      <IconWrapper>
        <Droplets size={18} />
      </IconWrapper>

      <HeaderTextWrapper>
        <HeaderTitle>Color tools</HeaderTitle>
        <HeaderSubtitle>Tonelab</HeaderSubtitle>
      </HeaderTextWrapper>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  border-radius: 1rem;
  background-color: #241b3a;
  color: #fff;
  box-shadow: 0 4px 24px #241b3a2e;
`

const HeaderTextWrapper = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
`

const HeaderTitle = styled.p`
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8d83a4;
`

const HeaderSubtitle = styled.p`
  letter-spacing: -0.025em;
  color: #241b3a;
`

export default Header
