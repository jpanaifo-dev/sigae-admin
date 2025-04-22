import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admisión de Postgrado | UNAP',
  description:
    'Transforma tu futuro con la Escuela de Postgrado de la Universidad Nacional de la Amazonía Peruana. Accede a programas innovadores, investigación de vanguardia y una red de profesionales de élite. ¡Inscríbete ahora y lleva tu carrera al siguiente nivel!',
  openGraph: {
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/species-iiap-bb45a.appspot.com/o/amazonia%2Fopengraph_meta.webp?alt=media&token=0453a54e-2f41-4b1a-87d4-1125351670d0',
        width: 1000,
        height: 630,
        alt: 'Template EPG - UNAP'
      }
    ]
  }
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-primary-50 text-foreground dark:bg-background-dark dark:text-foreground-dark`}
      >
        {children}
      </body>
    </html>
  )
}
