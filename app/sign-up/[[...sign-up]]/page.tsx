import { SignUp } from "@clerk/nextjs";
import AuthLayout from "@/components/auth/auth-layout";

export default function Page() {
  return (
    <AuthLayout 
      title="Create an account"
      subtitle="Join Utrack to get started"
    >
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto w-full",
            card: "shadow-none",
            header: "hidden",
          }
        }}
      />
    </AuthLayout>
  );
}