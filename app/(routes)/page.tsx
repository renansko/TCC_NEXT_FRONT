import { Icons } from "@/components/ui/Icons";

import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Page({ children }: { children: React.ReactNode }) {
 
    return (
    <div className="relative flex gap-3">
    <SignedIn>
        {children}
    </SignedIn>
    <SignedOut>
    <div className="container relative h-svh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-[#D2B48C]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo />
          Tratuk - Rastreie seus Caminhões
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Bem-vindo à nossa plataforma. Faça login para acessar sua conta.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 ">
        <div className="">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acesse sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite suas credenciais abaixo para entrar
            </p>
          </div>
          <section className="max-w-md mx-auto">
            {children}
          </section>
        </div>
      </div>
    </div>
    </SignedOut>
  </div>
  )
}