import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { MapProvider } from "./(routes)/menu/acompanhamentos/contexts/map-context";

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
    <ClerkProvider
      telemetry={false}
      dynamic
      appearance={{
        variables: { colorPrimary: '#D2B48C' },
        elements: {
          formButtonPrimary: 
            "bg-[#D2B48C] hover:bg-[#C4A484] text-sm normal-case",
        }
      }}
    >
      <html lang="pt-BR" >
        <body >
          <ThemeProvider>
            <SidebarProvider>
                {children}
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
