"use client"

import { Icons } from "@/components/ui/Icons";
import { SignedIn, SignedOut,  useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import SignIn  from "@/app/(routes)/sign-in/[[...sign-in]]/page";

export default function Home({ children }: { children: React.ReactNode }) {
  const { isLoaded} = useAuth();

  return (
    <>
      {isLoaded ? 
          <div className="relative flex gap-3">
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
                  <SignIn />
                </section>
              </div>
            </div>
          </div>
          </SignedOut>
          <SignedIn>
           {children}
          </SignedIn>
        </div>
      : (
        <motion.div className="h-screen w-screen bg-[#0c0c14] flex items-center justify-center">
          <motion.div
            className="grid grid-cols-4 gap-3 relative"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(-35deg) rotateY(-45deg)",
            }}
            animate={{
              rotateX: [-35, -25, -35],
              rotateY: [-45, -35, -45]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-11 h-11 relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute"
                  animate={{
                    scaleY: [0, 1, 0],
                    rotateY: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                    times: [0, 0.5, 1]
                  }}
                  style={{ transformOrigin: "center" }}
                >
                  <motion.div
                    className="w-11 h-11 absolute"
                    style={{
                      transform: "translateZ(5.5px)",
                    }}
                    animate={{
                      backgroundColor: ["#101C28", "#D2B48C", "#101C28"],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1
                    }}
                  />
                  <motion.div
                    className="w-11 h-11 absolute"
                    style={{
                      backgroundColor: "#D2B48C",
                      transform: "rotateX(90deg) translateZ(5.5px)",
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1
                    }}
                  />
                  <motion.div
                    className="w-11 h-11 absolute"
                    style={{
                      backgroundColor: "#D2B48C", 
                      transform: "rotateY(90deg) translateZ(5.5px)",
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}