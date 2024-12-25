import { Metadata } from "next";
import { CustomerDashboard } from "@/components/customer-dashboard";
import RequireAuth from "@/components/RequireAuth";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Customer Dashboard | SafeBook",
  description: "Book appointments and manage your bookings",
};

export default function CustomerPage() {
  return (
    <RequireAuth>
        <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header userType="customer" />
      <CustomerDashboard />
    </div>
    </RequireAuth>
);
}
