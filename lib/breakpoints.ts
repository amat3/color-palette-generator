export const breakpoints = {
  tablet: '640px',
  desktop: '1024px',
  wide: '1280px',
} as const

export const media = {
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
} as const
