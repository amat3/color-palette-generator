export const breakpoints = {
  tablet: '640px',
  desktop: '1024px',
} as const

export const media = {
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
} as const
