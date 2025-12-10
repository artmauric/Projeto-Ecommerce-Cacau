import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cacau Sagrado - Oráculo & Planner do Cacau',
  description: 'Desperte sua conexão espiritual através da sabedoria ancestral do Cacau. Ferramentas únicas de autoconhecimento e transformação.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

