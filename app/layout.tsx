"use client";

import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { Header } from '@/components/ui/Header'
import { usePathname } from 'next/navigation'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = ['/','/register-usuario','/register-empresa'].includes(pathname);

  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="font-poppins">
        <ThemeProvider>
          <div className="flex min-h-screen bg-background text-foreground">
            <div className="flex-1">
              {!hideHeader && <Header />}
              <main className="p-4">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
