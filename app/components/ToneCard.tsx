import styled from "@emotion/styled";

interface ToneCardProps {
    hex: string;
    tone: number;
}

function ToneCard({hex, tone}: ToneCardProps) {
  return (
    <Container>
    <ColorWrapper bgColor={hex} />
    <TextWrapper>
        <span>primary-{tone}</span>
        <span>{hex}</span>
        </TextWrapper>
    </Container>
  )
}

const Container = styled.div`
    width: 200px;
    height: 240px;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    gap: .5rem;
    `

const ColorWrapper = styled.div<{bgColor: string}>`
width: 100%;
height: 100%;
border-radius: 8px;
background-color: ${props => props.bgColor || '#0066CC'};
`

const TextWrapper = styled.div`
display: flex;
flex-direction: column;
  gap: .25rem;
`

export default ToneCard
