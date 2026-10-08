import { DM_Sans } from 'next/font/google'
import { RootProvider } from './providers'

const dmSans = DM_Sans({ weight: ['400', '500', '600', '700', '800', '900'], subsets: ['latin'] })

export const metadata = {
  // Absolute base for the share image (og:image), served from app/opengraph-image.png
  metadataBase: new URL('https://color-palette-generator-2dobv4kxqa-no.a.run.app'),
  title: 'Color Palette Generator',
  description: 'Genera paletas de color con design tokens',
  openGraph: {
    title: 'Color Palette Generator · Tonelab',
    description: 'Escalas de tono y design tokens exportables a JSON y CSS. Next.js en Google Cloud Run.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: { card: 'summary_large_image' },
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
