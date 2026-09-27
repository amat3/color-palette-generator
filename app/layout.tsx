import { Montserrat, Cherry_Bomb_One } from "next/font/google";
import { RootProvider } from "./providers";

const montserrat = Montserrat({ subsets: ["latin"] });
const cherryBomb = Cherry_Bomb_One({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Color Palette Generator",
  description: "Genera paletas de color con design tokens",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.className}>
      <body>
       <RootProvider>{children}</RootProvider>
        </body>
    </html>
  );
}