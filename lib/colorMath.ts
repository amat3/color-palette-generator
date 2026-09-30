// 1. Tipos
type RGB = { r: number; g: number; b: number }
type HSL = { h: number; s: number; l: number }

export type ColorScaleItem = {
  tone: number
  hsl: HSL
  hex: string
}

const TAILWIND_TONES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

// 2. Función hexToRgb (ya la escribimos juntos)
export function hexToRgb(hexString: string): RGB {
  const hex = normalizeHex(hexString)
  let rHex = hex.substring(0, 2)
  let gHex = hex.substring(2, 4)
  let bHex = hex.substring(4, 6)

  let r = parseInt(rHex, 16)
  let g = parseInt(gHex, 16)
  let b = parseInt(bHex, 16)

  return { r, g, b }
}

// 3. Función rgbToHsl (ya la escribimos juntos)
export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  const l = (max + min) / 2

  const s = delta === 0 ? 0 : l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

  let h = 0
  if (delta !== 0) {
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / delta + 2
        break
      case b:
        h = (r - g) / delta + 4
        break
    }
  }
  h = (h / 6) * 360

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

// 4. Función rgbToHex
export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (num: number): string => num.toString(16).padStart(2, '0')

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// 5. Función hslToRgb
function hslToRgb(hsl: HSL): RGB {
  // Normalizar H, S, L a rangos 0-1
  let h = hsl.h / 360
  let s = hsl.s / 100
  let l = hsl.l / 100

  let r, g, b

  // Si saturación es 0, es un gris (todos los canales iguales)
  if (s === 0) {
    r = g = b = l
  } else {
    // Calcular dos temporales basados en L y S
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    // Función auxiliar para calcular cada canal (R, G, B)
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    // Calcular cada canal usando H como offset
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  // Convertir de 0-1 a 0-255
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

// Acepta "#fff", "fff", "#ffffff" o "ffffff" y devuelve siempre 6 dígitos sin "#"
export function normalizeHex(hex: string): string {
  const clean = hex.replace('#', '')
  return clean.length === 3
    ? clean
        .split('')
        .map((c) => c + c)
        .join('')
    : clean
}

// Devuelve el color de texto/icono con más contraste sobre `hex`
export function getContrastColor(hex: string): '#000000' | '#FFFFFF' {
  const { r, g, b } = hexToRgb(normalizeHex(hex))

  const [R, G, B] = [r, g, b].map((channel) => {
    const c = channel / 255
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })

  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B
  return luminance > 0.179 ? '#000000' : '#FFFFFF'
}

// 6. Generador de escala estándar Tailwind (50, 100, 200... 900, 950)
export function generateColorScale(hexColor: string): ColorScaleItem[] {
  const rgb = hexToRgb(hexColor)
  const baseHsl = rgbToHsl(rgb)

  return TAILWIND_TONES.map((tone) => {
    const l = Math.max(0, Math.min(100, 100 - tone / 10))

    const hsl: HSL = {
      h: baseHsl.h,
      s: baseHsl.s,
      l: l,
    }

    const calculatedRgb = hslToRgb(hsl)
    const hex = rgbToHex(calculatedRgb)

    return {
      tone,
      hex,
      hsl,
    }
  })
}
