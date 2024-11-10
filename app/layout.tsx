import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Logistica",
  description: "Sistema de logistica",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <ClerkProvider 
        appearance={{
          variables: {colorPrimary: "#000000"},
          elements: {
            formButtonPrimary: "bg-black text-white",
          }
        }}
      >
        <body className="font-poppins">
          <ThemeProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ThemeProvider>
      </body>
      </ClerkProvider>
    </html>
  )
}
