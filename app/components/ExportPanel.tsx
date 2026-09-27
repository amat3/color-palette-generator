import { useState } from "react";
import styled from "@emotion/styled"
import { ColorScaleItem } from "@/lib/colorMath";
import { colorTokens } from "@/lib/tokens"
import toast from "react-hot-toast";

interface ExportPanelProps {
    scale: ColorScaleItem[]
    colorName: string
    onColorNameChange: (name: string) => void;
}

    // Convertir scale a JSON
function scaleToJson(scale: ColorScaleItem[]): string {
  const obj = scale.reduce<Record<number, string>>((acc, item) => {
    acc[item.tone] = item.hex;
    return acc;
  }, {});
  return JSON.stringify(obj, null, 2);
}

// Convertir scale a CSS variables
function scaleToCss(scale: ColorScaleItem[], colorName: string): string {
  return scale
    .map((item) => `--${colorName}-${item.tone}: ${item.hex};`)
    .join("\n");
}

function ExportPanel({scale, colorName, onColorNameChange}: ExportPanelProps) {
    const [format, setFormat] = useState<"json" | "css">("json")

 const handleCopy = () => {
    const content = format === "json" 
      ? scaleToJson(scale) 
      : scaleToCss(scale, colorName);
    
    navigator.clipboard.writeText(content);
    toast.success("¡Copiado!");
  };

  return (
 <Container>
      {/* Input para nombre del color */}
      <InputWrapper>
      <span>Variable name</span>
      <TextInput 
        type="text"
        value={colorName}
        onChange={(e) => onColorNameChange(e.target.value)}
        placeholder="Nombre del color"
      />
      </InputWrapper>
      
      {/* Tabs */}
      <InputWrapper>
        <span>Export</span>
        <Tabs>
          <Button onClick={() => setFormat("json")}>JSON</Button>
          <Button onClick={() => setFormat("css")}>CSS</Button>
        </Tabs>
      </InputWrapper>

      {/* Botón copiar */}
      <Cta onClick={handleCopy}>Copy</Cta>
    </Container>
  )
}

const Container = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`

const TextInput = styled.input`
    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    text-align: center;
    border: 0;
    border-radius: .5rem;
    cursor: text;
`

const Tabs = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Button = styled.button`
  padding: .5rem 1rem;
  outline: none;
  border-width: 2px;
  border-style: solid;
  border-color: ${colorTokens.blue[500]};
  border-radius: .5rem;
  color: ${colorTokens.blue[500]};
  cursor: pointer;
`

const Cta = styled(Button)`
  background-color: ${colorTokens.blue[500]};
  color: ${colorTokens.light[50]};
  font-size: 1rem;
`

export default ExportPanel
