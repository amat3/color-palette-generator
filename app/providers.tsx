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
          body {
            width: 100%;
            min-height: 100%;
            background-color: #f7f6fb;
            overflow-x: clip;
          }
        `}
      />
      {children}
    </>
  )
}
