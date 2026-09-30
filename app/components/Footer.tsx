import styled from '@emotion/styled'
import { media } from '@/lib/breakpoints'

function Footer() {
  return (
    <Container>
      <p>Tonelab / Palette Generator</p>
      <p>One color, many possibilities</p>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  gap: 0.5rem;
  text-align: left;
  text-transform: uppercase;
  color: #a39aaf;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  border-top: 1px solid #e7e3f0;

  ${media.tablet} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

export default Footer
