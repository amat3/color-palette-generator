"use client";

import { useState } from "react";

import styled from "@emotion/styled";

import ToneCard from "./components/ToneCard"
import ColorInput from "./components/ColorInput";
import ExportPanel from "./components/ExportPanel";

import { generateColorScale } from "@/lib/colorMath";
import { colorTokens } from "@/lib/tokens"

export default function Home() {
  // 1. Estado
  const [baseHex, setBaseHex] = useState("0066CC");
  const [colorName, setColorName] = useState("primary");

  // 2. Derivada
  const scale = generateColorScale(baseHex);
  
  // 3. JSX
  return (
    <Root>
        <Wrapper>
        <Title>Color Palette Generator</Title>
            <ControlsWrapper>
                {/* Input para cambiar el color */}
                <ColorInput 
                    value={baseHex}
                    onChange={setBaseHex}
                />

                {/* Panel de exportación */}
                <ExportPanel 
                    scale={scale}
                    colorName={colorName}
                    onColorNameChange={setColorName}  
                />
            </ControlsWrapper>

            {/* Map de la escala */}
            <ScaleWrapper>
                {scale.map((item) => (
                <ToneCard 
                    key={item.tone}
                    hex={item.hex}
                    tone={item.tone}
                    />
                ))}
            </ScaleWrapper>
        </Wrapper>
    </Root>
  );
}

const Root = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 1.5rem;
    background-color: #f7f6fb;
    `

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.5rem;
    padding-block: 1.5rem 2.5rem;
    padding-inline: 1rem;
    gap: 2rem;
    border-radius: 1.5rem;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
`

const Title = styled.h1`
    font-family: 'Cherry Bomb One', sans-serif;
    font-size: 3rem;
    text-align: center;
    color: ${colorTokens.gray[700]};
`

const ControlsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-block: 1rem;
`

const ScaleWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: .5rem;
    padding-top: 2rem;
    border-top: 1px solid ${colorTokens.gray[300]};
`