import { SignIn } from "@clerk/nextjs";
import AuthLayout from "@/components/auth/auth-layout";

export default function Page() {
  return (
    <AuthLayout 
      title="Welcome to Utrack"
      subtitle="Sign into your account"
    >
      <SignIn 
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