import SidebarComponent from "@/components/ui/sidebar";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <>  
    <SignedIn>
      <SidebarComponent>
        {children}
      </SidebarComponent>
    </SignedIn>
    <SignedOut> 
      {children}
    </SignedOut>
    </>
  )
}
