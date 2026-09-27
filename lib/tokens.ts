import {generateColorScale} from "./colorMath"

type Tone = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorPalette = Record<Tone, string>

function scaleToPalette(scale: ReturnType<typeof generateColorScale>): ColorPalette {
  return scale.reduce<ColorPalette>((acc, item) => {
    acc[item.tone as Tone] = item.hex;
    return acc;
  }, {} as ColorPalette);
}

// 1. Generar escalas para cada color base
const blueScale = generateColorScale("0066CC");
const grayScale = generateColorScale("1D1D1F");
const lightScale = generateColorScale("F5F5F7");
const whiteScale = generateColorScale("FFFFFF");

// 2. Estructurar en el objeto final
export const colorTokens = {
  blue: scaleToPalette(blueScale),
  gray: scaleToPalette(grayScale),
  light: scaleToPalette(lightScale),
  white: scaleToPalette(whiteScale),
};