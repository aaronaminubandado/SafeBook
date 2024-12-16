"use client";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfiguration";


// export const metadata: Metadata = {
//   title: "Business Sign Up | SafeBook",
//   description: "Create your SafeBook business account to manage appointments",
// };

export default function BusinessSignUp() {
  
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid),{
          uid: user.uid,
          businessName:businessName,
          businessType:businessType,
          contactPerson:contactPerson,
          phoneNumber:phoneNumber,
          email:email,
          role:"business",
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
            Create your Business Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign up to start managing appointments with SafeBook
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} >
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
                placeholder="Jenny's Hair Salon"
                onChange={e=>setBusinessName(e.target.value)}
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
                placeholder="e.g., Salon, Barber, Consulting"
                onChange={e=>setBusinessType(e.target.value)}
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
                onChange={e=>setContactPerson(e.target.value)}
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
                onChange={e=>setEmail(e.target.value)}
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
                placeholder="+90 (535) 123-4567"
                onChange={e=>setPhoneNumber(e.target.value)}
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
              Create Business Account
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have a business account?{" "}
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
