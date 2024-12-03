import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sign Up | SafeBook',
  description: 'Create your SafeBook account to start booking appointments',
}

export default function SignUp() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Shield className="h-12 w-12 text-blue-600" />
          <h1 className="text-3xl font-bold">Create your SafeBook account</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign up to start booking appointments with ease
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" required className="mt-1" placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" required className="mt-1" placeholder="john@example.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required className="mt-1" placeholder="••••••••" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required className="mt-1" placeholder="••••••••" />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
