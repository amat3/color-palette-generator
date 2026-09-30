import { DM_Sans } from 'next/font/google'
import { RootProvider } from './providers'

const dmSans = DM_Sans({ weight: ['400', '500', '600', '700', '800', '900'], subsets: ['latin'] })

export const metadata = {
  title: 'Color Palette Generator',
  description: 'Genera paletas de color con design tokens',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es' className={dmSans.className}>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
