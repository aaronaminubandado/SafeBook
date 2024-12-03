"use client";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfiguration";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Sign Up | SafeBook",
//   description: "Create your SafeBook account to start booking appointments",
// };

export default function SignUp() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email,password,);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid),{
          uid: user.uid,
          name: name,
          email: email,
          created_At: new Date(),
        })
          
        
        router.push("/");

    } catch (error) {
      setError("Invalid email or password. Please try again.")
    }


  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create your SafeBook account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign up to start booking appointments with ease
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="name" className="text-gray-900 dark:text-white">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="John Doe"
                onChange={e=>setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-900 dark:text-white">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="john@example.com"
                onChange={e=>setEmail(e.target.value)}
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
                onChange={e=>setPassword(e.target.value)}
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
                onChange={e=>setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Sign up
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
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
