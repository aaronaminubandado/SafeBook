import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Shield, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    {/* Updated header with theme toggle */}
    <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-800">
      <Link className="flex items-center justify-center" href="#">
        <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">SafeBook</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:underline underline-offset-4" href="#features">
          Features
        </Link>
        <Link className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:underline underline-offset-4" href="#testimonials">
          Testimonials
        </Link>
        <Link className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:underline underline-offset-4" href="#pricing">
          Pricing
        </Link>
        <ThemeToggle />
      </nav>
    </header>
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Secure Booking Made Simple
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl dark:text-gray-300">
                SafeBook provides a seamless and secure way for businesses to manage appointments and for customers to book services with confidence.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/signup">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">Get Started</Button>
              </Link>
              <Link href="/business/signup">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400">
                  For Businesses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Easy Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300">Effortlessly manage your calendar and allow customers to book available slots.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Real-time Availability</h3>
              <p className="text-gray-600 dark:text-gray-300">Show real-time availability to customers, reducing double-bookings and conflicts.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Customer Management</h3>
              <p className="text-gray-600 dark:text-gray-300">Keep track of customer information and booking history in one place.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">What Our Users Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-300 mb-4">"SafeBook has revolutionized how I manage my salon. It's user-friendly and has significantly reduced no-shows."</p>
              <p className="font-bold text-gray-900 dark:text-white">- Sarah J., Hair Stylist</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-300 mb-4">"As a customer, I love how easy it is to book appointments. The reminders are a great touch too!"</p>
              <p className="font-bold text-gray-900 dark:text-white">- Mike T., Regular Customer</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-300 mb-4">"SafeBook has streamlined our dental practice. We've seen a 30% increase in bookings since we started using it."</p>
              <p className="font-bold text-gray-900 dark:text-white">- Dr. Emily R., Dentist</p>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">Simple Pricing</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Basic</h3>
              <p className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">$29<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span></p>
              <ul className="mb-6 flex-grow">
                <li className="flex items-center mb-2 text-gray-600 dark:text-gray-300"><ArrowRight className="h-4 w-4 mr-2 text-green-500" /> Up to 100 bookings/month</li>
                <li className="flex items-center mb-2 text-gray-600 dark:text-gray-300"><ArrowRight className="h-4 w-4 mr-2 text-green-500" /> Email reminders</li>
                <li className="flex items-center mb-2 text-gray-600 dark:text-gray-300"><ArrowRight className="h-4 w-4 mr-2 text-green-500" /> Basic reporting</li>
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md flex flex-col border-2 border-blue-600 dark:border-blue-400">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Pro</h3>
              <p className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">$59<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span></p>
              <ul className="mb-6 flex-grow">
                <li className="flex items-center mb-2 text-gray-600 dark:text-gray-300"><ArrowRight className="h-4 w-4 mr-2 text-green-500" /> Unlimited bookings</li>
                <li className="flex items-center mb-2 text-gray-600 dark:text-gray-300"><ArrowRight className="h-4 w-4 mr-2 text-green-500" /> SMS reminders</li>
                <li className="flex items-center mb-2 text-gray-600 dark:text-gray-300"><ArrowRight className="h-4 w-4 mr-2 text-green-500" /> Advanced reporting</li>
                <li className="flex items-center mb-2 text-gray-600 dark:text-gray-300"><ArrowRight className="h-4 w-4 mr-2 text-green-500" /> Custom branding</li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Choose Plan</Button>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Enterprise</h3>
              <p className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Custom</p>
              <ul className="mb-6 flex-grow">
                <li className="flex items-center mb-2 text-gray-600 dark:text-gray-300"><ArrowRight className="h-4 w-4 mr-2 text-green-500" /> All Pro features</li>
                <li className="flex items-center mb-2 text-gray-600 dark:text-gray-300"><ArrowRight className="h-4 w-4 mr-2 text-green-500" /> Dedicated support</li>
                <li className="flex items-center mb-2 text-gray-600 dark:text-gray-300"><ArrowRight className="h-4 w-4 mr-2 text-green-500" /> API access</li>
                <li className="flex items-center mb-2 text-gray-600 dark:text-gray-300"><ArrowRight className="h-4 w-4 mr-2 text-green-500" /> Custom integrations</li>
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
      <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 SafeBook. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  </div>
  );
}
