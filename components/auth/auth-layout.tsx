import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full lg:w-[480px] p-8 flex flex-col justify-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        {children}
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:block flex-1 bg-gradient-to-br from-blue-400 to-blue-600 relative">
        <div className="absolute inset-0">
          <Image
            src="/auth-illustration.svg"
            alt="Authentication illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
} 