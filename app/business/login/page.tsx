import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Business Login | SafeBook",
  description: "Log in to your SafeBook business account",
};

export default function BusinessLogin() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative">
            <Shield className="h-16 w-16 text-blue-600 dark:text-blue-400" />
            <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400 absolute bottom-0 right-0" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back to SafeBook Business
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Log in to manage your business appointments
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label
                htmlFor="businessId"
                className="text-gray-900 dark:text-white"
              >
                Business ID
              </Label>
              <Input
                id="businessId"
                name="businessId"
                type="text"
                autoComplete="organization"
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Your unique business ID"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-900 dark:text-white">
                Business Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="business@example.com"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-gray-900 dark:text-white"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/business/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Sign in to Business Account
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have a business account?{" "}
            <Link
              href="/business/signup"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Register your business
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
