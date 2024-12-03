import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Business Sign Up | SafeBook",
  description: "Create your SafeBook business account to manage appointments",
};

export default function BusinessSignUp() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create your Business Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign up to start managing appointments with SafeBook
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label
                htmlFor="businessName"
                className="text-gray-900 dark:text-white"
              >
                Business Name
              </Label>
              <Input
                id="businessName"
                name="businessName"
                type="text"
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Acme Inc."
              />
            </div>
            <div>
              <Label
                htmlFor="businessType"
                className="text-gray-900 dark:text-white"
              >
                Business Type
              </Label>
              <Input
                id="businessType"
                name="businessType"
                type="text"
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="e.g., Salon, Dental Clinic, Consulting"
              />
            </div>
            <div>
              <Label
                htmlFor="contactName"
                className="text-gray-900 dark:text-white"
              >
                Contact Person
              </Label>
              <Input
                id="contactName"
                name="contactName"
                type="text"
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="John Doe"
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
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="contact@acmeinc.com"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-900 dark:text-white">
                Business Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="+1 (555) 123-4567"
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
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-gray-900 dark:text-white"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Create Business Account
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have a business account?{" "}
            <Link
              href="/business/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
