'use client'

import { Global, css } from '@emotion/react'

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html,
          body,
          #__next {
            width: 100%;
            height: 100%;
          }
        `}
      />
      {children}
    </>
  )
}
