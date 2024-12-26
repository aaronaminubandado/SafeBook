import { Metadata } from "next";
export const metadata : Metadata = {
    title: "Login | SafeBook",
    description: "Log in to your SafeBook account",
  };
  
  export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  }
  