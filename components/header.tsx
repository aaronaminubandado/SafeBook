"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfiguration";
import { useRouter } from "next/navigation";

type HeaderProps = {
  userType: "customer" | "business";
};

export function Header({ userType }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <Link className="flex items-center justify-center" href="#">
        <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
          SafeBook
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
