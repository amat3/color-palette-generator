'use client'

import { useState } from 'react'
import styled from '@emotion/styled'

import Header from './components/Header'
import Hero from './components/Hero'
import PaletteSection from './components/PaletteSection'
import ExportSection from './components/ExportSection'
import Footer from './components/Footer'

import { media } from '@/lib/breakpoints'
import { generateColorScale } from '@/lib/colorMath'

export default function Home() {
  const [baseHex, setBaseHex] = useState('6A4CDE')
  const [colorName, setColorName] = useState('primary')
  const scale = generateColorScale(baseHex)

  return (
    <Root>
      <Wrapper>
        <Header />

        <Layout>
          <Hero value={baseHex} onChange={setBaseHex} />

          <RightColumn>
            <PaletteSection scale={scale} colorName={colorName} />
            <ExportSection scale={scale} colorName={colorName} onChange={setColorName} />
          </RightColumn>
        </Layout>
        <Footer />
      </Wrapper>
    </Root>
  )
}

const Root = styled.main`
  display: flex;
  min-width: 0;
  justify-content: center;
  background-color: #f7f6fb;
`

const Wrapper = styled.div`
  width: 100%;
  min-width: 0;
  max-width: 82.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 3rem;

  ${media.tablet} {
    padding: 2.5rem;
    gap: 4.5rem;
  }
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-width: 0;
  gap: 2rem;

  ${media.desktop} {
    grid-template-columns: minmax(280px, 380px) 1fr;
    align-items: center;
    gap: 5rem;
  }
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 1.25rem;
`
